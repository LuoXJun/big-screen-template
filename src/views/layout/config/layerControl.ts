import { createOSMImagery, type IconItem } from '@/cesium';
import type { LayerControlConfig, LayerTreeNode } from '@/components/layerControl/types';

// 演示数据（架子验证用占位，业务数据由接口提供，替换下方生成函数即可）

function makeDevices(lngBase: number, latBase: number, count: number): IconItem[] {
    return Array.from({ length: count }, (_, i) => ({
        id: `dev-${i + 1}`,
        lng: lngBase + i * 0.03,
        lat: latBase + (i % 2) * 0.02,
        label: `设备 ${i + 1}`
    }));
}

/** 设备节点：绑定「图层名 + 条目 id」，层级任意 */
function toItemNodes(layerName: string, count: number): LayerTreeNode[] {
    return Array.from({ length: count }, (_, i) => ({
        id: `${layerName}:dev-${i + 1}`,
        label: `设备 ${i + 1}`,
        type: 'item' as const,
        layerName,
        itemId: `dev-${i + 1}`
    }));
}

/** 初始视角（页面在图层就绪后定位到设备区域） */
export const initialView = { lng: 104.08, lat: 30.66, height: 50000 };

/**
 * 图层管理配置：图层初始化列表 + 图层树。
 * 树支持任意层级（区域 → 类别 → 设备集 → 设备），节点可选绑定图层；
 * 影像/地形等底图图层同样以普通节点挂入树。
 */
export const layerControlConfig: LayerControlConfig = {
    layers: [
        { type: 'icon', name: '设备集 A', config: { data: makeDevices(104.0, 30.62, 4) } },
        { type: 'icon', name: '设备集 B', config: { data: makeDevices(104.12, 30.68, 3) } },
        { type: 'icon', name: '设备集 C', config: { data: makeDevices(104.06, 30.74, 3) } },
        { type: 'icon', name: '设备集 D', config: { data: makeDevices(104.17, 30.74, 2) } },
        { type: 'imagery', name: '影像底图', config: { provider: createOSMImagery() } }
    ],
    tree: [
        {
            id: 'region-1',
            label: '区域一',
            type: 'group',
            children: [
                {
                    id: 'cat-1',
                    label: '设备类别 A',
                    type: 'group',
                    children: [
                        {
                            id: 'layer-a',
                            label: '设备集 A',
                            type: 'layer',
                            layerName: '设备集 A',
                            children: toItemNodes('设备集 A', 4)
                        },
                        {
                            id: 'layer-b',
                            label: '设备集 B',
                            type: 'layer',
                            layerName: '设备集 B',
                            visible: false,
                            children: toItemNodes('设备集 B', 3)
                        }
                    ]
                },
                {
                    id: 'cat-2',
                    label: '设备类别 B',
                    type: 'group',
                    children: [
                        {
                            id: 'layer-c',
                            label: '设备集 C',
                            type: 'layer',
                            layerName: '设备集 C',
                            children: toItemNodes('设备集 C', 3)
                        }
                    ]
                }
            ]
        },
        {
            id: 'region-2',
            label: '区域二',
            type: 'group',
            children: [
                {
                    id: 'layer-d',
                    label: '设备集 D',
                    type: 'layer',
                    layerName: '设备集 D',
                    children: toItemNodes('设备集 D', 2)
                }
            ]
        },
        {
            id: 'base-imagery',
            label: '卫星影像',
            type: 'layer',
            layerName: '影像底图',
            visible: false
        }
    ]
};
