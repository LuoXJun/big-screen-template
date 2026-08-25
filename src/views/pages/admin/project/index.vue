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
            font-size: 16px;
            font-weight: 600;
            color: #303133;
        }

        .project-desc {
            margin-top: 8px;
            font-size: 13px;
            color: #909399;
        }
    }
}
</style>
