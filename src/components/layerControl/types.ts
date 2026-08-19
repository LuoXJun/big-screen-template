import type { LayerType } from '@/cesium';

/**
 * 图层树节点：任意层级（组 → 类别 → 图层 → 设备…）。
 * 节点可选绑定图层：绑定 layerName（+itemId）后显隐受控；
 * 纯容器节点（如区域分组）不绑定，仅做子级聚合开关。
 */
export interface LayerTreeNode {
    /** 节点唯一键 */
    id: string;
    label: string;
    /** 仅用于渲染样式区分（组/图层/设备），不影响联动逻辑 */
    type?: 'group' | 'layer' | 'item';
    /** 绑定的图层名（整层显隐） */
    layerName?: string;
    /** 绑定的图层内条目 id（设备级显隐，需同时提供 layerName） */
    itemId?: string;
    /** 初始显隐（默认 true）：决定树初始勾选与图层初始状态 */
    visible?: boolean;
    children?: LayerTreeNode[];
}

/** 图层初始化条目：面板挂载后按序创建（同名自动替换） */
export interface LayerConfigItem {
    type: LayerType;
    name: string;
    config?: Record<string, unknown>;
}

/** 图层管理完整配置：图层初始化列表 + 图层树结构 */
export interface LayerControlConfig {
    layers: LayerConfigItem[];
    tree: LayerTreeNode[];
}
