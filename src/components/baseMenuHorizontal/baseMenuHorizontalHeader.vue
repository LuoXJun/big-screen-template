<template>
    <div class="base-horizontal-menu-header">
        <div class="menu-part">
            <template v-for="menu in menus" :key="menu.name">
                <div v-if="!menu.isHidden" class="lxj-menu-item" @click="goPath(menu)">
                    <span :class="{ 'is-selected': isMenuActive(menu) }">
                        {{ menu.title }}
                    </span>
                </div>
            </template>
        </div>
        <div class="operation-part">
            <el-button @click="$router.push('/login')">退出登录</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/useMenuStore';
import { useRouter } from 'vue-router';
const router = useRouter();
const store = useMenuStore();

const menus = computed(() => {
    return store.menu.sort((a, b) => {
        return a.sort! - b.sort!;
    });
});

const getRedirect = (menu: RouteOptions, path = '') => {
    path = path ? path + '/' + menu.path : menu.path;

    if (menu.children && menu.children.length > 0) return getRedirect(menu.children[0], path);

    return path;
};

const goPath = (menu: RouteOptions) => {
    const path = getRedirect(menu);

    router.push(path);
};

/** 顶栏选中判断：精确路径前缀匹配，避免 '/' 永远命中 */
const isMenuActive = (menu: RouteOptions) => {
    const cur = store.currentMenu.path;
    return cur === menu.path || cur.startsWith(menu.path + '/');
};
</script>

<style scoped lang="scss">
.base-horizontal-menu-header {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    box-sizing: border-box;
    .menu-part {
        height: 100%;
        display: flex;
        align-items: center;

        .lxj-menu-item {
            cursor: pointer;
            > span {
                color: var(--color-on-dark);
                margin-right: 20px;
                display: inline-block;
                padding: 8px 20px;
                transition: background 0.2s;
                &:hover {
                    background: var(--bg-selected);
                }
                &.is-selected {
                    background: color-mix(in srgb, var(--bg-selected) 80%, transparent);
                }
            }
        }
    }

    // 退出登录按钮：深色玻璃风，适配深蓝顶栏
    :deep(.el-button) {
        color: var(--color-on-dark);
        background: var(--bg-selected);
        border-color: var(--border-on-dark-strong);
        transition: all 0.2s;

        &:hover {
            background: var(--bg-selected);
            border-color: var(--color-brand);
            color: var(--color-brand);
        }
    }
}
</style>
