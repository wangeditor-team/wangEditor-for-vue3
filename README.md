# wangEditor for vue-next component

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![npm](https://img.shields.io/npm/v/@wangeditor/editor-for-vue/next.svg)](https://www.npmjs.com/package/@wangeditor/editor-for-vue/v/next) [![build status](https://github.com/vuejs/vue-next/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/wangeditor-team/wangEditor-for-vue3/actions)

## 使用

> 详情请访问[用户文档](https://www.wangeditor.com/v5/guide/for-frame.html#vue3)

1. 安装依赖

```shell
npm i @wangeditor/editor-for-vue@next --save
```

2. 安装核心包

```shell
npm i @wangeditor/editor --save
```

3. 导入组件

```ts
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
```

4. 引入样式

```html
<style>
  @import url(@wangeditor/editor/dist/css/style.css);
</style>
```

## 开发

1. 安装依赖 `npm install`
2. 调试
   - 本地调试，启动 example 页面
     - `npm run dev`
   - 打包
     - `npm run build`
   - 测试 npm 包
     - 需要先打包 `npm run build`
     - 然后进行`npm run link`
