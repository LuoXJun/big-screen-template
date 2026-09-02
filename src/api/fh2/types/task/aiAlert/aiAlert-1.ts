/**
 * 由 scripts/fh2/gen.mjs 自动生成（2026-09-02），勿手改
 * aiAlert 类型（task 域）
 */
/** 按设备 SN 查询有 AI 告警的飞行架次列表 */
export type getAiAlertFlightData = {
    /** AI 告警飞行架次列表 */
    data?: Array<{
        /** 飞行架次 ID */
        flight_id?: string;
        /** 该架次产生的 AI 告警数量 */
        count?: number;
        /** 飞行任务名称 */
        flight_task_name?: string;
        /** 任务状态码 */
        status?: number;
        /** 飞行任务类型 */
        flight_task_type?: number;
        /** 起飞时间(unix 秒) */
        start_time?: number;
        /** 该架次是否已被评论 / 处置 */
        is_commented?: boolean;
    }>;
    /** 总条数 */
    total?: number;
    /** 当前页 */
    page?: number;
    /** 每页数量 */
    page_size?: number;
    /** 总页数 */
    page_count?: number;
};

/** 查询历史 AI 告警记录 */
export type getAiAlertRecordData = {
    /** 告警记录字典,key = flight_id(动态 key);value = 该架次下的告警条目数组。下方 ft-aa1122-3344 为代表性 key 示例,所有动态 key 共用此 value 结构(由 additionalPrope */
    data?: Record<
        string,
        Array<{
            /** 告警唯一标识 */
            alert_uuid?: string;
            /** 所属飞行架次 ID */
            flight_id?: string;
            /** 项目 ID */
            project_id?: string;
            /** 飞行器 SN */
            drone_sn?: string;
            /** 网关(机场或遥控器)SN */
            gateway_sn?: string;
            /** 告警状态:0=等待处理 / 1=缩略图处理完成 / 2=告警大图处理完成 / 3=云云对接处理完成 / 4=处理失败 / 5=超时未收到回调 */
            status?: 0 | 1 | 2 | 3 | 4 | 5;
            /** 告警原因描述 */
            reason?: string;
            /** 触发该告警的算法来源,枚举同请求 */
            algorithm_source?: number;
            /** 告警位置(经纬度+海拔等) */
            location?: Record<string, unknown>;
            /** 关联媒体文件 ID(处理完成后填充) */
            file_id?: number;
            /** 媒体索引 */
            media_index?: number;
            /** 飞行任务名称 */
            task_name?: string;
            /** 触发动作列表 */
            trigger_actions?: Record<string, unknown>[];
            /** 告警目标详情列表 */
            target_alert_infos?: Record<string, unknown>[];
            /** 告警时间(unix 秒) */
            timestamp?: number;
            /** 告警快照缩略图 URL */
            thumbnail_url?: string;
            /** 告警标签 */
            labels?: string[];
            /** 距上一条同类告警的间隔(秒) */
            interval_seconds?: number;
        }>
    >;
    /** 跨架次总告警条数 */
    total?: number;
    /** 当前页 */
    page?: number;
    /** 每页数量 */
    page_size?: number;
    /** 总页数 */
    page_count?: number;
};
