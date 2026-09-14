/** 管理端菜单配置：登录后加载，选择项目后切换为大屏菜单（route-screen） */
export const routeConfig: RouteOptions[] = [
    {
        path: '/',
        sort: 0,
        component: 'admin/project',
        name: 'projectList',
        type: 'link',
        title: '项目列表'
    }
];
