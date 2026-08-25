<template>
    <footer class="screen-footer">
        <span class="footer-text">{{ text }}</span>
        <span class="footer-status">{{ status }}</span>
    </footer>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ text?: string; status?: string }>(), {
    text: '',
    status: ''
});
</script>

<style scoped lang="scss">
.screen-footer {
    height: var(--footer-height);
    flex-shrink: 0;
    pointer-events: auto; /* 穿透的 UI 层中恢复事件：文字可选中 */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    font-size: var(--font-body);
    color: var(--color-sub);
    background: linear-gradient(0deg, rgba(0, 84, 168, 0.35), rgba(0, 84, 168, 0.05));
    border-top: 1px solid rgba(0, 168, 255, 0.35);

    .footer-text {
        letter-spacing: 1px;
    }

    .footer-status {
        color: var(--color-brand);
    }
}
</style>
