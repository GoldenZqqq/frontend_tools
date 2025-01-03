import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import UnoCSS from "unocss/vite"
import { presetUno, presetAttributify, presetIcons } from "unocss"
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path' 

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')  // 添加路径别名配置
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "vue-router"],
      dts: "src/auto-imports.d.ts",
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ["src/components"],
      dts: "src/components.d.ts"
    }),
    UnoCSS({
      presets: [presetUno(), presetAttributify(), presetIcons()]
    })
  ]
})
