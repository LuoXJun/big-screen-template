<template>
    <el-menu
        mode="horizontal"
        :ellipsis="false"
        :default-active="activePath"
        class="base-menu"
        @select="onSelect"
    >
        <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
            {{ item.label }}
        </el-menu-item>
    </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/**
 * 布局路由菜单：菜单项从当前布局路由的子路由派生（meta.title 作菜单名，path 作跳转地址），
 * 单一事实来源——新增页面只需注册路由并配置 meta.title。
 */
const route = useRoute();
const router = useRouter();

const menuItems = computed(() => {
    const layoutRoute = route.matched[0];
    return (layoutRoute?.children ?? [])
        .filter((child) => child.meta?.title)
        .map((child) => ({
            label: String(child.meta!.title),
            // 动态路由的 child.path 可能为绝对路径（如 '/A'），避免拼出 '//A'
            path: child.path.startsWith('/') ? child.path : `/${child.path}`
        }));
});

const activePath = computed(() => route.path);

function onSelect(path: string): void {
    router.push(path);
}
</script>

<style scoped lang="scss">
.base-menu {
    flex-shrink: 0;
    --el-menu-bg-color: transparent;
    --el-menu-text-color: rgba(255, 255, 255, 0.72);
    --el-menu-active-color: var(--color-main);
    --el-menu-hover-bg-color: transparent;
    border-bottom: none;

    :deep(.el-menu-item) {
        font-size: var(--font-panel);
        letter-spacing: 1px;
        border-bottom: 2px solid transparent;

        &.is-active {
            color: #ff783a !important;
            border-bottom-color: #ff783a;
            text-shadow: 0 0 10px rgba(255, 120, 58, 0.6);
        }

        &:hover {
            background: rgba(58, 160, 255, 0.08);
        }
    }
}
</style>
