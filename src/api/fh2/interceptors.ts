/**
 * 司空 2（FlightHub 2）专属请求拦截器
 * 与后端自研拦截器（createInterceptors）相互独立，各自处理自家协议
 * 覆盖：3 公共头注入 / code≠0 业务失败 / 401·403·429·5xx·网络错误 / blob 错误体解析
 */
import { ElMessage } from 'element-plus';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getFh2Config } from './config';

function newRequestId() {
    // 文档建议 UUID v4；非安全上下文（如局域网 http 访问 dev）回退拼接实现
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}

async function messageOfBlobError(data: Blob): Promise<string> {
    try {
        const text = await data.text();
        const parsed = JSON.parse(text);
        return String(parsed?.message ?? parsed?.msg ?? '');
    } catch {
        return '';
    }
}

export const createFh2Interceptors = () => ({
    requestIntercepter: (config: InternalAxiosRequestConfig) => {
        const { userToken, projectUuid } = getFh2Config();
        // 清除后端公共拦截器注入的 Bearer 头，避免脏头送达私有化平台
        config.headers.set('Authorization', '');
        config.headers.set('x-user-token', userToken);
        config.headers.set('X-Request-Id', newRequestId());
        if (projectUuid) config.headers.set('X-Project-Uuid', projectUuid);
        // 文档约定：JSON 请求体显式声明字符集
        if (config.method && config.method.toUpperCase() !== 'GET') {
            config.headers.set('Content-Type', 'application/json; charset=utf-8');
        }
        return config;
    },

    requestIntercepterCatch: (err: any) => Promise.reject(err),

    responseIntercepter: (res: AxiosResponse) => {
        if (res.request?.responseType === 'blob') return res;
        const body = res.data as ResponseDataType<unknown>;
        if (body && typeof body.code === 'number' && body.code !== 0) {
            const msg = body.message || body.msg || `业务错误 ${body.code}`;
            ElMessage.warning(msg);
            return Promise.reject(res) as never;
        }
        return res;
    },

    responseIntercepterCatch: async (err: any) => {
        const status: number | undefined = err?.response?.status ?? err?.status;
        let data = err?.response?.data;
        // blob 下载失败时服务端错误 JSON 被当作二进制，先尝试还原 message
        let blobMsg = '';
        if (data instanceof Blob) {
            blobMsg = await messageOfBlobError(data);
            data = null;
        }
        if (status === 401) {
            ElMessage.error('FH2 组织密钥缺失/无效/已刷新，请到控制台重新复制');
        } else if (status === 403) {
            ElMessage.error('FH2 无权限：请确认密钥所属用户在目标项目中具备对应角色');
        } else if (status === 429) {
            ElMessage.warning('FH2 请求过于频繁，请稍后重试');
        } else if (blobMsg || data?.message || data?.msg) {
            ElMessage.warning(blobMsg || String(data.message ?? data.msg));
        } else if (status && status >= 500) {
            ElMessage.error(`FH2 服务异常（HTTP ${status}），请稍后重试`);
        } else if (err?.message) {
            ElMessage.warning(`FH2 网络异常：${err.message}`);
        }
        return Promise.reject(err);
    }
});
