import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'login',
        meta: {
            title: '首页'
        },
        component: () => {
            return import('@/views/pages/index.vue');
        }
    },
    {
        path: '/:pathMatch(.*)',
        name: '404',
        component: () => {
            return import('@/views/notFound.vue');
        }
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
