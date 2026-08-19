import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

/** 路由配置导出：布局菜单等 UI 从路由派生，避免重复维护 */
export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        // 全局布局（导航/地图/图层控制）：子路由切换不卸载，状态跨页面保留
        component: () => import('@/views/layout/index.vue'),
        children: [
            {
                path: '',
                name: 'home',
                meta: { title: '首页' },
                component: () => import('@/views/pages/index.vue')
            },
            {
                path: 'A',
                name: 'pageA',
                meta: { title: '页面A' },
                component: () => import('@/views/pages/A/index.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)',
        name: 'notFound',
        component: () => import('@/views/notFound.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});

export default router;
