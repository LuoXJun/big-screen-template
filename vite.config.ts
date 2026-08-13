import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import cesium from 'vite-plugin-cesium';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        cesium(),
        AutoImport({
            imports: ['vue'],
            resolvers: [ElementPlusResolver()],
            dts: 'src/types/autoImport.d.ts'
        }),
        Components({
            resolvers: [ElementPlusResolver()],
            dts: 'src/types/components.d.ts'
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
