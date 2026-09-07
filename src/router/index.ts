import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { screenRoutes } from './route';

/** 大屏页面加载器：路径约定 views/pages/**\/index.vue，配置驱动避免手写 import */
const views = import.meta.glob('@/views/pages/**/index.vue');
const fallbackView = () => import('@/views/notFound.vue');

/** layout 子路由由大屏配置生成，顶栏菜单（BaseMenu）从这些路由的 meta.title 派生 */
const screenChildren: RouteRecordRaw[] = screenRoutes
    .filter((item) => !item.isHidden)
    .map((item) => ({
        path: item.path,
        name: item.name,
        component: views[`/src/views/pages/${item.component}/index.vue`] ?? fallbackView,
        meta: { title: item.title }
    }));

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'layout',
        component: () => import('@/views/layout/index.vue'),
        children: screenChildren
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: () => import('@/views/pages/login/index.vue')
    },
    {
        path: '/:pathMatch(.*)',
        name: '404',
        component: fallbackView
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});

/** 大屏登录校验：未登录重定向登录页，进入登录页即清理会话 */
router.beforeEach((to) => {
    if (to.path === '/login') {
        sessionStorage.clear();
        return;
    }
    if (!sessionStorage.getItem('token')) return '/login';
    return undefined;
});

export default router;
