<template>
    <BaseTree
        ref="baseTreeRef"
        :data="config.tree"
        class="layer-tree"
        show-checkbox
        :default-checked-keys="defaultCheckedIds"
        @check="onCheck"
    >
        <template #default="{ data }">
            <span class="node-label" :class="`row-${data.type ?? 'group'}`">{{ data.label }}</span>
        </template>
    </BaseTree>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { addLayer, getLayer, isItemLayer } from '@/cesium';
import BaseTree, { type TreeCheckInfo } from '@/components/baseUi/BaseTree.vue';
import type { LayerControlConfig, LayerTreeNode } from './types';

const props = withDefaults(defineProps<{ config?: LayerControlConfig }>(), {
    config: () => ({ layers: [], tree: [] })
});

const emit = defineEmits<{ ready: [] }>();

const baseTreeRef = ref<InstanceType<typeof BaseTree>>();

/** 初始勾选的节点 id（按配置 visible 字段，默认全部勾选） */
const defaultCheckedIds = computed(() => collectVisibleIds(props.config.tree));

/** 图层初始化放在挂载后：此时 Cesium Viewer 已就绪，顺序创建图层后发 ready 事件 */
onMounted(() => {
    props.config.layers.forEach(({ type, name, config }) => addLayer(type, name, config));
    // default-checked-keys 不触发 check 事件，需手动把初始显隐同步到图层
    syncInitialVisibility();
    emit('ready');
});

// HMR 重建树后 el-tree 勾选状态会重置且 onMounted 不重跑，按配置恢复勾选与图层显隐
watch(
    () => props.config.tree,
    () => {
        nextTick(() => {
            baseTreeRef.value?.setCheckedKeys(defaultCheckedIds.value);
            syncInitialVisibility();
        });
    }
);

/**
 * 收集初始勾选的叶子节点 id。
 * 只收集叶子：父级勾选会级联全选子级，中间节点状态交由 el-tree 从叶子聚合；
 * 祖先任一 visible: false 则整枝跳过。
 */
function collectVisibleIds(nodes: LayerTreeNode[], ancestorVisible = true): string[] {
    return nodes.flatMap((node) => {
        const visible = ancestorVisible && node.visible !== false;
        return [
            ...(!node.children?.length && visible ? [node.id] : []),
            ...(node.children ? collectVisibleIds(node.children, visible) : [])
        ];
    });
}

/**
 * 按配置的初始显隐同步图层状态。
 * 祖先任一 visible: false 则整枝隐藏，避免子级节点把父级隐藏的图层重新打开。
 */
function syncInitialVisibility(): void {
    const walk = (nodes: LayerTreeNode[], ancestorVisible = true): void => {
        for (const node of nodes) {
            const visible = ancestorVisible && node.visible !== false;
            if (node.layerName) applyLayerVisible(node, visible);
            if (node.children?.length) walk(node.children, visible);
        }
    };
    walk(props.config.tree);
}

/**
 * el-tree 勾选状态是唯一事实来源：勾选/半选 → 同步图层显隐（单向）。
 * 半选节点（部分子级可见）视为图层可见。
 */
function onCheck(_data: unknown, info: TreeCheckInfo): void {
    const visibleIds = new Set([
        ...info.checkedNodes.map((node) => String(node.id)),
        ...info.halfCheckedNodes.map((node) => String(node.id))
    ]);
    syncLayers(visibleIds);
}

function syncLayers(visibleIds: Set<string>): void {
    const walk = (nodes: LayerTreeNode[]): void => {
        for (const node of nodes) {
            if (node.layerName) applyLayerVisible(node, visibleIds.has(node.id));
            if (node.children?.length) walk(node.children);
        }
    };
    walk(props.config.tree);
}

function applyLayerVisible(node: LayerTreeNode, visible: boolean): void {
    const layer = getLayer(node.layerName!);
    if (!layer) return;
    if (node.itemId && isItemLayer(layer)) {
        // 勾选条目时联动打开图层，否则图层隐藏时勾选无实际效果
        if (visible) layer.setVisible(true);
        layer.setItemVisible(node.itemId, visible);
    } else {
        layer.setVisible(visible);
    }
}
</script>

<style scoped lang="scss">
.node-label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.row-group {
    font-weight: 600;
    letter-spacing: 1px;
    color: var(--color-title);
}

.row-layer {
    font-size: var(--font-panel);
    color: var(--color-title);
}

.row-item {
    font-size: calc(var(--font-panel) * 0.9);
    color: color-mix(in srgb, var(--color-title) 85%, transparent);
}
</style>
