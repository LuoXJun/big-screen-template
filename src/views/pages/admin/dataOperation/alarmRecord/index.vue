<template>
    <el-container class="alarmRecord">
        <el-header>
            <el-row class="desc">
                <el-col :span="12">
                    <p>告警记录台账</p>
                    <p>全站安防 · 防火告警信息统一归集 · 标准化记录台账</p>
                </el-col>
                <el-col :span="12" style="text-align: right">
                    <el-button type="primary" plain>批量导出</el-button>
                </el-col>
            </el-row>
            <alarmRecordCard />
            <div class="form">
                <baseForm
                    v-model="form"
                    :form-item-list="formConfig"
                    label-width="0"
                    :layout="{
                        xl: 3,
                        lg: 3,
                        md: 3,
                        sm: 3,
                        xs: 3
                    }"
                >
                    <template #footer>
                        <el-button type="primary" plain>查询</el-button>
                        <el-button type="primary" plain>重置</el-button>
                    </template>
                </baseForm>
            </div>
        </el-header>
        <el-main>
            <baseTable v-model="tableData" :table-column="tableColumnConfig" selection />
            <basePagination v-model="pageInfo" />
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import baseForm from '@/components/base-form/baseForm.vue';
import baseTable from '@/components/baseTable/baseTable.vue';
import basePagination from '@/components/base-pagination/base-pagination.vue';
import alarmRecordCard from './components/alarmRecordCard.vue';
import { formConfig, tableColumnConfig, type SearchParams } from './config';
import { usePageTable } from '@/composables/usePageTable';

const form = ref<SearchParams>({
    id: '',
    area: '',
    warnLv: '',
    warnType: '',
    status: '',
    time: ''
});

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
