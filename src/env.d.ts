/// <reference types="vite/client" />
/// <reference types="element-plus/global.d.ts" />
/// <reference types="@types/markdown-it/lib/index.d.ts" />

interface ImportMetaEnv {
    readonly VITE_NM_BASE_URL: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module '*.js'
