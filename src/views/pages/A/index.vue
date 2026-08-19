<template>
    <ScreenLayout>
        <template #left>
            <div class="side-column">
                <ScreenPanel class="side-panel-item" title="A-左侧面板" />
            </div>
        </template>

        <template #right>
            <div class="side-column">
                <ScreenPanel class="side-panel-item" title="A-右侧面板" />
            </div>
        </template>

        <template #footer>
            <ScreenFooter text="页面A底部" status="状态" />
        </template>
    </ScreenLayout>
</template>

<script setup lang="ts">
import ScreenFooter from '@/components/screen/ScreenFooter.vue';
import ScreenLayout from '@/components/screen/ScreenLayout.vue';
import ScreenPanel from '@/components/screen/ScreenPanel.vue';
</script>

<style scoped lang="scss">
.side-column {
    width: base(340px);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-screen);
    min-height: 0;
    pointer-events: auto;
}

.side-panel-item {
    flex: 1;
    min-height: 0;
}
</style>
