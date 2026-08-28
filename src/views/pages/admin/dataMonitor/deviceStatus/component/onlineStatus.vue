<template>
    <el-container class="onlineStatus">
        <el-header>
            <div class="search-list">
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
            /* 本页表单控件背景统一用 --bg-form-item-blue */
            :deep(.el-input__wrapper),
            :deep(.el-select__wrapper) {
                background-color: var(--bg-form-item-blue);
                box-shadow: 0 0 0 1px var(--border-light) inset;
                border-radius: 0;
            }
            .el-button {
                border-radius: unset;
            }
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
        /* 本页表格边框：覆盖全局 --el-table-border-color: transparent */
        :deep(.el-table) {
            height: 100%;
            --el-table-border-color: var(--border-light);
        }
        /* 去掉表格自身外框线（上下左右 + left-patch），仅保留 cell 边框 */
        :deep(.el-table--border)::before,
        :deep(.el-table--border)::after,
        :deep(.el-table--border .el-table__inner-wrapper)::before,
        :deep(.el-table--border .el-table__inner-wrapper)::after,
        :deep(.el-table__border-left-patch) {
            display: none;
        }
        /* 第一列 cell 补左边框，网格完整闭合 */
        :deep(.el-table--border .el-table__cell:first-child) {
            border-left: var(--el-table-border);
        }
    }
    .el-footer {
        flex: 100px 0 0;
        border: 1px solid var(--border-light);
        background: var(--bg-panel-content);
        color: #fff;
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
                color: var(--color-desc2);
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
