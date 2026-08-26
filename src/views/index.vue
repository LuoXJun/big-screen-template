<template>
    <el-container class="admin-shell">
        <el-aside v-if="sideMenu.routes.length" width="220px" class="admin-aside">
            <div class="aside-brand">项目管理系统</div>
            <el-menu class="aside-menu" :default-active="activePath" router>
                <baseMenuHorizontalAside :list="sideMenu.routes" :parent-path="sideMenu.parentPath" />
            </el-menu>
        </el-aside>
        <el-container class="admin-body">
            <el-header height="56px" class="admin-header">
                <baseMenuHorizontalHeader />
            </el-header>
            <el-main class="admin-main">
                <RouterView />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import baseMenuHorizontalAside from '@/components/baseMenuHorizontal/baseMenuHorizontalAside.vue';
import baseMenuHorizontalHeader from '@/components/baseMenuHorizontal/baseMenuHorizontalHeader.vue';
import { useMenuStore } from '@/stores/useMenuStore';

const store = useMenuStore();
const route = useRoute();

const activePath = computed(() => route.path);

/**
 * 侧边菜单跟随顶栏选中项：取其一二级子菜单渲染（转换后带 meta 字段）；
 * 选中项为叶子（无子菜单）时返回空数组，布局隐藏侧边栏。
 */
const sideMenu = computed(() => {
    const cur = store.currentMenu.path;
    const top = store.menu.find(
        (m) => cur === m.path || cur.startsWith(m.path + '/')
    );
    if (!top?.children?.length) return { routes: [], parentPath: '' };
    return {
        routes: store.getRoutes(top.children),
        parentPath: top.path + '/'
    };
});
</script>

<style scoped lang="scss">
/* EP 浅色变量还原见 element-plus/_admin.scss（.admin-shell 作用域） */
.admin-shell {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(180deg, var(--bg-sidebar) 0%, var(--bg-page) 100%);
}

.admin-aside {
    background: var(--bg-sidebar);
    border-right: 1px solid var(--border-on-dark);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    .aside-brand {
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: var(--font-weight-title);
        font-size: var(--font-panel);
        letter-spacing: var(--letter-spacing-title);
        color: var(--color-title);
        border-bottom: 1px solid var(--border-on-dark);
        flex-shrink: 0;
    }

    .aside-menu {
        flex: 1;
        overflow-y: auto;
        border-right: none;
        background: transparent;
        --el-menu-item-height: 46px;
        --el-menu-bg-color: transparent;
        --el-menu-text-color: var(--color-on-dark-sub);
        --el-menu-active-color: var(--color-brand);
        --el-menu-hover-bg-color: var(--hover-bg);

        :deep(.el-menu-item.is-active) {
            background: var(--active-bg);
        }
    }
}

.admin-body {
    display: flex;
    flex-direction: column;
}

.admin-header {
    background: var(--bg-header);
    border-bottom: 1px solid var(--border-on-dark);
    padding: 0;
}

.admin-main {
    flex: 1;
    overflow: auto;
    padding: var(--space-4);
    // background: var(--bg-content);
    background: var(--bg-sidebar);
}
</style>
