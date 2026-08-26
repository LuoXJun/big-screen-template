<template>
    <div class="infrared">
        <infraredHeader />
        <infraredCard style="margin-top: 12px" />
        <el-container>
            <el-aside>
                <baseTitle title="分布式光纤测温系统">
                    <el-button type="success">24H实时监测</el-button>
                </baseTitle>
                <div class="chart-box">
                    <el-row>
                        <el-col :span="24">
                            <el-button>光伏阵列电缆</el-button>
                            <el-button>光伏阵列电缆1</el-button>
                            <el-button>光伏阵列电缆2</el-button>
                            <el-button>光伏阵列电缆3</el-button>
                        </el-col>
                    </el-row>
                    <BaseChart :option="chartOption" class="chart" />
                </div>
                <div class="table-part">
                    <baseTable v-model="tableData" :table-column="tableColumnConfig" />
                </div>
            </el-aside>
            <el-main>
                <baseTitle title="红外测温系统">
                    <el-button type="warning">热力图分析</el-button>
                </baseTitle>
                <baseTab v-model="activeLabel" style="margin-top: 12px" @on-click="onclick" />
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import BaseChart from '@/components/charts/BaseChart.vue';
import infraredHeader from './component/infraredHeader.vue';
import infraredCard from './component/infraredCard.vue';
import baseTitle from '@/components/admin/baseTitle.vue';
import { chartOption, tableColumnConfig } from './config.ts';
import baseTable from '@/components/baseTable/baseTable.vue';
import baseTab from '@/components/baseTab/baseTab.vue';

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
