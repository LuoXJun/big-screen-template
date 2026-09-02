/**
 * 司空 2（FlightHub 2）请求实例
 * 复用 BaseRequest 工厂，加载/错误基建与后端接口一致，鉴权/业务码由 fh2 拦截器自理
 */
import BaseRequest from '@/utils/request/base_request';
import { createFh2Interceptors } from './interceptors';
import { getFh2Config } from './config';

export const fh2Request = new BaseRequest({
    baseURL: getFh2Config().baseURL,
    timeout: getFh2Config().timeout,
    // 大屏多为轮询场景，默认不弹全局 loading
    isLoading: false,
    interceptors: () => createFh2Interceptors()
});
