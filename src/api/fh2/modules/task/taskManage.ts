/**
 * 由 scripts/fh2/gen.mjs 自动生成（2026-09-02），勿手改
 * taskManage 请求（task 域）
 */
import { fh2Request } from '../../request';
import type {
    createFlightTasksData,
    createFlightTasksBody,
    createAdvancedData,
    createAdvancedBody
} from '../../types/task/taskManage/taskManage-1.ts';
import type {
    getCheckData,
    updateReadConfirmData,
    createRejectTakeoffData,
    createRejectTakeoffBody,
    createResumeImmediateData,
    createResumeImmediateBody,
    deleteFlightTasksData
} from '../../types/task/taskManage/taskManage-2.ts';
import type {
    updateFlightTasksData,
    updateFlightTasksBody,
    getFlightTasksData,
    createCmdsData,
    createCmdsBody,
    createResumeData,
    createResumeBody,
    updateStatusData,
    updateStatusBody,
    getFlightTasksTaskData
} from '../../types/task/taskManage/taskManage-3.ts';

/**
 * 创建飞行任务
 * 创建一个飞行计划。task_type 决定语义：1-立即任务 / 2-重复任务 / 3-单次定时任务 / 5-连续任务。这是最核心的任务创建入口。 **调用前置（按需）** - `GET /flight-tasks/check` — 检查飞行任务是否满足下发条件 - `POST /flight-tasks/confli
 */
export const createFlightTasksApi = (
    params: { workspace_id: string },
    body: createFlightTasksBody
) =>
    fh2Request.post<createFlightTasksData>(
        `/openapi/v2.0/task/api/v1/workspaces/${params.workspace_id}/flight-tasks`,
        body,
        { isLoading: false }
    );

/**
 * 创建飞行任务（高级版，返回子任务）
 * 创建飞行计划的 V2 版本，与基础版区别在于：返回体里**带回子任务信息**（重复 / 连续任务会拆出多个子任务），方便 OpenAPI 调用方一次拿到完整的父子任务结构。 业务规则同基础版 `POST /flight-tasks`。
 */
export const createAdvancedApi = (params: { workspace_id: string }, body: createAdvancedBody) =>
    fh2Request.post<createAdvancedData>(
        `/openapi/v2.0/task/api/v1/workspaces/${params.workspace_id}/flight-tasks/advanced`,
        body,
        { isLoading: false }
    );

/**
 * 检查飞行任务是否满足下发条件
 * 创建任务前校验：指定设备 SN + 航线 UUID 的组合是否能成功下发任务（设备能力匹配、机场可用、航线合法等）。返回 warning 列表但不阻塞创建。
 */
export const getCheckApi = (params: { workspace_id: string; sn: string; wayline_uuid: string }) =>
    fh2Request.get<getCheckData>(
        `/openapi/v2.0/task/api/v1/workspaces/${params.workspace_id}/flight-tasks/check`,
        { sn: params.sn, wayline_uuid: params.wayline_uuid },
        { isLoading: false, paramsStyle: 'raw' }
    );

/**
 * 标记任务为已读状态
 * 把指定任务标记为「已读」 — 通常用于清除「最近异常任务」红点提示（用户查看任务结果后调用）。服务端将任务 UUID 写入持久层并刷新缓存哈希；后续 `recent` 接口该任务的 `read_status=true`。
 */
export const updateReadConfirmApi = (params: { workspace_id: string; task_uuid: string }) =>
    fh2Request.put<updateReadConfirmData>(
        `/openapi/v2.0/task/api/v1/workspaces/${params.workspace_id}/flight-tasks/read-confirm`,
        {},
        { isLoading: false, paramsStyle: 'raw', params: { task_uuid: params.task_uuid } }
    );

/**
 * 检查飞行任务阻飞项
 * 用户点"创建任务"按钮前调本接口做「放行预检」，返回当前 + 降落机场的天气阻飞结果 + 移动部署模式下的 GPS 航线阻飞结果，避免用户提交后才被业务层卡住。 **业务约束**：本接口仅接受 `task_type=1`（立即任务），其他取值会被 400 拒绝。
 */
export const createRejectTakeoffApi = (
    params: { workspace_id: string },
    body: createRejectTakeoffBody
) =>
    fh2Request.post<createRejectTakeoffData>(
        `/openapi/v2.0/task/api/v1/workspaces/${params.workspace_id}/flight-tasks/reject-takeoff`,
        body,
        { isLoading: false }
    );

/**
 * 支持断点续飞的立即任务
 * 用户在原始任务异常中断后（如电池低、设备失联），通过本接口快速基于原任务的断点信息一键创建一个新的立即任务，从断点继续飞行。基于原 task 记录，把名称 / 航线 / RTH / 续飞模式 / 断点 JSON / 航线时长等关键字段拷贝到新任务，并强制 `task_type=立即`、`is_break_point_r
 */
export const createResumeImmediateApi = (
    params: { workspace_id: string },
    body: createResumeImmediateBody
) =>
    fh2Request.post<createResumeImmediateData>(
        `/openapi/v2.0/task/api/v1/workspaces/${params.workspace_id}/flight-tasks/resume-immediate`,
        body,
        { isLoading: false }
    );

