/**
 * 由 scripts/fh2/gen.mjs 自动生成（2026-09-02），勿手改
 * taskManage 类型（task 域）
 */
import type { C0160_GetFlightTaskAdvanced_Resp, C0617_GetFlightTasks_Resp } from './models';

/** 编辑飞行任务 */
export type updateFlightTasksData = Record<string, unknown>;
/** 编辑飞行任务 请求体 */
export type updateFlightTasksBody = {
    /** 任务类型:2=重复定时任务 / 3=单次定时任务 / 5=连续执行任务(立即任务不可编辑) */
    task_type: 2 | 3 | 5;
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
    /** 设备直传标签，每项长度 1-45 字符，最多 10 个；用于标记直传任务数据 */
    tags?: string[];
    /** 设备直传目标存储桶 ID；开启设备直传时必填 */
    cloud_to_cloud_id?: string;
    /** 是否开启设备直传；true 表示任务产生的媒体文件直传至第三方存储桶（需项目已开启设备直传） */
    media_direct_transfer?: boolean;
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
    /** 航线航点数 */
    wayline_segment_points?: number;
};

/** 获取飞行任务详情 */
export type getFlightTasksData = C0160_GetFlightTaskAdvanced_Resp;

/** 下发任务媒体优先上传指令 */
export type createCmdsData = Record<string, unknown>;
/** 下发任务媒体优先上传指令 请求体 */
export type createCmdsBody = {
    /** 任务 UUID */
    task_uuid?: string;
    /** 设备指令方法。upload_flighttask_media_prioritize：优先上传飞行任务媒体文件 */
    device_cmd_method?: 'upload_flighttask_media_prioritize';
};

/** 创建续飞任务（保留原断点） */
export type createResumeData = {
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
/** 创建续飞任务（保留原断点） 请求体 */
export type createResumeBody = {
    /** 任务 UUID */
    task_uuid: string;
};

/** 更新飞行任务挂起状态（挂起 / 解除挂起 / 取消） */
export type updateStatusData = Record<string, unknown>;
/** 更新飞行任务挂起状态（挂起 / 解除挂起 / 取消） 请求体 */
export type updateStatusBody = {
    /** 新状态:"suspended"=挂起 / "restored"=解除挂起(恢复待执行)/ "canceled"=终止 / "paused"=暂停 / "in_progress"=继续执行 */
    status?: 'suspended' | 'restored' | 'canceled' | 'paused' | 'in_progress';
    /** 影响范围：0-仅更新当前任务，1-更新所有待执行任务（仅挂起/解除场景生效） */
    scope?: number;
};

/** 查询飞行任务列表 */
export type getFlightTasksTaskData = C0617_GetFlightTasks_Resp;
