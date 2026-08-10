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
    padding: var(--space-panel);
    background: $panel-bg;
    border: 1px solid $panel-border;
    border-radius: 6px;
    box-shadow: inset 0 0 24px rgba(0, 120, 255, 0.12);
    backdrop-filter: blur(3px);

    .panel-header {
        display: flex;
        align-items: center;
        gap: calc(var(--screen-base) * 0.00417); /* 基准 8px，等比 */
        margin-bottom: calc(var(--screen-base) * 0.00417); /* 基准 8px，等比 */

        .panel-dot {
            width: 6px;
            height: 14px;
            border-radius: 2px;
            background: linear-gradient(180deg, $accent, transparent);
        }

        .panel-title {
            font-size: var(--font-panel);
            font-weight: 500;
            color: $panel-title;
            letter-spacing: 1px;
        }
    }

    .panel-body {
        flex: 1;
        min-height: 0;
    }
}
</style>
