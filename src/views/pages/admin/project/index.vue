<template>
    <div class="project-list">
        <el-card
            v-for="project in projects"
            :key="project.id"
            class="project-card"
            shadow="hover"
            @click="enterScreen(project)"
        >
            <div class="project-name">{{ project.name }}</div>
            <div class="project-desc">{{ project.desc }}</div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/useMenuStore';
import { projects } from './config';

const store = useMenuStore();

/** 选择项目：切换为大屏菜单并进入大屏 */
function enterScreen(project: { id: string; name: string }): void {
    store.enterScreen(project);
}
</script>

<style scoped lang="scss">
.project-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;

    .project-card {
        cursor: pointer;

        .project-name {
            font-size: var(--font-panel);
            font-weight: var(--font-weight-panel);
            color: var(--color-main);
        }

        .project-desc {
            margin-top: var(--space-2);
            font-size: var(--font-desc);
            color: var(--color-desc);
        }
    }
}
</style>
