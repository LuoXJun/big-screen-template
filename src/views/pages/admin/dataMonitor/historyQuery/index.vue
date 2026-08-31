<template>
    <el-container class="historyQuery">
        <el-header>
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
                    <el-button type="primary" plain>数据导出</el-button>
                </template>
            </baseForm>
        </el-header>
        <el-main>
            <div class="tableHeader">
                <span>已选</span>
                <span>12</span>
                <span>条</span>
                <span>|</span>
                <el-button size="small" type="primary">批量确认</el-button>
                <el-button size="small" type="primary">批量关闭</el-button>
                <el-button size="small" type="primary">批量派单</el-button>
            </div>
            <baseTable v-model="tableData" :table-column="tableColumnConfig" selection />
            <basePagination v-model="pageInfo" />
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import baseForm from '@/components/base-form/baseForm.vue';
import baseTable from '@/components/baseTable/baseTable.vue';
import basePagination from '@/components/base-pagination/base-pagination.vue';
import { formConfig, tableColumnConfig, type SearchParams } from './config';
import { usePageTable } from '@/composables/usePageTable';

const form = ref<SearchParams>({
    id: '',
    area: '',
    type: '',
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
