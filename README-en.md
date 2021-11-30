# wangEditor for Vue

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![npm](https://img.shields.io/npm/v/@wangeditor/editor-for-vue.svg)](https://www.npmjs.com/package/@wangeditor/editor-for-vue/v/next) [![build status](https://github.com/wangeditor-team/wangEditor-for-vue3/actions/workflows/npm-publish.yml/badge.svg?branch=main)](https://github.com/wangeditor-team/wangEditor-for-vue3/actions)

[中文文档](./README.md)

## Introduction

An out-of-the-box [vue3 component](https://www.wangeditor.com/v5/guide/for-frame.html#vue3)
based on the [wangEditor v5](https://www.wangeditor.com/v5/guide/for-frame.html#vue3)

## Installation

1. Install the `wangeditor` core package

```shell
yarn add @wangeditor/editor
```

2. Install the current component package

```shell
yarn add @wangeditor/editor-for-vue
```

## Usage

### template

```html
<template>
  <div style="border: 1px solid #ccc">
    <!-- toolbar -->
    <Toolbar :editorId="editorId" style="border-bottom: 1px solid #ccc" />
    <!-- editor -->
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
import '@wangeditor/editor/dist/css/style.css';
import { computed, onUnmounted } from 'vue';
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue';
import cloneDeep from 'lodash.clonedeep';

export default {
  name: 'MyEditor',
  components: { Editor, Toolbar },
  setup() {
    const editorId = 'wangEditor-1';
    const defaultContent = [
      {
        type: 'paragraph',
        children: [{ text: 'One line of text' }],
      },
    ];

    // Deep clone `content`
    const getDefaultContent = computed(() => cloneDeep(defaultContent));

    // Editor config
    const editorConfig = {
      placeholder: 'Type your text...',
    };

    const handleChange = (editor) => {
      console.log('change:', editor.children);
    };

    // Timely destroy editor
    onUnmounted(() => {
      const editor = getEditor(editorId);
      if (editor == null) return;

      // Destroy and remove editor
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
