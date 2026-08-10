/// <reference types="vite/client" />

interface ViteTypeOptions {
    // 添加这行代码，你就可以将 ImportMetaEnv 的类型设为严格模式，
    // 这样就不允许有未知的键值了。
    strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_LOGIN_PASSWORD: string;
    readonly VITE_STATIC_URL: string;
    readonly VITE_CALLBACK_URL: string;
    readonly VITE_FILE_URL: string;
    readonly VITE_TIME_OUT: number;
    readonly VITE_API_USER_URL: string;
    readonly VITE_API_URL: string;
    readonly VITE_SC_CODE: Array<number | string>;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
