/**
 * 由 scripts/fh2/gen.mjs 自动生成（2026-09-02），勿手改
 * taskQuery 类型（task 域）
 */
/** 查询飞行任务时间冲突列表 */
export type createConflictsData = {
    /** 冲突任务时段列表 */
    conflicted_lists?: Array<{
        /** 冲突时间点 */
        timestamp?: number;
        /** 该时段冲突的任务列表（完整任务信息） */
        tasks?: Record<string, unknown>[];
    }>;
    /** 任务时间校验错误 */
    task_time_errors?: {
        /** 执行时间校验错误 */
        task_time_error?: {
            /** 错误码 */
            code?: number;
            /** 错误信息 */
            message?: string;
            /** 错误级别 */
            level?: number;
        };
        /** 执行日期校验错误 */
        task_date_error?: {
            /** 错误码 */
            code?: number;
            /** 错误信息 */
            message?: string;
            /** 错误级别 */
            level?: number;
        };
    };
};
/** 查询飞行任务时间冲突列表 请求体 */
export type createConflictsBody = {
    /** 任务类型（ 1=ImmediateTask立即任务 / 2=RepeatedTask重复任务(虚拟父) / 3=SingleTimedTask单次定时 / 4=SubTask子任务 / 5=ContinuousTask连续执行(虚拟父) / */
    task_type: 1 | 2 | 3 | 5;
    /** 重复频率类型（task_type=2 或 5 时必填）：0-不重复 / 1-每几秒 / 2-每几分钟 / 3-每几小时 / 4-每几天 / 5-每几周 / 6-每几月（按日期）/ 7-每几月（按星期）/ 8-绝对每年 */
    repeat_type?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    /** 间隔（每 N 个单位执行一次），单位由 repeat_type 决定。task_type=2 或 5 时必填 */
    interval?: number;
    /** day-of-month，按日期重复时指定的日号（1-31），repeat_type=6 时必填 */
    dom?: number[];
    /** day-of-week，按星期重复时指定的星期（0=周日 / 1=周一 / … / 6=周六），repeat_type=5 或 7 时必填 */
    dow?: number[];
    /** week-of-month，每月第 N 个 dow，repeat_type=7 时必填 */
    wom?: number;
    /** 最早开始时间（unix 时间戳，单位：秒）。task_type≠1 时必填 */
    begin_at?: number;
    /** 最晚开始时间（unix 时间戳，单位：秒）。与 begin_at 构成执行时间窗口 */
    latest_begin_at?: number;
    /** 重复 / 连续任务的截止时间（unix 时间戳，单位：秒）。task_type=2 或 5 时必填 */
    end_at?: number;
    /** 重复计划的多个最早开始时间数组（unix 秒）。task_type=2 时必填 */
    extended_begin_at?: number[];
    /** 重复计划的多个最晚开始时间数组（unix 秒），与 extended_begin_at 一一对应 */
    extended_latest_begin_at?: number[];
    /** 连续计划的多个执行时段，每个子数组长度为 2（[起始时间, 结束时间]，unix 秒）。task_type=5 时必填 */
    continuous_task_periods?: number[][];
    /** IANA 时区名称，如 "Asia/Chongqing" */
    time_zone: string;
    /** 航线预估执行时长，单位：秒 */
    wayline_duration?: number;
    /** 执行设备 SN（机场或飞行器序列号） */
    sn: string;
    /** 接力降落机场 SN（A 起 B 降场景使用） */
    landing_dock_sn?: string;
    /** 连接 SN（透传给设备层） */
    connect_sn?: string;
    /** 需要排除的任务 UUID（编辑现有任务查冲突时填，避免任务与自己产生冲突） */
    excluded_task_uuid?: string;
};

/** 获取飞行任务详细信息（V2，含执行明细） */
export type getDetailData = {
    /** 航线 ID */
    id?: string;
    /** 航线名称 */
    name?: string;
    /** 航线创建者用户名 */
    user_name?: string;
    /** 航线文件 URL */
    url?: string;
    /** 文件后缀 */
    suffix?: string;
    /** 文件指纹 */
    finger_print?: string;
    /** 航线扩展信息 */
    ext?: {
        /** 扩展指纹 */
        fingerprint?: string;
        /** 模板类型列表 */
        template_types?: number[];
        /** 预计飞行时长（秒） */
        duration?: number;
        /** 航线总距离（米） */
        distance?: number;
        /** 航线库类型 */
        library_type?: string;
        /** 预估拍照数 */
        estimated_photo_count?: number;
        /** 测量面积 */
        surveyed_area?: number;
        /** 起始纬度 */
        start_latitude?: number;
        /** 起始经度 */
        start_longitude?: number;
        /** 起始高度 */
        start_altitude?: number;
        /** 终点纬度 */
        end_latitude?: number;
        /** 终点经度 */
        end_longitude?: number;
        /** 终点高度 */
        end_altitude?: number;
        /** 遥控器失联退出类型 */
        exit_on_rc_lost_type?: number;
        /** 遥控器失联退出行为 */
        exit_on_rc_lost_behavior?: number;
        /** 机型 key */
        drone_model_key?: string;
        /** 负载型号 key 列表 */
        payload_model_key?: string[];
        /** 航点数量 */
        wayline_point_nums?: number;
        /** 动作类型 */
        action_type?: number;
        /** 是否携带喊话器 */
        with_megaphone?: boolean;
        /** 是否携带探照灯 */
        with_search_light?: boolean;
        /** 测区范围 */
        survey_scope?: {
            points?: Array<{
                lng?: number;
                lat?: number;
                alt?: number;
            }>;
        };
        /** 是否启用智能倾斜 */
        smart_oblique_on?: boolean;
    };
    /** 删除时间戳（0 表示未删除） */
    delete_at?: number;
    /** 更新时间戳 */
    updated_at?: number;
    /** 航线合法性检查码列表 */
    wayline_validity_check_codes?: number[];
    /** 是否进行航线合法性检查 */
    is_wayline_validity_check?: boolean;
};

/** 查询机场最近 / 当前任务 */
export type getRecentData = {
    /** 最近飞行任务列表 */
    list?: Array<{
        /** 归属设备 SN */
        belong_to_sn?: string;
        /** 任务名称 */
        name?: string;
        /** 任务 UUID */
        uuid?: string;
        /** 任务类型 */
        task_type?: number;
        /** 任务状态 */
        status?: number;
        /** 执行设备 SN */
        sn?: string;
        /** 降落机场 SN */
        landing_dock_sn?: string;
        /** 连接设备 SN */
        connect_sn?: string;
        /** 计划开始时间 */
        begin_at?: string;
        /** 计划结束时间 */
        end_at?: string;
        /** 实际执行时间 */
        run_at?: string;
        /** 完成时间 */
        completed_at?: string;
        /** 航线 UUID */
        wayline_uuid?: string;
        /** 断点信息 */
        break_point?: Record<string, unknown>;
        /** 是否断点续飞 */
        is_break_point_resume?: boolean;
        /** 航线预估时长（秒） */
        wayline_duration?: number;
        /** 已完成航点数 */
        current_waypoint_index?: number;
        /** 总航点数 */
        total_waypoints?: number;
        /** 飞控航线索引 */
        wayline_id?: number;
        /** 飞控航线任务状态 */
        wayline_mission_state?: number;
        /** 进度版本号 */
        progress_version?: number;
        /** 过渡航线信息 */
        transition_wayline_info?: Record<string, unknown>;
        /** 是否已读 */
        read_status?: boolean;
        /** 任务来源: 0=司空, 1=三方云 */
        source?: number;
    }>;
};
