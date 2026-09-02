/**
 * 由 scripts/fh2/gen.mjs 自动生成（2026-09-02），勿手改
 * flightRecord 类型（task 域）
 */
import type { C0148_ExportRecords_Resp } from './models';

/** 飞行记录文件下载 */
export type getOssUrlInfoData = string;

/** 查询飞行任务导出历史 */
export type getExportData = {
    /** 导出任务记录列表 */
    list?: Array<{
        /** 导出记录 ID */
        ID?: number;
        /** 导出记录 UUID */
        UUID?: string;
        /** 创建时间 */
        created_at?: string;
        /** 导出时间 */
        export_time?: string;
        /** 导出内容类型 */
        content_type?: string;
        /** 导出状态 */
        status?: number;
        /** 导出进度（0~100） */
        progress?: number;
        /** 失败原因码 */
        failed_reason_code?: number;
        /** 文件存储路径 */
        object_key?: string;
        /** 文件名 */
        file_name?: string;
        /** 操作用户 ID */
        user_id?: string;
        /** 项目 UUID */
        prj_uuid?: string;
        /** 操作用户名 */
        user_name?: string;
        /** 导出文件格式列表 */
        file_type?: string[];
    }>;
    /** 分页信息 */
    pagination?: {
        page?: number;
        page_size?: number;
        total?: number;
    };
};

/** 导出飞行任务记录（生成 zip 异步任务） */
export type createExportData = C0148_ExportRecords_Resp;
/** 导出飞行任务记录（生成 zip 异步任务） 请求体 */
export type createExportBody = {
    /** 要导出的飞行任务 UUID 列表 */
    flight_task_ids: string[];
    /** 导出文件名（zip 文件名，不含后缀） */
    file_name: string;
    /** 文件类型,可同时选 ["PDF"] / ["Excel"] / ["PDF", "Excel"] */
    file_type: 'PDF' | 'Excel'[];
    /** 内容类型:"summary"=概要报告 / "details"=明细报告 */
    content_type: 'summary' | 'details';
    /** 导出指标字段列表（按需选择要导出哪些字段） */
    metrics: string[];
    /** IANA 时区名称，用于时间字段本地化 */
    time_zone?: string;
    /** 导出文件的语言：zh-CN / en-US 等 */
    locale?: string;
};

/** 取消 / 删除导出任务 */
export type updateExportData = Record<string, unknown>;

/** 查询飞行任务操作日志（V2） */
export type getOperData = {
    /** 飞行控制权变更点列表（FlightControlChangePoint，按时间排列） */
    control_change?: Array<{
        /** 控制权变更时间戳（毫秒） */
        control_change_time?: number;
        /** 获得控制权的用户名 */
        user_name?: string;
        /** 获得控制权的用户 ID */
        user_id?: string;
        /** 控制权类型（如 flight_control / payload_control） */
        control_type?: string;
    }>;
    /** 负载控制权变更点列表（FlightControlChangePoint 结构） */
    payload_change?: Array<{
        /** 控制权变更时间戳（毫秒） */
        control_change_time?: number;
        /** 获得负载控制权的用户名 */
        user_name?: string;
        /** 获得负载控制权的用户 ID */
        user_id?: string;
        /** 负载控制权类型 */
        control_type?: string;
    }>;
    /** 操作事件日志列表（FlightActionLogVo，按时间顺序） */
    oper_logs?: Array<{
        /** 操作方法名（如 takeoff / land / return_home / pause / resume / cancel / fly_to_point 等） */
        method?: string;
        /** 操作时间戳（毫秒） */
        time?: number;
        /** 指令业务 ID（用于追踪同一次设备指令的执行） */
        bid?: string;
        /** 操作人用户名 */
        user_name?: string;
        /** 操作人用户 ID */
        user_id?: string;
    }>;
    /** 本次飞行涉及的相关用户列表（UserInfo，去重后） */
    related_users?: Array<{
        /** 用户名 */
        user_name?: string;
        /** 用户 ID */
        user_id?: string;
        /** 该用户参与的操作类型分类 */
        oper_type?: string;
    }>;
};
