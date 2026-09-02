/**
 * 由 scripts/fh2/gen.mjs 自动生成（2026-09-02），勿手改
 * flightRecord 请求（task 域）
 */
import { fh2Request } from '../../request';
import type {
    getOssUrlInfoData,
    getExportData,
    createExportData,
    createExportBody,
    updateExportData,
    getOperData
} from '../../types/task/flightRecord/flightRecord-1.ts';

/**
 * 飞行记录文件下载
 * 按对象存储 object_key 换取一个临时签名 URL,供客户端直接下载该飞行记录或 PSDK 资源。前端在拿到导出任务结果的 object_key 后,调用本接口获取可下载的签名 URL。
 */
export const getOssUrlInfoApi = (params: { uuid: string; object_key: string }) =>
    fh2Request.get<getOssUrlInfoData>(
        `/openapi/v2.0/manage/api/v1/workspaces/${params.uuid}/flight-tasks/oss-url-info`,
        { object_key: params.object_key },
        { isLoading: false, paramsStyle: 'raw' }
    );

/**
 * 查询飞行任务导出历史
 * 查询当前项目下的导出任务列表（含状态：进行中 / 已完成 / 失败 / 已取消），用户可在导出中心看到自己提交过的导出任务及下载链接。
 */
export const getExportApi = (params: {
    workspace_id: string;
    page: number;
    page_size: number;
    file_type: 'PDF' | 'Excel';
    content_type: 'summary' | 'details';
    status: 0 | 1 | 2 | 3;
    sort: 'ASC' | 'DESC';
    export_id: string;
}) =>
    fh2Request.get<getExportData>(
        `/openapi/v2.0/task/api/v2/workspaces/${params.workspace_id}/flight-tasks/export`,
        {
            page: params.page,
            page_size: params.page_size,
            file_type: params.file_type,
            content_type: params.content_type,
            status: params.status,
            sort: params.sort,
            export_id: params.export_id
        },
        { isLoading: false, paramsStyle: 'raw' }
    );

/**
 * 导出飞行任务记录（生成 zip 异步任务）
 * 把指定的若干飞行任务记录按文件类型导出（默认 Excel 格式）。导出是异步任务：本接口创建一个 export task 并返回 task_id，客户端轮询 `GET /flight-tasks/export` 看进度。完成后从 object_key 字段下载 zip。 导出的 Excel 明细报告中，当 metric
 */
export const createExportApi = (params: { workspace_id: string }, body: createExportBody) =>
    fh2Request.post<createExportData>(
        `/openapi/v2.0/task/api/v2/workspaces/${params.workspace_id}/flight-tasks/export`,
        body,
        { isLoading: false }
    );

/**
 * 取消 / 删除导出任务
 * 取消进行中的导出任务（status=running 时）或删除已完成 / 失败的导出记录（status=finished/failed 时）。
 */
export const updateExportApi = (params: {
    workspace_id: string;
    task_id: string;
    action: 'cancel' | 'delete';
}) =>
    fh2Request.put<updateExportData>(
        `/openapi/v2.0/task/api/v2/workspaces/${params.workspace_id}/flight-tasks/export`,
        {},
        {
            isLoading: false,
            paramsStyle: 'raw',
            params: { task_id: params.task_id, action: params.action }
        }
    );

/**
 * 查询飞行任务操作日志（V2）
 * 查询指定任务的操作日志（谁在什么时候做了什么操作：创建 / 编辑 / 挂起 / 取消等），用于审计追溯。
 */
export const getOperApi = (params: { workspace_id: string; flight_task_id: string }) =>
    fh2Request.get<getOperData>(
        `/openapi/v2.0/task/api/v2/workspaces/${params.workspace_id}/flight-tasks/oper`,
        { flight_task_id: params.flight_task_id },
        { isLoading: false, paramsStyle: 'raw' }
    );
