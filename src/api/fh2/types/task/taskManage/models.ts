/**
 * 由 scripts/fh2/gen.mjs 自动生成（2026-09-02），勿手改
 * taskManage 共享模型（task 域）
 */
/** 模型 C0160_GetFlightTaskAdvanced_Resp */
export type C0160_GetFlightTaskAdvanced_Resp = {
    /** 任务名称 */
    name?: string;
    /** 任务唯一标识 */
    uuid?: string;
    /** 任务类型：1-立即任务，2-重复任务，3-定时任务，4-子任务 */
    task_type?: 1 | 2 | 3 | 4;
    /** 任务状态：0-待开始 / 1-启动失败 / 2-执行中（飞行中）/ 3-已暂停 / 4-终止 / 5-成功 / 6-挂起 / 7-超时 / 8-部分执行（如低电量返航）/ 9-准备中 / 10-起飞排队中 */
    status?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    /** 执行任务的机场 SN */
    sn?: string;
    /** 降落机场 SN（为空则与起飞机场一致） */
    landing_dock_sn?: string;
    /** 连接设备 SN */
    connect_sn?: string;
    /** 任务对应的航线 UUID */
    wayline_uuid?: string;
    /** 任务最早开始时间 */
    begin_at?: string;
    /** 任务最晚开始时间 */
    latest_begin_at?: string;
    /** 重复/连续计划的多个最早起始时间戳 */
    extended_begin_at?: string[];
    /** 与 extended_begin_at 一一对应的最晚开始时间 */
    extended_latest_begin_at?: string[];
    /** 连续任务的时间段列表 */
    continuous_task_periods?: string[];
    /** 任务设定的结束时间 */
    end_at?: string;
    /** 重复频率类型：0-不重复 / 1-每几秒 / 2-每几分钟 / 3-每几小时 / 4-每几天 / 5-每几周 / 6-每几月（按日期）/ 7-每几月（按星期）/ 8-绝对每年 */
    repeat_type?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    /** 重复间隔（间隔，单位由 repeat_type 决定） */
    interval?: number;
    /** 按周重复时的星期几列表 */
    dow?: string[];
    /** 按月重复时的日期列表 */
    dom?: string[];
    /** 按月第几周重复 */
    wom?: number;
    /** 航线失控动作：0-返航，1-继续执行 */
    out_of_control_action_in_flight?: number;
    /** 返航高度 */
    rth_altitude?: number;
    /** 返航高度模式：0-智能高度，1-设定高度 */
    rth_mode?: 0 | 1;
    /** 任务执行最低电量，单位：% */
    min_battery_capacity?: number;
    /** 续飞状态：空-不可续飞，auto-自动续飞，manual-手动续飞 */
    resumable_status?: 'auto' | 'manual';
    /** 断点续飞执行方式（resumable_status=auto 时使用）：within_time_segment-仅在单时间段内续飞（默认） / cross_time_segment-下一时间段从断点续飞 */
    breakpoint_resume_mode?: 'within_time_segment' | 'cross_time_segment';
    /** 航线精度类型：0-GPS / 1-RTK */
    wayline_precision_type?: 0 | 1;
    /** 云云对接标签 */
    tags?: string[];
    /** 云云对接存储桶 ID（非云云对接任务为空） */
    cloud_to_cloud_id?: string;
    /** 任务异常信息列表 */
    exceptions?: Array<{
        /** 异常错误码 */
        code?: number;
        /** 异常描述 */
        message?: string;
        /** 关联任务 ID */
        task_id?: string;
        /** 异常发生时间 */
        happen_at?: string;
        /** 设备 SN */
        sn?: string;
    }>;
    /** 周期任务的父任务 ID */
    parent_task_id?: number;
    /** 媒体上传文件夹信息（私有化 openapi 含媒体总数） */
    folder_info?: {
        /** 文件夹 ID */
        folder_id?: number;
        /** 预期文件数 */
        expected_file_count?: number;
        /** 已上传文件数 */
        uploaded_file_count?: number;
    };
    /** 执行航段索引数组，空数组表示全选 */
    wayline_segment_indexes?: string[];
    /** 关联工作流 UUID */
    workflow_uuid?: string;
    /** 已完成的航点序号 */
    current_waypoint_index?: number;
    /** 航线总航点数 */
    total_waypoints?: number;
    /** 订阅告警的接收方式列表 */
    subscription_receive_type?: string[];
    /** 订阅告警的用户列表 */
    subscription_user?: string[];
    /** Web 端告警频率，单位：秒（推送最小间隔） */
    subscription_alert_user_web_frequency?: number;
    /** 邮件告警频率，单位：秒（推送最小间隔） */
    subscription_alert_email_frequency?: number;
    /** 短信告警频率，单位：秒（推送最小间隔） */
    subscription_alert_phone_frequency?: number;
    /** 云云对接告警频率，单位：秒（推送最小间隔） */
    subscription_alert_cloud_to_cloud_frequency?: number;
    /** 航线相关信息（名称、缩略图、配置等） */
    wayline?: {
        /** 航线 ID */
        id?: number;
        /** 航线名称 */
        name?: string;
        /** 动作类型 */
        action_type?: number;
        /** 模板类型列表 */
        template_types?: number[];
    };
    /** 媒体文件夹层级路径 */
    media_folder_id_paths?: string;
    /** 是否启用快速重建 */
    fast_reconstruction?: boolean;
    /** 执行设备机型 */
    device_type?: 0 | 1;
    /** VLM 多模态识别配置（仅当任务开启 VLM 时返回） */
    vlm_config?: Record<string, unknown>;
};

