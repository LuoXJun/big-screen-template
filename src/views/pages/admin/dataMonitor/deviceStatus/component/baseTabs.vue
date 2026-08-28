<template>
    <el-tabs v-model="activeName" class="elTabs" @tab-click="onClick">
        <el-tab-pane v-for="it in labels" :key="it.label" :label="it.label" :name="it.label">
            <slot :name="it.label"></slot>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus';

const activeName = defineModel<string>({ default: () => '' });

interface LabelType {
    label: string;
    icon: string;
}

defineProps<{
    labels: LabelType[];
}>();

const emits = defineEmits<{
    onClick: [label: TabsPaneContext['paneName']];
}>();

const onClick = (pane: TabsPaneContext) => {
    emits('onClick', pane.paneName);
};
</script>

<style scoped lang="scss">
.elTabs {
    height: 100%;
    .el-tabs__content {
        height: 100%;
        .el-tab-pane {
            height: 100%;
        }
    }
}
</style>
