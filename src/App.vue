<template>
  <div>
    <div  style="border: 1px solid #ccc; ">
      <Toolbar :editorId="editorId" />
    </div>
    <div style="border: 1px solid #ccc; margin-top: 10px;height: 300px">
      <Editor :editorId="editorId" :mode="mode"  :defaultConfig="editorConfig" :defaultContent="defaultContent" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Editor from './components/Editor.vue'
import Toolbar from './components/Toolbar.vue'
import { SlateEditor } from '@wangeditor/editor-cattle'

export default defineComponent({
  name: 'App',
  data(){
    return {
      defaultContent: [],
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
      mode:'default',
      editorId: 'we-1001'
    }
  },
  components: {
    Editor,Toolbar
  },
  methods:{
    handleCreated(editor: SlateEditor){
      console.log(editor,'初始化完成')
    }
  }
})
</script>

<style>
@import url(@wangeditor/editor-cattle/dist/css/style.css);
</style>
