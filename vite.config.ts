import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import path from 'path';

const name = 'WangEditorForVue';
const entry = path.resolve(__dirname, './src', 'index.ts');

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry,
      name: name,
      fileName: (format) => {
        if (format === 'es') {
          return `index.esm.js`;
        } else if (format === 'umd') {
          return `index.js`;
        }
      },
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', '@wangeditor/editor'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    vue(),
    dts({
      exclude: ['./src/App.vue', './src/main.ts'],
    }),
  ],
});
