import { useMenuStore } from '@/stores/useMenuStore';
import { rebuildRoutes } from './rebuild';
import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

/** 路由配置导出：布局菜单等 UI 从路由派生，避免重复维护 */
const routes: RouteRecordRaw[] = [
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

/** 菜单状态持久化到 sessionStorage（getState 据此恢复），仅注册一次 */
let persistRegistered = false;

router.beforeEach(async (to) => {
    const store = useMenuStore();
    if (!persistRegistered) {
        persistRegistered = true;
        store.$subscribe((_mutation, state) => {
            sessionStorage.setItem('state', JSON.stringify(state));
        });
    }
    const token = sessionStorage.getItem('token');

    if (to.path === '/login') {
        sessionStorage.clear();
        store.$reset();
        return;
    }

    if (!token) {
        return to.path !== '/login' ? '/login' : undefined;
    }

    // 大屏模式依赖当前项目：项目缺失（如状态损坏）时回退管理端，避免空状态大屏
    if (store.mode === 'screen' && !store.currentProject) {
        await store.enterAdmin();
        return;
    }

    if (to.matched.length >= 2) {
        store.currentMenu = {
            length: to.matched.length,
            name: to.matched[1]?.name as string,
            // 使用完整路径，供顶栏菜单 is-selected 的 includes 判断使用
            path: to.path
        };
    }

    /**
     * isNeedUpdate用来控制路由重新注册
     * hasRoue用来防止路由没有注册成功的情况，即便这种情况不应该会发生
     * */
    if (store.isNeedUpdate || !router.hasRoute('layout')) {
        await rebuildRoutes(store);
        return to.fullPath;
    }
    return undefined;
});

export default router;
