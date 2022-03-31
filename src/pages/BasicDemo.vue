<template>
  <div>
    <button @click="handleCreateEditor">
      {{ flag ? '销毁Editor' : '创建Editor' }}
    </button>
    <div v-if="flag" style="border: 1px solid #ccc">
      <!-- 工具栏 -->
      <Toolbar :editorId="editorId" :mode="mode" style="border-bottom: 1px solid #ccc"/>
      <!-- 编辑器 -->
      <Editor
        :editorId="editorId"
        :mode="mode"
        :defaultContent="defaultContent"
        :defaultConfig="editorConfig"
        :defaultHtml="defaultHtml"
        @onCreated="handleCreated"
        @onChange="handleChange"
        @customPaste="handlePaste"
        style="height: 300px"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, onBeforeUnmount } from 'vue'
import Editor from '../components/Editor.vue'
import Toolbar from '../components/Toolbar.vue'
import { getEditor, removeEditor } from '../utils/editor-map'
import { IDomEditor } from '@wangeditor/editor'

export default defineComponent({
  components: {
    Editor,
    Toolbar,
  },
  setup() {
    const flag = ref(false)
    // 模式
    const mode = 'default'
    // 编辑器唯一id值
    const editorId = 'we-1001'

    // 编辑器默认内容 - JSON 格式
    const defaultContent = ref([
      {
        type: 'paragraph',
        children: [{ text: '一行文字' }],
      },
    ])

    // 编辑器默认内容 - HTML 格式
    // const defaultHtml = '<p>hello&nbsp;<strong>world</strong></p>\n<p><br></p>'
    const defaultHtml = ''

    // 编辑器相关配置
    const editorConfig = {
      placeholder: '请输入内容...',
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
          },
        },
      },
    }

    setTimeout(() => {
      // defaultContent (JSON 格式) 和 defaultHtml (HTML 格式) ，二选一
      // defaultHtml.value = '<p>hello&nbsp;<strong>world</strong></p>\n<p><br></p>'
      defaultContent.value = [{ type: 'paragraph', children: [{ text: 'ajax 异步获取的内容' }] }]
      flag.value = true
    }, 2000)

    // 编辑器创建完成触发
    const handleCreated = (editor: IDomEditor) => {
      console.log('created', editor)
    }
    // 编辑器change事件触发
    const handleChange = (editor: IDomEditor) => {
      console.log('change:', editor.getText())
    }
    // 自定义粘贴事件
    const handlePaste = (
      editor: IDomEditor,
      event: ClipboardEvent,
      callback: (val: boolean) => void
    ) => {
      editor.insertText('test')
      callback(false)
    }

    const handleCreateEditor = () => {
      flag.value = !flag.value
    }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = getEditor(editorId)
      if (editor == null) return

      editor.destroy()
      removeEditor(editorId)
    })

    return {
      flag,
      editorId,
      mode,
      defaultHtml,
      defaultContent,
      editorConfig,
      handleCreated,
      handleChange,
      handlePaste,
      handleCreateEditor,
    }
  },
})
</script>

<style>
@import url(@wangeditor/editor/dist/css/style.css);
</style>
