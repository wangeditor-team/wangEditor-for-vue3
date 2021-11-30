# wangEditor for vue-next component

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![npm](https://img.shields.io/npm/v/@wangeditor/editor-for-vue/next.svg)](https://www.npmjs.com/package/@wangeditor/editor-for-vue/v/next) [![build status](https://github.com/wangeditor-team/wangEditor-for-vue3/actions/workflows/npm-publish.yml/badge.svg?branch=main)](https://github.com/wangeditor-team/wangEditor-for-vue3/actions)

[English documentation](./README-en.md)

## 介绍

基于 [wangEditor](https://www.wangeditor.com/v5/) 封装的开箱即用的 [vue3 组件](https://www.wangeditor.com/v5/guide/for-frame.html#vue3)

## 安装

1. 安装 `wangeditor` 核心包

```shell
yarn add @wangeditor/editor
```

2. 安装组件包

```shell
yarn add @wangeditor/editor-for-vue@next
```

## 使用

### 模板

```html
<template>
  <div style="border: 1px solid #ccc">
    <!-- 工具栏 -->
    <Toolbar :editorId="editorId" style="border-bottom: 1px solid #ccc" />
    <!-- 编辑器 -->
    <Editor
      :editorId="editorId"
      :defaultConfig="editorConfig"
      :defaultContent="getDefaultContent"
      @onChange="handleChange"
      style="height: 500px"
    />
  </div>
</template>
```

### Script

```ts
import '@wangeditor/editor/dist/css/style.css'; // 也可以在 <style> 中 import

import { computed, onUnmounted } from 'vue';
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue';
import cloneDeep from 'lodash.clonedeep';

export default {
  name: 'MyEditor',
  components: { Editor, Toolbar },
  setup() {
    const editorId = 'wangEditor-1';
    // 默认内容
    const defaultContent = [
      {
        type: 'paragraph',
        children: [{ text: '一行文字' }],
      },
    ];

    // 注意，深度拷贝 content ，否则会报错
    const getDefaultContent = computed(() => cloneDeep(defaultContent));

    // 编辑器配置
    const editorConfig = {
      placeholder: '请输入内容...',
    };

    const handleChange = (editor) => {
      console.log('change:', editor.children);
    };

    // 及时销毁编辑器
    onUnmounted(() => {
      const editor = getEditor(editorId);
      if (editor == null) return;

      // 销毁，并移除 editor
      editor.destroy();
      removeEditor(editorId);
    });

    return {
      editorId,
      getDefaultContent,
      editorConfig,
      handleChange,
    };
  },
};
```
