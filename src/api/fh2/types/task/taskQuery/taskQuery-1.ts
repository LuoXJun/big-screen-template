/**
 * 由 scripts/fh2/gen.mjs 自动生成（2026-09-02），勿手改
 * taskQuery 类型（task 域）
 */
/** 获取当前活动航线任务（DRC 实时控制） */
export type getInFlightData = {
    /** 当前飞行架次 ID */
    flight_id?: string;
    /** 飞行任务类型 */
    flight_type?: number;
    /** 飞行器序列号 */
    sn?: string;
    /** 空中下发航线任务详情（无活跃任务时为 null） */
    in_flight_task?: {
        /** 空中航线任务唯一标识 */
        uuid?: string;
        /** 下发任务的用户 ID */
        user_id?: string;
        /** 任务状态 */
        status?: number;
        /** 航线 UUID */
        wayline_id?: string;
        /** 错误码（0 表示正常） */
        err_code?: number;
        /** 当前执行到的航点序号 */
        way_point_index?: number;
        /** 任务执行进度百分比（0~100） */
        progress_percent?: number;
        /** 任务预估时长（秒） */
        wayline_duration?: number;
        /** 航线总长度（米） */
        wayline_length?: number;
        /** 任务名称 */
        task_name?: string;
    };
    /** 飞行任务扩展数据（结构随任务类型变化） */
    flight_task_data?: Record<string, unknown>;
};

/** 获取当前活动航线任务（任务管理） */
export type getInFlightTaskData = {
    /** 飞行架次 ID */
    flight_id?: string;
    /** 飞行任务类型：0=未知 / 1=航线任务 / 2=指令任务 */
    flight_type?: 0 | 1 | 2;
    /** 飞行器序列号 */
    sn?: string;
    /** 飞行任务扩展数据（结构随任务类型变化） */
    flight_task_data?: Record<string, unknown>;
    /** 指点飞行任务详情（无活跃任务时为 null） */
    fly_to_task?: {
        /** 任务唯一标识 */
        uuid?: string;
        /** 下发用户 ID */
        user_id?: string;
        /** 任务状态 */
        status?: number;
        /** 错误码（0 表示正常） */
        err_code?: number;
        /** 当前航点序号 */
        way_point_index?: number;
        /** 航点列表 */
        way_points?: Record<string, unknown>[];
        /** 规划路径点 */
        planned_path_points?: Record<string, unknown>[];
        /** 剩余距离（米） */
        remaining_distance?: number;
        /** 剩余时间（秒） */
        remaining_time?: number;
    };
    /** 返航信息（飞行器不在返航状态时为 null） */
    return_home_info?: {
        /** 信息时间戳 */
        timestamp?: number;
        /** 规划返航路径点 */
        planned_path_points?: Record<string, unknown>[];
        /** 最后一个路径点类型 */
        last_point_type?: number;
        /** 返航目标机场序列号 */
        home_dock_sn?: string;
        /** 多机场返航信息 */
        multi_dock_home_info?: Record<string, unknown>[];
    };
    /** 是否为首次指点飞行 */
    is_first_fly_to?: boolean;
};

