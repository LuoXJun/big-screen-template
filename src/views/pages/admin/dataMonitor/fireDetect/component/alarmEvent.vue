<template>
    <div class="alarmEvent">
        <baseTitle2Panel title="活跃告警事件">
            <template #right>
                <el-button type="danger" size="small">3条</el-button>
            </template>
            <el-row v-for="it in 5" :key="it" class="alarmEvent-item">
                <el-col :span="12" class="title">一级火情告警</el-col>
                <el-col :span="12" class="time">14:24:26</el-col>
                <el-col :span="24" class="desc">xxxxxxxxxxxxxx</el-col>
                <el-col :span="24">
                    <el-button type="danger" size="small">立即处置</el-button>
                    <el-button type="info" size="small">查看详情</el-button>
                </el-col>
            </el-row>
        </baseTitle2Panel>
    </div>
</template>

<script setup lang="ts">
import baseTitle2Panel from '@/components/admin/baseTitle2Panel.vue';
</script>

<style scoped lang="scss">
.alarmEvent {
    height: 100%;
    .alarmEvent-item {
        border-bottom: 1px solid var(--border-control);
        margin-top: 12px;
        padding: 0 var(--space-2);
        .title {
            font-size: var(--font-title);
            color: var(--color-danger);
        }
        .time {
            text-align: right;
        }
        .desc,
        .time {
            font-size: var(--font-desc);
            color: #929292;
        }
        .el-col {
            margin-bottom: 8px;
        }
    }
}
</style>
