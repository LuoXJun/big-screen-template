/**
 * 司空 2（FlightHub 2）错误码段位说明
 * 6 位业务码按域分段，仅用于排查定位；运行时提示以服务端 message 为准
 */
export const FH2_ERROR_SEGMENTS: Record<string, string> = {
    '200xxx': '通用 / 鉴权',
    '210xxx': '组织 / 项目 / 用户 / 角色权限',
    '212xxx': '设备 IoT 通用（离线、指令超时）',
    '213xxx': '直播 / 旁路推流 / 录制（云端）',
    '513xxx': '直播（设备端）',
    '613xxx': '直播（Pilot 端）',
    '214xxx': '航线',
    '217xxx': '飞行任务',
    '219xxx': '飞行任务',
    '223xxx': '媒体变化检测 / 开放建模',
    '225xxx': '飞行区 / 地形障碍物',
    '228xxx': '实时控制 / DRC 控制权',
    '229xxx': 'RTK / 激活',
    '231xxx': '分享（媒体 / 直播）',
    '233xxx': '直播参数配置',
    '238xxx': 'AI 算法',
    '241xxx': '文件同步',
    '246xxx': 'SSO',
    '312xxx': '设备升级 / 飞行执行 / 相机控制',
    '514xxx': '机场 / DRC 网关 / 网络'
};

/** 业务 code 的段位前缀（六位码取前三位 + xxx） */
export function segmentOf(code: number): string {
    const prefix = String(code).slice(0, 3) + 'xxx';
    return FH2_ERROR_SEGMENTS[prefix] ? `${prefix} ${FH2_ERROR_SEGMENTS[prefix]}` : '';
}
