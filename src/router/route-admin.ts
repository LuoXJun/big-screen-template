/** 管理端菜单配置：登录后加载，选择项目后切换为大屏菜单（route-screen） */
export const routeConfig: RouteOptions[] = [
    {
        path: '/',
        sort: 0,
        component: 'admin/project',
        name: 'projectList',
        type: 'link',
        title: '项目列表'
    },
    {
        path: '/dataMonitor',
        sort: 1,
        component: 'dataMonitor',
        name: 'dataMonitor',
        type: 'menu',
        title: '数据监控',
        children: [
            {
                path: 'fiberTemp',
                sort: 0,
                component: 'admin/dataMonitor/fiberTemp',
                name: 'fiberTemp',
                type: 'link',
                title: '光纤测温'
            },
            {
                path: 'infrared',
                sort: 1,
                component: 'admin/dataMonitor/infrared',
                name: 'infrared',
                type: 'link',
                title: '红外测温'
            },
            {
                path: 'fireDetect',
                sort: 2,
                component: 'admin/dataMonitor/fireDetect',
                name: 'fireDetect',
                type: 'link',
                title: '火灾检测'
            },
            {
                path: 'droneStatus',
                sort: 3,
                component: 'admin/dataMonitor/droneStatus',
                name: 'droneStatus',
                type: 'link',
                title: '无人机状态'
            },
            {
                path: 'nestStatus',
                sort: 4,
                component: 'admin/dataMonitor/nestStatus',
                name: 'nestStatus',
                type: 'link',
                title: '机巢状态'
            },
            {
                path: 'deviceStatus',
                sort: 5,
                component: 'admin/dataMonitor/deviceStatus',
                name: 'deviceStatus',
                type: 'link',
                title: '设备状态'
            },
            {
                path: 'historyQuery',
                sort: 7,
                component: 'admin/dataMonitor/historyQuery',
                name: 'historyQuery',
                type: 'link',
                title: '历史数据查询'
            }
        ]
    },
    {
        path: '/dataOperation',
        sort: 2,
        component: 'dataOperation',
        name: 'dataOperation',
        type: 'menu',
        title: '数据运营',
        children: [
            {
                path: 'alarmRecord',
                sort: 0,
                component: 'admin/dataOperation/alarmRecord',
                name: 'alarmRecord',
                type: 'link',
                title: '告警记录'
            },
            {
                path: 'alarmHandle',
                sort: 1,
                component: 'admin/dataOperation/alarmHandle',
                name: 'alarmHandle',
                type: 'link',
                title: '告警处理'
            },
            {
                path: 'statReport',
                sort: 2,
                component: 'admin/dataOperation/statReport',
                name: 'statReport',
                type: 'link',
                title: '统计报表'
            },
            {
                path: 'assistDecision',
                sort: 3,
                component: 'admin/dataOperation/assistDecision',
                name: 'assistDecision',
                type: 'link',
                title: '辅助决策'
            },
            {
                path: 'dataAnalysis',
                sort: 4,
                component: 'admin/dataOperation/dataAnalysis',
                name: 'dataAnalysis',
                type: 'link',
                title: '数据分析'
            },
            {
                path: 'techPolicy',
                sort: 5,
                component: 'admin/dataOperation/techPolicy',
                name: 'techPolicy',
                type: 'link',
                title: '技术制度'
            },
            {
                path: 'electronicArchive',
                sort: 6,
                component: 'admin/dataOperation/electronicArchive',
                name: 'electronicArchive',
                type: 'link',
                title: '电子档案'
            }
        ]
    },
    {
        path: '/dronePatrol',
        sort: 3,
        component: 'dronePatrol',
        name: 'dronePatrol',
        type: 'menu',
        title: '无人机巡检系统',
        children: [
            {
                path: 'stationModeling',
                sort: 0,
                component: 'admin/dronePatrol/stationModeling',
                name: 'stationModeling',
                type: 'link',
                title: '场站建模'
            },
            {
                path: 'pvCollect',
                sort: 1,
                component: 'admin/dronePatrol/pvCollect',
                name: 'pvCollect',
                type: 'link',
                title: '光伏板数据采集'
            },
            {
                path: 'overheadLineCollect',
                sort: 2,
                component: 'admin/dronePatrol/overheadLineCollect',
                name: 'overheadLineCollect',
                type: 'link',
                title: '架空线路数据采集'
            },
            {
                path: 'patrolRoutePlan',
                sort: 3,
                component: 'admin/dronePatrol/patrolRoutePlan',
                name: 'patrolRoutePlan',
                type: 'link',
                title: '巡检航线规划'
            },
            {
                path: 'warningDetect',
                sort: 4,
                component: 'admin/dronePatrol/warningDetect',
                name: 'warningDetect',
                type: 'link',
                title: '预警识别'
            },
            {
                path: 'warningLocate',
                sort: 5,
                component: 'admin/dronePatrol/warningLocate',
                name: 'warningLocate',
                type: 'link',
                title: '预警定位'
            },
            {
                path: 'warningReport',
                sort: 6,
                component: 'admin/dronePatrol/warningReport',
                name: 'warningReport',
                type: 'link',
                title: '预警报告生成'
            }
        ]
    }
];
