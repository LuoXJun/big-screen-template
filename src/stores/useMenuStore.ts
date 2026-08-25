import { defineStore } from 'pinia';
import type { Component } from 'vue';
import { type RouteRecordRaw, RouterView } from 'vue-router';
import { routeConfig as adminConfig } from '@/router/route-admin';
import { routeConfig as screenConfig } from '@/router/route-screen';
import { rebuildRoutes } from '@/router/rebuild';
import router from '@/router';

const views = import.meta.glob('@/views/pages/**/index.vue');
const Null = import.meta.glob('@/views/Null.vue');

/** 菜单模式：admin = 管理端，screen = 大屏，决定挂载哪种布局 */
export type MenuMode = 'admin' | 'screen';

export interface ProjectBrief {
    id: string;
    name: string;
}

interface UseMenu {
    // 没有被处理过的原始路由表
    menu: RouteOptions[];
    /**当前模式：管理端 / 大屏*/
    mode: MenuMode;
    /**更新路由*/
    isNeedUpdate: boolean;
    /**更新菜单,路由和显示的菜单并不总是同时更新，所以单独控制*/
    refreshMenu: boolean;
    isCollapse: boolean;
    records: { path: string; title: string }[];
    currentMenu: { name: string; path: string; length: number };
    /**管理端选中的项目，供大屏使用*/
    currentProject: ProjectBrief | null;
}

const getState = () => {
    const storageState = JSON.parse(sessionStorage.getItem('state') as string) as UseMenu;
    if (storageState) storageState.isNeedUpdate = true;
    const state =
        storageState ||
        ({
            menu: [],
            mode: 'admin',
            isNeedUpdate: true,
            refreshMenu: true,
            isCollapse: false,
            records: [],
            currentMenu: {
                name: '',
                path: '',
                length: 0
            },
            currentProject: null
        } as UseMenu);
    return state;
};

export const useMenuStore = defineStore('menu', {
    state: getState,
    actions: {
        // 将原始路由表转为vue-router的支持格式
        getRoutes(menus: RouteOptions[]) {
            const routes: RouteRecordRaw[] = [];
            for (const menu of menus) {
                // 作为父级存在且没有子级时隐藏
                if (menu.type === 'menu' && (!menu.children || menu.children.length === 0))
                    continue;
                // 作为页面级别时且被隐藏是不注册----也就是 子级显隐不受父级影响
                if (menu.type === 'link' && menu.isHidden) continue;
                const obj: RouteRecordRaw = {
                    path: menu.path,
                    name: menu.name,
                    redirect: menu.redirect ?? '',
                    component:
                        menu.type === 'menu'
                            ? RouterView
                            : views[`/src/views/pages/${menu.component}/index.vue`] ||
                              Null[`/src/views/Null.vue`],
                    meta: {
                        sort: menu.sort ?? 0,
                        icon: menu.icon,
                        title: menu.title,
                        type: menu.type,
                        isHidden: menu.isHidden || false
                    },
                    children: []
                };

                if (menu.type === 'menu') {
                    obj.children.push(...this.getRoutes(menu.children!));
                }
                routes.push(obj);
            }

            return routes;
        },
        /** 动态注册 / 布局路由（name 固定为 layout，注册前先移除旧路由保证切换干净） */
        setRoute(routes: RouteRecordRaw[], layout: Component) {
            if (router.hasRoute('layout')) router.removeRoute('layout');
            const route: RouteRecordRaw = {
                path: '/',
                name: 'layout',
                meta: {
                    title: '首页'
                },
                component: layout,
                children: routes
            };
            router.addRoute(route);
        },
        /** 登录进入管理端：加载管理端菜单 */
        async enterAdmin() {
            this.menu = adminConfig;
            this.mode = 'admin';
            this.currentProject = null;
            this.isNeedUpdate = true;
            // 当前可能已在 '/'，直接 push 会被判定为重复导航而不触发守卫，故先重建再跳转
            await rebuildRoutes(this);
            router.replace('/');
        },
        /** 选择项目进入大屏：加载大屏菜单并记录当前项目 */
        async enterScreen(project: ProjectBrief) {
            this.currentProject = project;
            this.menu = screenConfig;
            this.mode = 'screen';
            this.isNeedUpdate = true;
            await rebuildRoutes(this);
            router.replace('/');
        }
    }
});