/** 按 UUID 批量查询飞行任务详情 */
export type getBatchData = {
    /** 任务详情列表;顺序与入参 task_uuids 不保证一致 */
    list?: Array<{
        /** 任务 ID(数字主键) */
        id?: number;
        /** 任务 UUID */
        uuid?: string;
        /** 任务名称 */
        name?: string;
        /** 任务类型:1=立即任务 / 2=重复定时(虚拟父) / 3=单次定时 / 4=重复任务子任务(系统生成) / 5=连续执行(虚拟父) / 6=连续执行子任务(系统生成) / 7=试飞任务 */
        task_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
        /** 任务状态:0=待开始 / 1=启动失败 / 2=执行中 / 3=已暂停 / 4=已终止 / 5=成功 / 6=已挂起 / 7=超时 / 8=部分执行 / 9=准备中 / 10=起飞排队中 */
        status?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
        /** 起飞执行设备 SN */
        sn?: string;
        /** 接力降落机场 SN;为空时代表降落机场与起飞机场相同 */
        landing_dock_sn?: string;
        /** 设备类型:0=机场 / 1=遥控器(Pilot);遥控器创建的任务无 begin_at */
        device_type?: 0 | 1;
        /** 计划最早开始时间;遥控器创建的立即任务无此字段 */
        begin_at?: string;
        /** 计划结束时间(重复/连续任务的截止日期) */
        end_at?: string;
        /** 实际执行时间 */
        run_at?: string;
        /** 实际结束时间 */
        completed_at?: string;
        /** 关联航线文件 UUID */
        wayline_uuid?: string;
        /** 关联文件夹 ID */
        folder_id?: number;
        /** 设备层下发指令的 bid(跟踪进度用) */
        bid?: string;
        /** 已飞完的航点数 */
        current_waypoint_index?: number;
        /** 总航点数 */
        total_waypoints?: number;
        /** 媒体上传状态:0=待上传 / 1=上传中 / 2=已完成 */
        media_upload_status?: 0 | 1 | 2;
        /** 续飞配置:""=不可续飞 / "auto"=自动续飞 / "manual"=手动续飞 */
        resumable_status?: string;
        /** 是否为断点续飞任务 */
        is_break_point_resume?: boolean;
        /** 断点续飞模式:"cross_time_segment"=下一时间段从断点续飞 / "within_time_segment"=仅在当前时间段内续飞 */
        breakpoint_resume_mode?: string;
        /** 云云对接标签列表 */
        tags?: string[];
        /** 云云对接存储桶 ID;为空时表示非云云对接任务 */
        cloud_to_cloud_id?: string;
        /** 任务来源:0=司空创建 / 1=三方云下发 */
        source?: 0 | 1;
        /** 避障触发提示:"triggered"=已触发 / "ignored"=已忽略 */
        obstacle_avoidance_notify?: string;
        /** 关联工作流 UUID */
        workflow_uuid?: string;
        /** 是否携带快速建模任务 */
        fast_reconstruction?: boolean;
        /** 是否与其他任务存在时间冲突 */
        is_conflicted?: boolean;
        /** 是否为本次调用标记的跳转目标任务 */
        is_target?: boolean;
        /** 创建任务的用户名 */
        user_name?: string;
        /** 关联航线信息 */
        wayline?: {
            /** 航线文件 UUID */
            id?: string;
            /** 航线文件名称 */
            name?: string;
            /** 航线模板类型列表 */
            template_types?: number[];
            /** 动作类型 */
            action_type?: number;
        };
        /** 媒体文件夹信息;任务未关联文件夹时为 null */
        folder_info?: {
            /** 文件夹 ID */
            folder_id?: number;
            /** 预期媒体文件数 */
            expected_file_count?: number;
            /** 已上传媒体文件数 */
            uploaded_file_count?: number;
        };
        /** 任务等待原因码(排队起飞时使用) */
        wait_reason?: number;
        /** 任务创建时间 */
        created_at?: string;
        /** 任务最近更新时间 */
        updated_at?: string;
        /** 任务执行异常列表 */
        exceptions?: Array<{
            /** 更新时间 */
            updated_at?: string;
            /** 创建时间 */
            created_at?: string;
            /** 异常记录 ID */
            id?: number;
            /** 异常错误码 */
            code?: number;
            /** 异常描述 */
            message?: string;
            /** 关联任务 ID */
            task_id?: number;
            /** 异常发生时间 */
            happen_at?: string;
            /** 设备 SN */
            sn?: string;
        }>;
        /** 软删除时间，未删除时为 null */
        deleted_at?: string;
        /** 任务操作日志列表 */
        operations?: Array<{
            /** 操作记录 ID */
            id?: number;
            /** 创建时间 */
            created_at?: string;
            /** 更新时间 */
            updated_at?: string;
            /** 关联任务 ID */
            item_id?: number;
            /** 关联表名 */
            table_name?: string;
            /** 操作类型 */
            operation_type?: number;
            /** 操作人 ID */
            operator_id?: string;
            /** 操作人姓名 */
            operator_name?: string;
            /** 操作人角色 */
            operator_role?: string;
            /** 操作人账号 */
            operator_account?: string;
        }>;
    }>;
};
