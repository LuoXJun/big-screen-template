<template>
    <div class="map-list-component">
        <baseTitle title="防火区域监测地图">
            <el-button type="danger" size="small">火情告警</el-button>
            <el-button type="danger" size="small">全部区域</el-button>
        </baseTitle>
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
    </div>
</template>

<script setup lang="ts">
import baseTitle from '@/components/admin/baseTitle.vue';
</script>

<style scoped lang="scss">
.map-list-component {
    height: 100%;
    .map-list {
        height: calc(100% - 48px);
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
