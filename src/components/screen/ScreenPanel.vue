<template>
    <section class="screen-panel">
        <div class="panel-header">
            <span class="panel-dot" />
            <span class="panel-title">{{ title }}</span>
        </div>
        <div class="panel-body">
            <slot />
        </div>
    </section>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<style scoped lang="scss">
.screen-panel {
    display: flex;
    flex-direction: column;
    min-height: 0;
    pointer-events: auto; /* 面板承载图表交互，需在穿透的 UI 层中恢复事件 */
    padding: var(--lxj-space-panel);
    background: var(--lxj-bg-panel);
    border: 1px solid var(--lxj-color-border);
    border-radius: var(--lxj-radius-base);
    box-shadow: inset 0 0 base(24px) color-mix(in srgb, var(--lxj-color-primary) 12%, transparent);
    backdrop-filter: blur(3px);

    .panel-header {
        display: flex;
        align-items: center;
        gap: base(8px);
        margin-bottom: base(8px);

        .panel-dot {
            width: 6px;
            height: 14px;
            border-radius: 2px;
            background: linear-gradient(180deg, var(--lxj-color-primary), transparent);
        }

        .panel-title {
            font-size: var(--lxj-font-section);
            font-weight: var(--font-weight-500);
            color: var(--lxj-color-text-primary);
            letter-spacing: 1px;
        }
    }

    .panel-body {
        flex: 1;
        min-height: 0;
        overflow-y: auto; /* 内容溢出时滚动（滚动条样式由全局统一） */
    }
}
</style>
