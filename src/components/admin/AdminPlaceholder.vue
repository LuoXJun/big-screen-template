<template>
    <el-card class="admin-placeholder" shadow="never">
        <h2 class="ap-title">{{ title }}</h2>
        <p class="ap-desc">功能开发中，敬请期待</p>
    </el-card>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<style scoped lang="scss">
.admin-placeholder {
    .ap-title {
        margin: 0;
        font-size: var(--font-title);
        font-weight: var(--font-weight-title);
        color: var(--color-main);
    }

    .ap-desc {
        margin: var(--space-3) 0 0;
        font-size: var(--font-desc);
        color: var(--color-desc);
    }
}
</style>
