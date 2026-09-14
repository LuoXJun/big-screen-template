<template>
    <header class="screen-header">
        <div class="header-wing">
            <span class="wing-line" />
            <span class="wing-text">{{ subtitle }}</span>
        </div>
        <h1 class="header-title">{{ title }}</h1>
        <div class="header-wing header-wing--right">
            <span class="wing-date">{{ dateText }}</span>
            <span class="wing-line" />
        </div>
    </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

withDefaults(defineProps<{ title: string; subtitle?: string }>(), {
    subtitle: ''
});

const dateText = ref('');
const timeText = ref('');

let timer: number | undefined;

function updateClock() {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    dateText.value = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    timeText.value = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

onMounted(() => {
    updateClock();
    timer = window.setInterval(updateClock, 1000);
});

onBeforeUnmount(() => window.clearInterval(timer));
</script>

<style scoped lang="scss">
.screen-header {
    height: base(80px);
    flex-shrink: 0;
    pointer-events: auto; /* 穿透的 UI 层中恢复事件：标题可选中 */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 base(24px);
    background: var(--lxj-bg-header);
    border-bottom: 1px solid var(--lxj-color-border);

    .header-title {
        font-family: var(--lxj-font-family-title);
        font-size: var(--lxj-font-hero);
        letter-spacing: var(--lxj-letter-spacing-hero);
        color: var(--lxj-color-text-primary);
        text-shadow: 0 0 base(18px) color-mix(in srgb, var(--lxj-color-primary) 65%, transparent);
        margin: 0;
    }

    .header-wing {
        display: flex;
        align-items: center;
        gap: base(12px);
        color: var(--lxj-color-text-secondary);
        font-size: var(--lxj-font-desc);

        .wing-line {
            width: base(140px);
            height: 1px;
            background: linear-gradient(
                90deg,
                transparent,
                color-mix(in srgb, var(--lxj-color-primary) 80%, transparent)
            );
        }

        &--right .wing-line {
            background: linear-gradient(
                90deg,
                color-mix(in srgb, var(--lxj-color-primary) 80%, transparent),
                transparent
            );
        }
    }
}
</style>
