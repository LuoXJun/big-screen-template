<template>
    <div class="map-list-component">
        <baseTitle2Panel title="联动设备状态">
            <template #right>
                <el-button type="danger" size="small">火情告警</el-button>
                <el-button type="danger" size="small">全部区域</el-button>
            </template>
            <div class="map-list">
                <el-row justify="space-between">
                    <el-col v-for="it in 20" :key="it" class="map-list-item">
                        <el-row>
                            <el-col :span="12">光伏区A</el-col>
                            <el-col :span="12" style="text-align: right">
                                <el-button type="danger" size="small">一级告警</el-button>
                            </el-col>
                        </el-row>
                        <span>XXXXXXXXXXXXXXXXXXXXXX</span>
                        <span>xxxxxxxxxxxxxxxxxxx</span>
                    </el-col>
                </el-row>
            </div>
        </baseTitle2Panel>
    </div>
</template>

<script setup lang="ts">
import baseTitle2Panel from '@/components/admin/baseTitle2Panel.vue';
</script>

<style scoped lang="scss">
.map-list-component {
    height: 100%;
    .map-list {
        overflow: auto;
        .map-list-item {
            flex: 49% 0 0;
            display: flex;
            flex-direction: column;
            padding: 12px;
            margin-bottom: 12px;
            background: rgba(139, 45, 45, 0.427);
            > .el-row {
                gap: 10;
            }

            > span:first-of-type {
                font-size: var(--font-body);
                color: var(--color-danger);
                margin: 12px 0;
            }
            > span:last-of-type {
                font-size: var(--font-desc);
            }
        }
    }
}
</style>
