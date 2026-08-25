import type { Component } from 'vue';
import type { MenuMode, useMenuStore } from '@/stores/useMenuStore';

/** 布局组件按模式懒加载：admin = 管理端布局，screen = 大屏布局 */
const layoutMap: Record<MenuMode, () => Promise<{ default: Component }>> = {
    admin: () => import('@/views/index.vue'),
    screen: () => import('@/views/layout/index.vue')
};

/**
 * 按 store 当前菜单配置重建动态路由（根路由 name 固定为 layout）。
 * 供路由守卫（刷新/首次进入兜底）与 store 切换模式（管理端 <-> 大屏）复用。
 */
export async function rebuildRoutes(store: ReturnType<typeof useMenuStore>): Promise<void> {
    const layout = await layoutMap[store.mode]();
    store.setRoute(store.getRoutes(store.menu), layout.default);
    store.isNeedUpdate = false;
}
