<template>
  <div>
    <div style="border: 1px solid #ccc; ">
      <!-- 工具栏 -->
      <Toolbar :editorId="editorId" />
      <!-- 编辑器 -->
      <Editor
        :editorId="editorId"
        :mode="mode"
        :defaultConfig="editorConfig"
        :defaultContent="getDefaultContent"
        @onCreated="handleCreated"
        @onChange="handleChange"
        style="height: 500px"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Editor from './components/Editor.vue'
import Toolbar from './components/Toolbar.vue'
import { IDomEditor } from '@wangeditor/editor-cattle'
import cloneDeep from 'lodash.cloneDeep'

export default defineComponent({
  name: 'App',
  components: {
    Editor, Toolbar
  },
  data() {
    return {
      defaultContent: [{
        type: 'paragraph',
        children: [{ text: '一行文字' }],
      }],
      editorConfig: {
        placeholder: '请输入内容123...',
        // 菜单配置
        MENU_CONF: {
          uploadImage: {
            server: 'http://106.12.198.214:3000/api/upload-img', // 上传图片地址
            fieldName: 'vue-demo-fileName',
          },
          insertImage: {
            checkImage(src: string, alt: string, href: string): boolean | string | undefined {
              if (src.indexOf('http') !== 0) {
                return '图片网址必须以 http/https 开头'
              }
              return true
            }
          }
        }
      },
      mode: 'default',
      editorId: 'we-1001'
    }
  },
  computed: {
    // 深拷贝 content
    getDefaultContent(): any {
      return cloneDeep(this.defaultContent)
    }
  },
  methods: {
    handleCreated(editor: IDomEditor) {
      console.log(editor, 'init finish')
    },
    handleChange(editor: IDomEditor) {
      console.log(editor.getText())
    }
  }
})
</script>

<style>
@import url(@wangeditor/editor-cattle/dist/css/style.css);
</style>
