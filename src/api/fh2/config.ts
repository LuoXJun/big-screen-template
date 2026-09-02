/**
 * 司空 2（FlightHub 2）私有化 OpenAPI 配置
 * token/项目支持运行时可切换（多项目/多组织场景热更新）
 */
import { ref } from 'vue';

export interface Fh2Config {
    /** 私有化平台地址，如 https://your-fh2-domain（不含 /openapi/v2.0 前缀） */
    baseURL: string;
    /** 组织密钥（JWT），司空 2 控制台「组织设置 → OpenAPI」复制 */
    userToken: string;
    /** 项目 UUID（部分接口必需） */
    projectUuid?: string;
    /** 请求超时（ms） */
    timeout?: number;
}

const defaults: Fh2Config = {
    baseURL: import.meta.env.VITE_FH2_API_URL ?? '',
    userToken: import.meta.env.VITE_FH2_USER_TOKEN ?? '',
    projectUuid: import.meta.env.VITE_FH2_PROJECT_UUID ?? '',
    timeout: 30000
};

export const fh2Config = ref<Fh2Config>({ ...defaults });

/** 运行时更新配置（切换项目/组织密钥） */
export function setFh2Config(config: Partial<Fh2Config>) {
    fh2Config.value = { ...fh2Config.value, ...config };
}

/** 读取当前配置 */
export function getFh2Config(): Fh2Config {
    return { ...fh2Config.value };
}
