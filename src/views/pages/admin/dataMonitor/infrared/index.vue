<template>
    <div class="infrared">
        <infraredHeader />
        <infraredCard style="margin-top: 12px" />
        <el-container>
            <el-aside>
                <baseTitle2Panel title="分布式光纤测温系统">
                    <template #right>
                        <el-button type="success">24H实时监测</el-button>
                    </template>
                    <div class="box">
                        <div class="chart-box">
                            <el-row>
                                <el-col :span="24">
                                    <el-button>光伏阵列电缆</el-button>
                                    <el-button>光伏阵列电缆1</el-button>
                                    <el-button>光伏阵列电缆2</el-button>
                                    <el-button>光伏阵列电缆3</el-button>
                                </el-col>
                            </el-row>
                            <BaseChart :option="chartOption" />
                        </div>
                        <div class="table-part">
                            <baseTable v-model="tableData" :table-column="tableColumnConfig" />
                        </div>
                    </div>
                </baseTitle2Panel>
            </el-aside>
            <el-main>
                <baseTitle2Panel title="分布式光纤测温系统">
                    <template #right>
                        <el-button type="warning">热力图分析</el-button>
                    </template>
                    <baseTab v-model="activeLabel" style="margin-top: 12px" @on-click="onclick" />
                </baseTitle2Panel>
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import BaseChart from '@/components/charts/BaseChart.vue';
import infraredHeader from './component/infraredHeader.vue';
import infraredCard from './component/infraredCard.vue';
import { chartOption, tableColumnConfig } from './config.ts';
import baseTable from '@/components/baseTable/baseTable.vue';
import baseTab from '@/components/baseTab/baseTab.vue';
import baseTitle2Panel from '@/components/admin/baseTitle2Panel.vue';

const tableData = ref([
    { status: '告警' },
    { status: '预警' },
    { status: '正常' },
    { status: '正常' }
]);

const activeLabel = ref('热成像摄像头');

const onclick = (label: string) => {
    console.log(label);
};
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
