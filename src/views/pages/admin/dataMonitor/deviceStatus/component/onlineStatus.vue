<template>
    <el-container class="onlineStatus">
        <el-header>
            <div class="search-list lxj-form-deep">
                <div>
                    <el-input placeholder="搜索设备编号/名称"></el-input>
                    <el-select placeholder="按区域筛选"></el-select>
                    <el-select placeholder="按设备类型筛选"></el-select>
                    <el-date-picker type="date" placeholder="按安装时间筛选" />
                </div>
                <el-button type="danger" plain>查看明细</el-button>
            </div>
            <deviceStatusHeader style="margin: 20px 0" />
        </el-header>
        <el-main>
            <baseTable
                v-model="tableData"
                :table-column="tableColumnConfig"
                :options="{
                    border: true
                }"
                variant="lxj-table--grid"
            />
            <basePagination v-model="pageInfo" />
        </el-main>
        <el-footer>
            <p>分类在线率概览</p>
            <el-row :gutter="100">
                <el-col v-for="it in 4" :key="it" :span="6" class="listItem">
                    <el-row>
                        <el-col :span="12">传感器</el-col>
                        <el-col :span="12">80%</el-col>
                    </el-row>
                    <el-row class="progress">
                        <el-col :style="{ flex: '80% 0 0' }"></el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">
import { tableColumnConfig } from './config.ts';
import deviceStatusHeader from './deviceStatusHeader.vue';
import baseTable from '@/components/baseTable/baseTable.vue';
import basePagination from '@/components/base-pagination/base-pagination.vue';
import { usePageTable } from '@/composables/usePageTable.ts';

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
            { status: 'XXXX' }
        ],
        total: 100
    };
});
</script>

<style scoped lang="scss">
.onlineStatus {
    height: 100%;

    .el-header {
        height: unset;
        .search-list {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
            /* 深蓝控件变体（背景/描边/直角）由全局 .lxj-form-deep 承担 */
            > div:first-of-type {
                gap: 10px;
                flex: 60% 0 0;
                display: flex;
                align-items: center;
            }
        }
    }
    .el-main {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        /* 表格容器撑满剩余空间，表格高度 100% 自适应 */
        :deep(.base-table) {
            flex: 1;
            min-height: 0;
        }
        /* 表格皮肤（边框/表头/补左线）由 variant="lxj-table--grid" 承担 */
        :deep(.el-table) {
            height: 100%;
        }
    }
    .el-footer {
        flex: 100px 0 0;
        border: 1px solid var(--border-light);
        background: var(--panel-body-bg);
        color: var(--color-panel-title);
        display: flex;
        flex-direction: column;
        justify-content: center;
        > p {
            margin-bottom: 12px;
        }
        .listItem {
            .progress {
                height: 3px;
                border-radius: var(--space-2);
                background: red;
                margin-top: 8px;
                .el-col {
                    background: var(--color-success);
                }
            }
            .el-row:first-of-type {
                color: var(--color-desc-on-dark);
                .el-col {
                    font-size: var(--font-desc);
                }
                .el-col:last-child {
                    color: var(--color-success);
                    text-align: right;
                }
            }
        }
    }
}
</style>
