import { fileURLToPath, URL } from 'node:url';

import { defineConfig, type Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import cesiumModule from 'vite-plugin-cesium';

// vite-plugin-cesium 的 types 在 ESM 项目（nodenext）下被判定为 CJS 模块，
// default 导入的静态类型错位为模块命名空间；运行时为默认导出函数，此处显式断言。
const cesium = cesiumModule as unknown as (options?: {
    rebuildCesium?: boolean;
    devMinifyCesium?: boolean;
    cesiumBuildRootPath?: string;
    cesiumBuildPath?: string;
    cesiumBaseUrl?: string;
}) => Plugin;

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        cesium(),
        AutoImport({
            imports: ['vue'],
            dts: 'src/types/autoImport.d.ts'
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    base: './',
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use '@/styles/globalScss.scss' as *;`
            }
        }
    },
    build: {
        sourcemap: true
    },
    server: {
        host: true,
        port: 3005,
        hmr: true,
        proxy: {
            '^/user': {
                target: 'http://10.222.125.103:38081/',
                secure: false,
                changeOrigin: true,
                rewrite: (path: string) => {
                    return path.replace(/^\/user/, '');
                }
            }
        }
    }
});
