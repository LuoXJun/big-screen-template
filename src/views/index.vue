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
/* 管理端作用域内还原 EP 浅色变量（全局样式为大屏深色主题覆盖过） */
.admin-shell {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(180deg, $admin-bg 0%, $admin-bg-deep 100%);

    --el-color-primary: #{$primary};
    --el-bg-color: #ffffff;
    --el-bg-color-overlay: #ffffff;
    --el-fill-color-blank: #ffffff;
    --el-text-color-primary: #303133;
    --el-text-color-regular: #606266;
    --el-text-color-secondary: #909399;
    --el-border-color: #dcdfe6;
    --el-border-color-light: #e4e7ed;
    --el-border-color-lighter: #ebeef5;
}

.admin-aside {
    background: rgba(8, 25, 64, 0.94);
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    .aside-brand {
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 16px;
        letter-spacing: 2px;
        color: $admin-title;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        flex-shrink: 0;
    }

    .aside-menu {
        flex: 1;
        overflow-y: auto;
        border-right: none;
        background: transparent;
        --el-menu-item-height: 46px;
        --el-menu-bg-color: transparent;
        --el-menu-text-color: rgba(255, 255, 255, 0.72);
        --el-menu-active-color: #{$primary};
        --el-menu-hover-bg-color: rgba(255, 255, 255, 0.06);

        :deep(.el-menu-item.is-active) {
            background: rgba(255, 120, 58, 0.14);
        }
    }
}

.admin-body {
    display: flex;
    flex-direction: column;
}

.admin-header {
    background: rgba(8, 25, 64, 0.96);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 0;
}

.admin-main {
    flex: 1;
    overflow: auto;
    padding: 16px;
    background: rgba(7, 20, 49, 0.6);
}
</style>
