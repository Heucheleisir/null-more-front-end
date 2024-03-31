import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://null-more-api:7777',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
            }
        }
    },
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        postcss: {
            plugins: [
                autoprefixer({
                    overrideBrowserslist: [
                        "Android 4.1",
                        "iOS 7.1",
                        "Chrome > 31",
                        "ff > 31",
                        "ie >= 8"
                    ]
                })
            ]
        }
    }
})