/**
 * 删除飞行任务
 * 删除指定 UUID 的飞行任务。仅未执行 / 已完成 / 已终止状态的任务可被删除；执行中任务删除会被拒绝。
 */
export const deleteFlightTasksApi = (params: {
    workspace_id: string;
    task_uuid: string;
    del_finished: 1;
    scope: 1;
}) =>
    fh2Request.delete<deleteFlightTasksData>(
        `/openapi/v2.0/task/api/v1/workspaces/${params.workspace_id}/flight-tasks/${params.task_uuid}`,
        { del_finished: params.del_finished, scope: params.scope },
        { isLoading: false, paramsStyle: 'raw' }
    );

/**
 * 编辑飞行任务
 * 编辑飞行计划：覆盖式更新任务的规则字段（时间、重复、设备、航线、失控动作、VLM 配置等）。 **适用范围**：仅可编辑待执行（尚未下发到设备）的定时任务、重复子任务、连续子任务。立即任务、试飞任务、断点续飞任务不可编辑。
 */
export const updateFlightTasksApi = (
    params: { workspace_id: string; task_uuid: string },
    body: updateFlightTasksBody
) =>
    fh2Request.put<updateFlightTasksData>(
        `/openapi/v2.0/task/api/v1/workspaces/${params.workspace_id}/flight-tasks/${params.task_uuid}`,
        body,
        { isLoading: false }
    );

/**
 * 获取飞行任务详情
 * 根据 task_uuid 获取一个飞行任务的完整详情（含规则、设备、航线、状态、子任务、VLM 配置、断点信息等）。
 */
export const getFlightTasksApi = (params: { workspace_id: string; task_uuid: string }) =>
    fh2Request.get<getFlightTasksData>(
        `/openapi/v2.0/task/api/v1/workspaces/${params.workspace_id}/flight-tasks/${params.task_uuid}`,
        {},
        { isLoading: false, paramsStyle: 'raw' }
    );

/**
 * 下发任务媒体优先上传指令
 * 针对指定飞行任务下发"媒体优先上传"指令(将任务相关媒体提前上传)。注:任务暂停 / 继续 / 终止 / 挂起等状态变更应使用 PUT /flight-tasks/{task_uuid}/status 接口。
 */
export const createCmdsApi = (
    params: { workspace_id: string; task_uuid: string },
    body: createCmdsBody
) =>
    fh2Request.post<createCmdsData>(
        `/openapi/v2.0/task/api/v1/workspaces/${params.workspace_id}/flight-tasks/${params.task_uuid}/cmds`,
        body,
        { isLoading: false }
    );

/**
 * 创建续飞任务（保留原断点）
 * 基于已结束的任务创建一个续飞副本任务，从原任务的断点信息继续飞行。与 resume-immediate 区别：本接口是"复制定时任务"，可保留原 task_type；resume-immediate 强制转为立即任务。
 */
export const createResumeApi = (
    params: { workspace_id: string; task_uuid: string },
    body: createResumeBody
) =>
    fh2Request.post<createResumeData>(
        `/openapi/v2.0/task/api/v1/workspaces/${params.workspace_id}/flight-tasks/${params.task_uuid}/resume`,
        body,
        { isLoading: false }
    );

/**
 * 更新飞行任务挂起状态（挂起 / 解除挂起 / 取消）
 * 把任务挂起（暂时不下发到设备）/ 解除挂起 / 取消。挂起状态下任务保留在服务端但不会被自动调度。
 */
export const updateStatusApi = (
    params: { workspace_id: string; task_uuid: string },
    body: updateStatusBody
) =>
    fh2Request.put<updateStatusData>(
        `/openapi/v2.0/task/api/v1/workspaces/${params.workspace_id}/flight-tasks/${params.task_uuid}/status`,
        body,
        { isLoading: false }
    );

/**
 * 查询飞行任务列表
 * 按多维度过滤查询当前项目下的飞行任务列表(V2)。支持按任务名、设备 SN、时间段、任务类型、状态等过滤;分页返回。
 */
export const getFlightTasksTaskApi = (params: {
    proj_uuid: string;
    'sn[]': string[];
    name: string;
    begin_at: number;
    end_at: number;
    task_type: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    'status[]': number[];
    page: number;
    page_size: number;
    target_task_uuid: string;
    media_upload_type: 0 | 1 | 2;
    source: 0 | 1;
    flight_task_status: 1 | 2;
    flight_task_type: 1 | 2;
    list_type: 0 | 1;
    auto_workflow: boolean;
}) =>
    fh2Request.get<getFlightTasksTaskData>(
        `/openapi/v2.0/task/api/v2/workspaces/${params.proj_uuid}/flight-tasks`,
        {
            'sn[]': params['sn[]'],
            name: params.name,
            begin_at: params.begin_at,
            end_at: params.end_at,
            task_type: params.task_type,
            'status[]': params['status[]'],
            page: params.page,
            page_size: params.page_size,
            target_task_uuid: params.target_task_uuid,
            media_upload_type: params.media_upload_type,
            source: params.source,
            flight_task_status: params.flight_task_status,
            flight_task_type: params.flight_task_type,
            list_type: params.list_type,
            auto_workflow: params.auto_workflow
        },
        { isLoading: false, paramsStyle: 'raw' }
    );
