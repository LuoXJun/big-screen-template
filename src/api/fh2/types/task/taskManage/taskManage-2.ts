/**
 * 由 scripts/fh2/gen.mjs 自动生成（2026-09-02），勿手改
 * taskManage 类型（task 域）
 */
/** 检查飞行任务是否满足下发条件 */
export type getCheckData = {
    /** 任务检查错误列表 */
    errors?: Array<{
        /** 错误码 */
        code?: number;
        /** 错误消息 */
        message?: string;
        /** 错误级别(0=info 1=warning 2=error) */
        level?: 0 | 1 | 2;
    }>;
    /** 设备位置(失败时为 null) */
    device_position?: {
        /** 纬度 */
        latitude?: number;
        /** 经度 */
        longitude?: number;
        /** 高度(米) */
        altitude?: number;
    };
};

/** 标记任务为已读状态 */
export type updateReadConfirmData = Record<string, unknown>;

/** 检查飞行任务阻飞项 */
export type createRejectTakeoffData = {
    /** 天气阻飞列表 */
    weather_rto?: Array<{
        /** 是否阻飞 */
        result?: boolean;
        /** 阻飞码 */
        code?: number;
        value?: string;
        /** 设备 SN */
        sn?: string;
    }>;
    /** RTK 未标定阻飞检测结果（当前版本未启用，始终返回空数组） */
    rtk_not_calibration_rto?: Array<{
        /** 被检测的飞行器 SN */
        sn?: string;
        /** 是否阻飞：true=阻飞 / false=放行 */
        result?: boolean;
        /** 阻飞业务错误码（仅 result=true 时有意义） */
        code?: number;
    }>;
    /** GPS 航线精度阻飞检测结果（移动部署场景） */
    wayline_precision_rto?: Array<{
        /** 被检测的飞行器 SN */
        sn?: string;
        /** 是否阻飞：true=阻飞 / false=放行 */
        result?: boolean;
        /** 阻飞业务错误码（仅 result=true 时有意义） */
        code?: number;
    }>;
};
/** 检查飞行任务阻飞项 请求体 */
export type createRejectTakeoffBody = {
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
    /** week-of-month，每月第 N 个 dow,repeat_type=7 时必填 */
    wom?: number;
    /** 最早开始时间（unix 时间戳，单位：秒）。task_type≠1（非立即任务）时必填 */
    begin_at?: number;
    /** 最晚开始时间（unix 时间戳，单位：秒）。与 begin_at 构成执行时间窗口 [begin_at, latest_begin_at]，空值时降级为单点任务（行为同旧逻辑） */
    latest_begin_at?: number;
    /** 重复 / 连续任务的截止时间（unix 时间戳，单位：秒）。task_type=2 或 5 时必填 */
    end_at?: number;
    /** 重复计划的多个执行时间（最早开始时间数组，unix 秒）。task_type=2 时必填 */
    extended_begin_at?: number[];
    /** 重复计划的多个最晚开始时间数组（unix 秒），与 extended_begin_at 一一对应。为空时所有时间点退化为单点任务（向前兼容） */
    extended_latest_begin_at?: number[];
    /** 连续计划的多个执行时段，每个子数组长度为 2（[起始时间, 结束时间]，unix 秒）。task_type=5 时必填 */
    continuous_task_periods?: number[][];
    /** IANA 时区名称，如 "Asia/Chongqing" */
    time_zone: string;
    /** 航线预估执行时长，单位：秒 */
    wayline_duration?: number;
    /** 执行设备 SN（机场或飞行器序列号） */
    sn: string;
    /** 接力降落机场 SN（A 起 B 降场景使用，不能与 sn 相同） */
    landing_dock_sn?: string;
    /** 连接 SN（透传给设备层，具体语义视场景） */
    connect_sn?: string;
    /** 飞行计划名称 */
    name: string;
    /** 连续任务的最低执行电量百分比（task_type=5 时必填），单位：% */
    min_battery_capacity?: number;
    /** 续飞状态：''-不可续飞 / 'auto'-自动续飞 / 'manual'-手动续飞 */
    resumable_status: 'auto' | 'manual';
    /** 断点续飞执行方式：'cross_time_segment'-下一时间段从断点续飞 / 'within_time_segment'-仅单个时间段内续飞 */
    breakpoint_resume_mode?: 'cross_time_segment' | 'within_time_segment';
    /** 航线失控动作（：1=ReturnHome返航 / 2=Continue继续执行 */
    out_of_control_action_in_flight: 1 | 2;
    /** 返航高度（相对起飞点），单位：米 */
    rth_altitude: number;
    /** 返航高度模式：0=智能高度返航 / 1=设定高度返航 */
    rth_mode?: 0 | 1;
    /** 航线精度类型：0=GPS航线 / 1=RTK高精度航线 */
    wayline_precision_type?: 0 | 1;
    /** 航线文件 UUID */
    wayline_uuid: string;
    /** 云云对接标签，每项长度 1-45 字符，最多 10 个 */
    tags?: string[];
    /** 云云对接存储桶 ID */
    cloud_to_cloud_id?: string;
    /** 任务业务类型：1-AI 飞行任务（其余值视为普通任务） */
    business_type?: 0 | 1;
    /** 告警通知订阅渠道：email-邮件 / phone-短信 / user_web-站内信 / cloud_to_cloud-云云对接推送 */
    subscription_receive_type?: 'email' | 'phone' | 'user_web' | 'cloud_to_cloud'[];
    /** 站内信告警推送的最小间隔，单位：秒 */
    subscription_alert_user_web_frequency?: number;
    /** 云云对接告警推送的最小间隔，单位：秒 */
    subscription_alert_cloud_to_cloud_frequency?: number;
    /** 邮件告警推送的最小间隔，单位：秒 */
    subscription_alert_email_frequency?: number;
    /** 短信告警推送的最小间隔，单位:秒 */
    subscription_alert_phone_frequency?: number;
    /** 订阅告警的用户 ID 列表 */
    subscription_user_id?: string[];
    /** 云云对接推送目标组织的 UUID */
    push_c2c_organization_uuid?: string;
    /** 执行航段索引数组（指定执行航线中的部分航段，目前不限制数量） */
    wayline_segment_indexes?: number[];
    /** 媒体采集数据的存储目录路径（指定本次任务生成的媒体文件归档到哪个文件夹） */
    media_folder_id_paths?: string;
    /** 是否携带快速建模任务 */
    fast_reconstruction?: boolean;
    /** 设备类型：0-机场 / 1-遥控器 */
    device_type?: 0 | 1;
    /** 是否开启 VLM（视觉语言模型）识别。开启后 prompt_uuid / labels / drone_sn / payload_index 均为必填 */
    vlm_enabled?: boolean;
    /** AI-Agent 侧 prompt 配置 UUID（vlm_enabled=true 时必填） */
    prompt_uuid?: string;
    /** VLM 检测标签列表（vlm_enabled=true 时必填） */
    labels?: string[];
    /** VLM 告警标题，用于短信 / 邮件通知 */
    alert_title?: string;
    /** VLM 告警内容正文，用于短信 / 邮件通知 */
    alert_content?: string;
    /** 告警记录最小间隔，单位：秒，默认 5 */
    alert_record_interval?: number;
    /** 飞行器 SN（vlm_enabled=true 时必填） */
    drone_sn?: string;
    /** 负载索引（DRC 协议侧称 Camera，vlm_enabled=true 时必填） */
    payload_index?: string;
    /** 当前语言的计划默认名称 */
    default_name: string;
    /** 航线航点数 */
    wayline_segment_points?: number;
};

/** 支持断点续飞的立即任务 */
export type createResumeImmediateData = {
    /** 目标飞行任务信息 */
    task?: {
        /** 任务 UUID */
        uuid?: string;
        /** 任务开始时间(unix 时间戳,秒) */
        begin_at?: number;
        /** 任务结束时间(unix 时间戳,秒) */
        end_at?: number;
        /** 航线有效性检查码 */
        wayline_validity_check_codes?: number[];
        /** 父任务信息(仅子任务有值) */
        parent_task?: {
            /** 父任务 UUID */
            uuid?: string;
        };
    };
};
/** 支持断点续飞的立即任务 请求体 */
export type createResumeImmediateBody = {
    /** 任务 UUID */
    task_uuid: string;
};

/** 删除飞行任务 */
export type deleteFlightTasksData = Record<string, unknown>;
