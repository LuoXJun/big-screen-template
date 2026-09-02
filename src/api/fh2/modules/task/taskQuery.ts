/**
 * 由 scripts/fh2/gen.mjs 自动生成（2026-09-02），勿手改
 * taskQuery 请求（task 域）
 */
import { fh2Request } from '../../request';
import type {
    getInFlightData,
    getInFlightTaskData,
    getBatchData
} from '../../types/task/taskQuery/taskQuery-1.ts';
import type {
    createConflictsData,
    createConflictsBody,
    getDetailData,
    getRecentData
} from '../../types/task/taskQuery/taskQuery-2.ts';
import type { getTrackData } from '../../types/task/taskQuery/taskQuery-3.ts';

/**
 * 获取当前活动航线任务（DRC 实时控制）
 * 查询指定项目内、指定无人机 SN 当前活跃的空中航线任务（用于实时展示飞行状态）。
 */
export const getInFlightApi = (params: { prj_id: string; sn: string }) =>
    fh2Request.get<getInFlightData>(
        `/openapi/v2.0/drc/api/v2/projects/${params.prj_id}/flight-tasks/in-flight`,
        { sn: params.sn },
        { isLoading: false, paramsStyle: 'raw' }
    );

/**
 * 获取当前活动航线任务（任务管理）
 * 查询当前项目内、指定无人机 SN 当前活跃的空中航线任务（用于实时展示飞行状态）。
 */
export const getInFlightTaskApi = (params: { workspace_id: string; sn: string }) =>
    fh2Request.get<getInFlightTaskData>(
        `/openapi/v2.0/task/api/v1/workspaces/${params.workspace_id}/flight-tasks/in-flight`,
        { sn: params.sn },
        { isLoading: false, paramsStyle: 'raw' }
    );

/**
 * 按 UUID 批量查询飞行任务详情
 * 给定一组飞行任务 UUID,一次性返回每个任务的完整详情(状态、时间、关联航线、媒体上传进度等)。适用于前端任务看板批量刷新状态、跨系统状态同步等场景。
 */
export const getBatchApi = (params: { workspace_id: string; task_uuids: string[] }) =>
    fh2Request.get<getBatchData>(
        `/openapi/v2.0/task/api/v1/workspaces/${params.workspace_id}/flight-tasks/batch`,
        { task_uuids: params.task_uuids },
        { isLoading: false, paramsStyle: 'raw' }
    );

/**
 * 查询飞行任务时间冲突列表
 * 创建重复 / 定时任务前调用：按传入的任务时间规则（task_type / repeat_type / begin_at / end_at 等）反向查询同一设备 SN 下已有的会发生时间冲突的任务列表，便于前端提示用户。
 */
export const createConflictsApi = (params: { workspace_id: string }, body: createConflictsBody) =>
    fh2Request.post<createConflictsData>(
        `/openapi/v2.0/task/api/v1/workspaces/${params.workspace_id}/flight-tasks/conflicts`,
        body,
        { isLoading: false }
    );

/**
 * 获取飞行任务详细信息（V2，含执行明细）
 * 获取指定任务的 V2 版详情，包含 V1 没有的执行轨迹明细 / 飞行架次列表 / 媒体采集汇总等。
 */
export const getDetailApi = (params: { workspace_id: string; flight_task_id: string }) =>
    fh2Request.get<getDetailData>(
        `/openapi/v2.0/task/api/v2/workspaces/${params.workspace_id}/flight-tasks/detail`,
        { flight_task_id: params.flight_task_id },
        { isLoading: false, paramsStyle: 'raw' }
    );

/**
 * 查询机场最近 / 当前任务
 * 机场列表 / 最近任务：根据传入的机场 SN 列表批量查询每台机场当前 / 最近的一条任务（优先返回执行中 + 暂停中，其次返回最近一条失败 / 终止）。命中缓存直接返回，未命中回查持久层并回填缓存；同时附加「已读」状态。
 */
export const getRecentApi = (params: {
    workspace_id: string;
    device_sns: string;
    'sn[]': string[];
}) =>
    fh2Request.get<getRecentData>(
        `/openapi/v2.0/task/api/v1/workspaces/${params.workspace_id}/flight-tasks/recent`,
        { device_sns: params.device_sns, 'sn[]': params['sn[]'] },
        { isLoading: false, paramsStyle: 'raw' }
    );

/**
 * 获取任务飞行轨迹（V2）
 * 获取已结束飞行任务的实际飞行轨迹（按时间排序的航点经纬度 + 高度 + 时间戳序列），用于地图轨迹回放。
 */
export const getTrackApi = (params: {
    workspace_id: string;
    project_id: string;
    task_uuid: string;
}) =>
    fh2Request.get<getTrackData>(
        `/openapi/v2.0/task/api/v2/workspaces/${params.workspace_id}/flight-tasks/track`,
        { project_id: params.project_id, task_uuid: params.task_uuid },
        { isLoading: false, paramsStyle: 'raw' }
    );
