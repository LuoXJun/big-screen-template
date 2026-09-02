/**
 * 由 scripts/fh2/gen.mjs 自动生成（2026-09-02），勿手改
 * taskQuery 类型（task 域）
 */
/** 获取任务飞行轨迹（V2） */
export type getTrackData = {
    /** 飞行任务 ID */
    flight_task_id?: string;
    /** 任务类型 */
    task_type?: number;
    /** 飞行任务子类型 */
    flight_task_type?: number;
    /** 计划开始时间 */
    begin_at?: string;
    /** 计划结束时间 */
    end_at?: string;
    /** 创建时间 */
    create_at?: string;
    /** 实际执行时间 */
    run_at?: string;
    /** 完成时间 */
    completed_at?: string;
    /** 媒体文件夹 ID */
    folder_id?: number;
    /** 是否快速重建 */
    fast_reconstruction?: boolean;
    /** 设备类型 */
    device_type?: number;
    /** 关联用户列表 */
    related_users?: Array<{
        /** 用户 ID */
        user_id?: string;
        /** 用户名 */
        user_name?: string;
        /** 操作类型 */
        oper_type?: string;
    }>;
    /** 飞行架次列表 */
    flight_pieces?: Array<{
        /** 飞行架次 ID */
        flight_piece_id?: string;
        /** 父飞行任务 ID */
        flight_task_id?: string;
        /** 起飞机场 SN */
        take_off_airport_sn?: string;
        /** 降落机场 SN */
        land_airport_sn?: string;
        /** 连接设备 SN */
        connect_device_sn?: string;
        /** 飞行器 SN */
        drone_sn?: string;
        /** 降落机场 SN */
        landing_dock_sn?: string;
        /** 任务类型 */
        task_type?: number;
        /** 飞行任务子类型 */
        flight_task_type?: number;
        /** 飞行架次状态 */
        flight_task_status?: number;
        /** 任务状态 */
        task_status?: number;
        /** 任务名称 */
        task_name?: string;
        /** 操作人 ID */
        user_id?: string;
        /** 项目 UUID */
        prj_uuid?: string;
        /** 航线 UUID */
        wayline_uuid?: string;
        /** 云云对接 ID */
        cloud_to_cloud_id?: string;
        /** 任务来源 */
        source?: number;
        /** 工作流 UUID */
        workflow_uuid?: string;
        /** 是否快速重建 */
        fast_reconstruction?: boolean;
        /** 设备类型 */
        device_type?: number;
        /** 创建时间 */
        created_at?: string;
        /** 开始时间 */
        begin_at?: string;
        /** 结束时间 */
        end_at?: string;
        /** 实际执行时间 */
        run_at?: string;
        /** 完成时间 */
        completed_at?: string;
        /** 架次异常信息 */
        exception?: Record<string, unknown>;
        /** 飞行记录列表 */
        flight_records?: Record<string, unknown>[];
        /** 飞行中航线 UUID 列表 */
        in_flight_uuids?: string[];
        /** 航线 UUID 列表 */
        wayline_uuids?: string[];
        /** 飞行中航线信息 */
        in_flight_infos?: Record<string, unknown>[];
        /** 轨迹信息 */
        track_information?: Record<string, unknown>;
        /** 航线名称 */
        wayline_name?: string;
        /** 飞行器信息 */
        drone_info?: {
            device_name?: string;
            device_model?: string;
            device_type?: number;
            device_sn?: string;
        };
        /** 扩展信息 */
        ext?: Record<string, unknown>;
    }>;
};
