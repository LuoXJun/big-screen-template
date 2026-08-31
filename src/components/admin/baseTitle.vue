<template>
    <div class="base-title">
        <span>{{ title }}</span>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        title?: string;
    }>(),
    {
        title: '标题'
    }
);
</script>

<style scoped lang="scss">
.base-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--panel-title-bg);
    padding: var(--space-2);
    > span {
        color: #fff;
        font-size: var(--font-body);
        border-radius: var(--radius-2);
    }
}
</style>
