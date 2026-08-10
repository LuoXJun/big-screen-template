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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 base(24px);
    background: linear-gradient(180deg, rgba(0, 84, 168, 0.35), rgba(0, 84, 168, 0.05));
    border-bottom: 1px solid rgba(0, 168, 255, 0.35);

    .header-title {
        font-family: 'YouSheBiaoTiHei', 'PingFang SC', sans-serif;
        font-size: var(--font-hero);
        letter-spacing: 6px;
        color: $text-primary;
        text-shadow: 0 0 18px rgba(0, 212, 255, 0.65);
        margin: 0;
    }

    .header-wing {
        display: flex;
        align-items: center;
        gap: 12px;
        color: $text-secondary;
        font-size: var(--font-sub);

        .wing-line {
            width: 140px;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.8));
        }

        &--right .wing-line {
            background: linear-gradient(90deg, rgba(0, 212, 255, 0.8), transparent);
        }
    }
}
</style>
