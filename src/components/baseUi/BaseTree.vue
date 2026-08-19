<template>
    <el-tree
        ref="treeRef"
        :data="data"
        :node-key="nodeKey"
        :props="treeProps"
        :default-expand-all="defaultExpandAll"
        :show-checkbox="showCheckbox"
        :default-checked-keys="defaultCheckedKeys"
        @check="(d, info) => emit('check', d, info)"
    >
        <template #default="{ node, data: nodeData }">
            <slot :node="node" :data="nodeData">{{ node.label }}</slot>
        </template>
    </el-tree>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

/** 通用树节点最小结构（兼容 el-tree 与业务自定义字段） */
export interface BaseTreeNode {
    id?: string | number;
    label?: string;
    children?: BaseTreeNode[];
}

/** el-tree check 事件信息（转发明细，供上层按需取用） */
export interface TreeCheckInfo {
    checkedKeys: (string | number)[];
    checkedNodes: BaseTreeNode[];
    halfCheckedKeys: (string | number)[];
    halfCheckedNodes: BaseTreeNode[];
}

const props = withDefaults(
    defineProps<{
        /** 树数据 */
        data: BaseTreeNode[];
        /** 节点唯一键字段（默认 id） */
        nodeKey?: string;
        /** 显示名称字段（默认 label） */
        labelField?: string;
        /** 子节点字段（默认 children） */
        childrenField?: string;
        /** 是否默认全部展开（默认 true） */
        defaultExpandAll?: boolean;
        /** 显示勾选框（父子联动、半选为 el-tree 内置行为） */
        showCheckbox?: boolean;
        /** 初始勾选节点 key 列表（仅首次渲染生效） */
        defaultCheckedKeys?: (string | number)[];
    }>(),
    {
        nodeKey: 'id',
        labelField: 'label',
        childrenField: 'children',
        defaultExpandAll: true,
        showCheckbox: false,
        defaultCheckedKeys: () => []
    }
);

const emit = defineEmits<{
    check: [data: unknown, info: TreeCheckInfo];
}>();

const treeRef = ref();

const treeProps = computed(() => ({
    label: props.labelField,
    children: props.childrenField
}));

/** 程序化设置勾选（状态恢复、HMR 重建树后重置用） */
function setCheckedKeys(keys: (string | number)[]): void {
    treeRef.value?.setCheckedKeys(keys);
}

defineExpose({ setCheckedKeys });
</script>

<style scoped lang="scss">
.base-tree {
    background: transparent;
    --el-tree-node-hover-bg-color: rgba(58, 160, 255, 0.1);
    --el-tree-node-expanded-bg-color: transparent;

    :deep(.el-tree-node__content) {
        height: auto;
        min-height: base(28px);
        padding: base(2px) 0;
        border-radius: 4px;
    }

    :deep(.el-tree-node__children) {
        padding-left: base(10px);
        border-left: 1px solid rgba(58, 160, 255, 0.2);
        margin-left: base(4px);
    }
}
</style>
