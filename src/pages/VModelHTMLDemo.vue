<template>
    <div>
        <textarea v-model="valueHtml" style="width: 100%; height: 150px;"></textarea>
    </div>
    <div style="border: 1px solid #ccc; margin-top: 20px;">
        <Toolbar :editor="editorRef" style="border-bottom: 1px solid #ccc"/>
        <Editor
            :defaultConfig="editorConfig"
            v-model="valueHtml"
            @onCreated="handleCreated"
            style="height: 300px"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, shallowRef, onBeforeUnmount, onMounted } from 'vue'
import Editor from '../components/Editor.vue'
import Toolbar from '../components/Toolbar.vue'
import { IDomEditor } from '@wangeditor/editor'

export default defineComponent({
  components: {
    Editor,
    Toolbar,
  },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef<IDomEditor | undefined>(undefined)

    const valueHtml = ref('<p>hello</p>')

    // 编辑器相关配置
    const editorConfig = {
      placeholder: '请输入内容...',
      // autofocus: false,
      // readOnly: true
    }

    function handleCreated(editor: IDomEditor) {
      editorRef.value = editor
    }

    onMounted(() => {
      // 模拟 ajax 异步设置 value
      setTimeout(() => {
        valueHtml.value = '<p>hello world</p>' // 测试 v-model
      }, 2000)
    })

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return

      editor.destroy()
    })

    return {
        editorRef,
        handleCreated,
        editorConfig,
        valueHtml
    }
  }
})
</script>