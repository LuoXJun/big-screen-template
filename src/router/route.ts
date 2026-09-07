/** 大屏页面配置：新增页面仅需在此登记，组件路径约定为 views/pages/**\/index.vue */
export interface ScreenRoute {
    /** 相对 layout 的路径，'' 表示首页 */
    path: string;
    name: string;
    /** views/pages 下的目录相对路径 */
    component: string;
    title: string;
    /** 是否在菜单中隐藏（隐藏时不注册路由） */
    isHidden?: boolean;
}

export const screenRoutes: ScreenRoute[] = [
    { path: '', name: 'home', component: 'screen/index', title: '首页' },
    { path: 'A', name: 'pageA', component: 'screen/A', title: '页面A' }
];
