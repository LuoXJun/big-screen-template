/** 演示项目数据：后续可替换为接口返回 */
export interface ProjectItem {
    id: string;
    name: string;
    desc: string;
}

export const projects: ProjectItem[] = [
    { id: 'p1', name: '智慧园区项目', desc: '园区三维可视化大屏演示项目' },
    { id: 'p2', name: '无人机巡查项目', desc: '航线规划与设备监控演示项目' },
    { id: 'p3', name: '城市应急项目', desc: '应急指挥调度大屏演示项目' }
];
