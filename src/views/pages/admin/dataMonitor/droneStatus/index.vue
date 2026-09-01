<template>
    <el-container class="droneStatus">
        <el-header>
            <droneStatusHeader />
        </el-header>
        <el-main>
            <div class="body-left">
                <div class="line">
                    <p>巡检航线轨迹图</p>
                </div>
                <div class="table-part">
                    <p>飞行任务明细</p>
                    <baseTable
                        v-model="tableData"
                        :table-column="tableColumnConfig"
                        selection
                        :options="{ border: false }"
                    />
                    <basePagination v-model="pageInfo" />
                </div>
            </div>
            <div class="body-right">
                <div class="top">
                    <div class="title">
                        <span>每日巡检架次趋势</span>
                        <span>架次/缺陷数</span>
                    </div>
                </div>
                <div class="middle">
                    <div class="title">
                        <span>缺陷类型分布</span>
                        <span>共 38 处</span>
                    </div>
                    <div class="list">
                        <el-row v-for="it in 4" :key="it" class="list-item">
                            <el-col :span="12">组件污染</el-col>
                            <el-col :span="12">
                                <span>15处</span>
                                <span>39 %</span>
                            </el-col>
                            <!-- 进度条 -->
                            <el-row class="process">
                                <el-col :span="24"></el-col>
                            </el-row>
                        </el-row>
                    </div>
                </div>
                <div class="bottom">
                    <div class="title">
                        <span>无人机设备状态</span>
                        <el-button type="success" size="small" plain>6架在线</el-button>
                    </div>
                    <div class="eq-list">
                        <div v-for="it in 6" :key="it" class="eq-list-item">
                            <div class="left">
                                <img src="@/assets/images/vue.svg" alt="" />
                                <div>
                                    <p>DJI M300 RTK #01</p>
                                    <span>C区西侧</span>
                                </div>
                            </div>
                            <div class="right">
                                <div class="process">
                                    <p>97%</p>
                                    <!-- 百分比 -->
                                    <span></span>
                                </div>
                                <span>飞行中</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { usePageTable } from '@/composables/usePageTable.ts';
import droneStatusHeader from './components/droneStatusHeader.vue';
import baseTable from '@/components/baseTable/baseTable.vue';
import basePagination from '@/components/base-pagination/base-pagination.vue';
import { tableColumnConfig } from './config.ts';

const { pageInfo, tableData } = usePageTable(async () => {
    return {
        records: [
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' },
            { status: 'XXXX' }
        ],
        total: 100
    };
});
</script>
<style lang="scss" scoped>
@use './index.scss';
</style>
