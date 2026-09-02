/**
 * 由 scripts/fh2/gen.mjs 自动生成（2026-09-02），勿手改
 * aiAlert 请求（task 域）
 */
import { fh2Request } from '../../request';
import type {
    getAiAlertFlightData,
    getAiAlertRecordData
} from '../../types/task/aiAlert/aiAlert-1.ts';

/**
 * 按设备 SN 查询有 AI 告警的飞行架次列表
 * 给定一台飞行器 SN,查询该飞行器历史上产生过 AI 告警的飞行架次列表(每条返回一个 flight_id 及对应的告警条数)。常用于先选定一架飞行器,再翻看它的告警飞行历史。
 */
export const getAiAlertFlightApi = (params: {
    uuid: string;
    page: number;
    page_size: number;
    drone_sn: string;
    begin_at: number;
    end_at: number;
    algorithm_source: number;
    'algorithm_sources[]': string[];
}) =>
    fh2Request.get<getAiAlertFlightData>(
        `/openapi/v2.0/drc/api/v2/projects/${params.uuid}/ai-alert-flight`,
        {
            page: params.page,
            page_size: params.page_size,
            drone_sn: params.drone_sn,
            begin_at: params.begin_at,
            end_at: params.end_at,
            algorithm_source: params.algorithm_source,
            'algorithm_sources[]': params['algorithm_sources[]']
        },
        { isLoading: false, paramsStyle: 'raw' }
    );

/**
 * 查询历史 AI 告警记录
 * 查询当前项目下 AI 算法历史触发的告警记录列表（按时间范围 / 设备 / 算法过滤）。
 */
export const getAiAlertRecordApi = (params: {
    proj_uuid: string;
    'drone_sn[]': string[];
    begin_at: number;
    end_at: number;
    'target_type[]': 0 | 1 | 2 | 3 | 4 | 5[];
    'flight_id[]': string[];
    page: number;
    page_size: number;
    algorithm_source: number;
    'algorithm_sources[]': string[];
}) =>
    fh2Request.get<getAiAlertRecordData>(
        `/openapi/v2.0/drc/api/v2/projects/${params.proj_uuid}/ai-alert-record`,
        {
            'drone_sn[]': params['drone_sn[]'],
            begin_at: params.begin_at,
            end_at: params.end_at,
            'target_type[]': params['target_type[]'],
            'flight_id[]': params['flight_id[]'],
            page: params.page,
            page_size: params.page_size,
            algorithm_source: params.algorithm_source,
            'algorithm_sources[]': params['algorithm_sources[]']
        },
        { isLoading: false, paramsStyle: 'raw' }
    );
