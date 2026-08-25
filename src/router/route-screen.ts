/** 大屏菜单配置：管理端选择项目后加载，页面保持现有大屏逻辑 */
export const routeConfig: RouteOptions[] = [
    {
        path: '/',
        sort: 0,
        component: 'screen/index',
        name: 'home',
        type: 'link',
        title: '首页'
    },
    {
        path: '/A',
        sort: 1,
        component: 'screen/A',
        name: 'pageA',
        type: 'link',
        title: '页面A'
    }
];