/** 模型 C0617_GetFlightTasks_Resp */
export type C0617_GetFlightTasks_Resp = {
    /** 飞行任务列表（按 begin_at 降序，每项 60+ 字段 嵌入字段并覆盖 ID/Sn/Status 等同名字段） */
    list?: Array<{
        /** 记录创建时间 */
        created_at?: string;
        /** 设定的开始时间 */
        begin_at?: string;
        /** 设定的结束时间 */
        end_at?: string;
        /** 飞行任务 ID（业务侧聚合 key） */
        flight_task_id?: string;
        /** 飞行片段 ID（一次飞行=一个片段，全局唯一） */
        flight_piece_id?: string;
        /** 起飞机场 SN */
        take_off_airport_sn?: string;
        /** 降落机场 SN（默认与起飞机场一致） */
        land_airport_sn?: string;
        /** 任务连接的设备 SN */
        connect_device_sn?: string;
        /** 任务大类：1=立即 / 2=重复(虚拟父) / 3=单次定时 / 4=子任务 / 5=连续(虚拟父) / 6=连续子任务 / 7=试飞 */
        task_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
        /** 飞行任务来源类型：1=自动任务 自动任务 / 2=手动任务（由操作员在飞行过程中手动发起） / 3=手动任务 FromPilot Pilot 导入手动任务 */
        flight_task_type?: 1 | 2 | 3;
        /** 飞行片段是否完成：1=NotFinished 未完成 / 2=Finished 已完成 */
        flight_task_status?: 1 | 2;
        /** 任务状态：0=Waiting / 1=StartingFailure / 2=Executing / 3=Paused / 4=Terminated / 5=Success / 6=Suspended / 7=Timeout / 8=Par */
        task_status?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
        /** 任务名称 */
        task_name?: string;
        /** 任务创建者 user_id */
        user_id?: string;
        /** 项目 UUID */
        prj_uuid?: string;
        /** 关联航线 UUID */
        wayline_uuid?: string;
        /** 云云对接存储桶 ID（空字符串=非云云对接任务） */
        cloud_to_cloud_id?: string;
        /** 工作流 UUID（空字符串=非工作流任务） */
        workflow_uuid?: string;
        /** 记录自增 ID（FlightTask.ID 覆盖嵌入） */
        id?: number;
        /** 任务 UUID（业务唯一标识） */
        uuid?: string;
        /** 任务名称（前端展示用，与 task_name 冗余） */
        name?: string;
        /** 执行任务的起飞机场 SN */
        sn?: string;
        /** 飞行器 SN（手飞场景下机场上飞的飞行器） */
        drone_sn?: string;
        /** 降落机场 SN（与 land_airport_sn 同语义） */
        landing_dock_sn?: string;
        /** 任务状态（同 task_status，前端兼容旧版字段名） */
        status?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
        /** 实际起飞时间（无值表示尚未起飞） */
        run_at?: string;
        /** 实际结束/完成时间（无值表示未完成） */
        completed_at?: string;
        /** 任务起算时间（用于子任务/重复任务时间窗口判断） */
        task_start_time?: string;
        /** 任务终止时间 */
        task_end_time?: string;
        /** 记录最近更新时间 */
        update_at?: string;
        /** 飞行回放记录 */
        records?: Array<{
            /** 回放记录 ID */
            id?: number;
            /** 创建时间（Unix 时间戳） */
            created_at?: string;
            /** 飞行片段 ID */
            flight_piece_id?: string;
            /** 上传 SN（机场设备 SN） */
            upload_sn?: string;
            /** 飞行记录文件 OSS 对象路径 */
            flight_record_path?: string;
            /** 本次飞行距离（米） */
            distance?: number;
            /** 本次飞行时长（秒） */
            duration?: number;
        }>;
        /** 飞行任务总航点数 */
        total_waypoints?: number;
        /** 媒体上传状态：0=MediaToUpload 待上传 / 1=MediaUploading 上传中 / 2=MediaUploadFinished 上传结束 */
        media_upload_status?: 0 | 1 | 2;
        /** 航线失控动作：1=WayLineTaskReturnHome 返航 / 2=WayLineTaskContinue 继续执行 */
        out_of_control_action_in_flight?: 1 | 2;
        /** 关联媒体文件夹 ID（0=尚未生成，飞行结束后异步创建） */
        folder_id?: number;
        /** DTCP 业务 ID（同一次设备指令的追踪 key） */
        bid?: string;
        /** 当前已完成航点序号（基于 0） */
        current_waypoint_index?: number;
        /** 续飞状态：空字符串=不可续飞 / "auto"=AutoResume 自动续飞 / "manual"=ManualResume 手动续飞 */
        resumable_status?: '' | 'auto' | 'manual';
        /** 是否为断点续飞产生的子任务 */
        is_break_point_resume?: boolean;
        /** 云云对接标签列表 */
        tags?: string[];
        /** 任务创建来源：0=司空平台创建 / 1=云云对接创建 云云对接 / 2=智能巡检自动配置 AEC 自动化 */
        source?: 0 | 1 | 2;
        /** 任务操作审计日志 */
        operations?: Array<{
            /** 操作记录 ID */
            id?: number;
            /** 创建时间（Unix 时间戳） */
            created_at?: string;
            /** 更新时间（Unix 时间戳） */
            updated_at?: string;
            /** 软删时间 */
            deleted_at?: string;
            /** 被操作对象 ID（task ID） */
            item_id?: number;
            /** 被操作的表名（目前只有 tasks） */
            table_name?: string;
            /** 操作类型：0=CreateOperation 创建 / 1=TerminateOperation 终止 / 2=UpdateOperation 修改 / 3=DeleteOperation 删除 */
            operation_type?: 0 | 1 | 2 | 3;
            /** 操作用户 ID */
            operator_id?: string;
            /** 操作用户名（运行时填充，非持久化） */
            operator_name?: string;
            /** 操作用户角色 */
            operator_role?: string;
            /** 操作用户账号 */
            operator_account?: string;
        }>;
        /** 任务异常记录 */
        exceptions?: Array<{
            /** 异常记录 ID */
            id?: number;
            /** 创建时间（Unix 时间戳） */
            created_at?: string;
            /** 更新时间（Unix 时间戳） */
            updated_at?: string;
            /** 删除时间（Unix 时间戳） */
            deleted_at?: string;
            /** 异常码（业务定义的设备/任务异常分类） */
            code?: number;
            /** 异常描述消息 */
            message?: string;
            /** 关联任务 ID */
            task_id?: number;
            /** 异常发生时间 */
            happen_at?: string;
            /** 触发异常的设备 SN */
            sn?: string;
        }>;
        /** 是否与其他定时任务冲突（前端用于角标提示） */
        is_conflicted?: boolean;
        /** 是否是请求中 target_task_uuid 指定的目标任务（用于初始化加载时跳转定位） */
        is_target?: boolean;
        /** 任务创建者显示名（运行时关联 user 表填充） */
        user_name?: string;
        /** 关联航线信息 */
        wayline?: {
            /** 航线 UUID（与 wayline_uuid 一致） */
            id?: string;
            /** 航线名称 */
            name?: string;
            /** 航线模板类型集合（来自 wpmz 解析，如 [0]=航点 / [3]=条带 / [4]=建图） */
            template_types?: number[];
            /** 航点动作类型（航线整体的主要动作分类） */
            action_type?: number;
        };
        /** 媒体文件夹上传进度信息（FolderUploadInfo，仅当 folder_id != 0 时返回） */
        folder_info?: {
            /** 文件夹 ID */
            folder_id?: number;
            /** 预期文件数（飞行任务下发时统计） */
            expected_file_count?: number;
            /** 已上传文件数（实时更新） */
            uploaded_file_count?: number;
        };
        /** 排队等待原因码（status=10 QueueForTakeoff 时有意义；具体码值参见错误码文档） */
        wait_reason?: number;
        /** 任务避障提醒状态：空字符串=无 / "triggered"=已触发 / "ignored"=已忽略 */
        obstacle_avoidance_notify?: '' | 'triggered' | 'ignored';
        /** 是否有快速建模任务（飞行结束后自动建模） */
        fast_reconstruction?: boolean;
        /** 设备类型：0=机场 / 1=遥控器 */
        device_type?: 0 | 1;
    }>;
    /** 分页信息 */
    pagination?: {
        /** 当前页码（从 1 开始） */
        page?: number;
        /** 每页条数（max=100） */
        page_size?: number;
        /** 满足过滤条件的总条数 */
        total?: number;
    };
};
