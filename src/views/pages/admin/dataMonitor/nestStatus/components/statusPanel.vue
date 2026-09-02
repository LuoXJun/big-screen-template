<template>
    <div class="statusPanel">
        <el-row justify="space-between">
            <el-col v-for="it in 10" :key="it" :span="12" class="eq-status-item">
                <el-row class="eq-status-self">
                    <el-col :span="24">
                        <img src="@/assets/vue.svg" alt="" />
                    </el-col>
                    <el-col class="title" :span="24">XXXXXXXX</el-col>
                    <el-col :span="24">xxxxxxx</el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.statusPanel {
    .eq-status-item {
        flex: 49% 0 0;
        background: var(--bg-content);
        margin-bottom: var(--space-2);
        border-radius: var(--radius-3);
        padding: var(--space-2);
        color: var(--color-panel-title);
        .eq-status-self {
            img {
                width: 16px;
            }
            .title{
                font-size: var(--font-title);
            }
            .el-col {
                margin-top: var(--space-2);
            }
            .el-col:last-of-type {
                font-size: var(--font-desc);
                color: var(--color-warning-bright);
                margin-bottom: var(--space-2);
            }
        }
    }
}
</style>
