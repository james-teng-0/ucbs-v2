import {defineConfig} from 'vite'
import vitePluginString from 'vite-plugin-string'

export default defineConfig({
    base: '/ucbs-v2/',
    plugins: [
        vitePluginString()
    ]
})
