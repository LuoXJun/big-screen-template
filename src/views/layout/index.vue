<template>
    <div class="layout-shell">
        <!-- 全局顶部导航：左侧标题 + 右侧菜单 -->
        <header class="layout-navbar">
            <h1 class="navbar-title">{{ menuStore.currentProject?.name ?? '大屏标题' }}</h1>
            <div class="navbar-right">
                <BaseMenu />
                <button class="back-admin-btn" @click="backToAdmin">返回管理端</button>
            </div>
        </header>

        <!-- 全局地图层：路由切换不销毁，图层与视角状态跨页面保留 -->
        <div class="layout-map">
            <BaseCesium />
        </div>

        <!-- 全局图层控制：任何页面都显示 -->
        <ScreenPanel class="layer-panel" title="图层控制">
            <LayerControlPanel :config="layerControlConfig" @ready="onLayersReady" />
        </ScreenPanel>

        <!-- 页面出口：子页面自行组织 ScreenLayout 布局，叠加在全局地图之上 -->
        <RouterView />

        <!-- 全局底部栏：贴底浮层，页面内容区通过 padding-bottom 留白避开 -->
        <ScreenFooter class="layout-footer" text="大屏可视化平台" status="运行正常" />
    </div>
</template>

<script setup lang="ts">
import { h, onMounted, onUnmounted } from 'vue';
import * as Cesium from 'cesium';
import BaseCesium from '@/components/baseCesium/BaseCesium.vue';
import BaseMenu from '@/components/baseUi/BaseMenu.vue';
import ScreenPanel from '@/components/screen/ScreenPanel.vue';
import ScreenFooter from '@/components/screen/ScreenFooter.vue';
import LayerControlPanel from '@/components/layerControl/LayerControlPanel.vue';
import { showMapPopup } from '@/components/basePanel/mapPopup';
import { createHandler, flyToLonLat, getViewer, toLonLat } from '@/cesium';
import { layerControlConfig, initialView } from './config/layerControl';
import PopupInfo from '@/components/basePanel/PopupInfo.vue';
import { useMenuStore } from '@/stores/useMenuStore';

const menuStore = useMenuStore();

/** 返回管理端：切换菜单模式并跳转 */
function backToAdmin(): void {
    menuStore.enterAdmin();
}

/** 图层就绪后的全局行为：视角定位到设备区域 */
function onLayersReady(): void {
    flyToLonLat(initialView.lng, initialView.lat, initialView.height);
}

/* 主题作用域同步到 html[data-app]：语义令牌层按端解析，
   teleport 到 body 的 EP 浮层同样命中，与管理端 admin 作用域互不干扰 */
onMounted(() => {
    document.documentElement.dataset.app = 'screen';
});
onUnmounted(() => {
    delete document.documentElement.dataset.app;
});

// 点击实体 → 弹窗显示名称与类型（viewer 就绪后注册；handler 由 BaseCesium 卸载时统一清理）
onMounted(() => {
    const pickHandler = createHandler();
    pickHandler.setInputAction((movement: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
        const picked = getViewer().scene.pick(movement.position);
        if (!Cesium.defined(picked)) return;
        const entity = picked.id instanceof Cesium.Entity ? picked.id : undefined;
        if (!entity) return;
        const position = entity.position?.getValue(getViewer().clock.currentTime);
        if (!position) return;
        showMapPopup({
            position,
            title: '实体信息',
            width: '20vw',
            height: '15vw',
            content: h(PopupInfo, { lonlat: toLonLat(position) })
        });
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
});
</script>

<style scoped lang="scss">
.layout-shell {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background:
        radial-gradient(
            ellipse at 50% 0%,
            color-mix(in srgb, var(--lxj-color-primary) 16%, transparent),
            transparent 55%
        ),
        var(--lxj-bg-page);
}

.layout-navbar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: var(--lxj-header-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 base(32px);
    background: var(--lxj-bg-header);
    border-bottom: 1px solid var(--lxj-color-border);
    z-index: 20;

    .navbar-title {
        font-family: var(--lxj-font-family-title);
        font-size: var(--lxj-font-hero);
        letter-spacing: var(--lxj-letter-spacing-hero);
        color: var(--lxj-color-text-primary);
        text-shadow: 0 0 base(18px) color-mix(in srgb, var(--lxj-color-primary) 65%, transparent);
        margin: 0;
    }

    .navbar-right {
        display: flex;
        align-items: center;
        gap: base(24px);
    }

    .back-admin-btn {
        height: base(32px);
        padding: 0 base(16px);
        box-sizing: border-box;
        font-size: var(--lxj-font-panel);
        letter-spacing: 1px;
        color: var(--lxj-color-primary);
        background: color-mix(in srgb, var(--lxj-color-primary) 12%, transparent);
        border: 1px solid color-mix(in srgb, var(--lxj-color-primary) 45%, transparent);
        border-radius: base(4px);
        cursor: pointer;
        transition: background 0.2s;

        &:hover {
            background: color-mix(in srgb, var(--lxj-color-primary) 24%, transparent);
        }
    }
}

.layout-map {
    position: absolute;
    inset: 0;
}

/* 全局底部栏：贴底浮层，页面内容区通过 padding-bottom 留白避开 */
.layout-footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 15;
}

/* 全局图层控制：右侧固定浮层，以顶部导航高度为偏移基准，不随页面布局变化 */
.layer-panel {
    position: absolute;
    top: calc(var(--lxj-header-height) + var(--lxj-space-screen));
    left: calc(base(350px) + var(--lxj-space-screen));
    width: base(300px);
    z-index: 10;

    :deep(.panel-body) {
        max-height: base(400px);
    }
}
</style>
