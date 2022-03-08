<template>
  <div ref="box" style="height: 100%"></div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref, PropType, toRaw, onBeforeUnmount } from 'vue'
import { createEditor, IEditorConfig } from '@wangeditor/editor'
import { Descendant } from 'slate'
import { getEditor, recordEditor, removeEditor } from '../utils/editor-map'
import { genErrorInfo } from '../utils/create-info'
import emitter from '../utils/emitter'

export default defineComponent({
  props: {
    /** 编辑器默认ID */
    editorId: {
      type: String,
      required: true,
    },
    /** 编辑器模式 */
    mode: {
      type: String,
      default: 'default',
    },
    /** 编辑器默认内容 */
    defaultContent: {
      type: Array as PropType<Descendant[]>,
      default: () => [],
    },
    defaultHtml: {
      type: String,
      default: '',
    },
    /** 编辑器默认配置 */
    defaultConfig: {
      type: Object as PropType<Partial<IEditorConfig>>,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    // 检查用户是否传入了editorId
    if (!props.editorId) {
      throw new Error('Need `editorId` props when create <Editor/> component')
    }

    // 编辑器容器
    const box = ref(null)

    function validate(key: keyof IEditorConfig) {
      if (typeof props.defaultConfig[key] === 'function') {
        throw new Error(genErrorInfo(key))
      }
    }

    /**
     * 初始化编辑器
     */
    const initEditor = () => {
      if (!box.value) return

      // 获取原始数据，解除响应式特性
      const { editorId, mode, defaultConfig, defaultContent, defaultHtml } = toRaw(props)

      createEditor({
        selector: box.value,
        mode: mode,
        content: defaultContent,
        html: defaultHtml,
        config: {
          ...defaultConfig,
          onCreated(editor) {
            // 记录 editor
            recordEditor(editorId, editor)
            // 触发自定义事件（如创建 toolbar）
            emitter.emit(`w-e-created-${editorId}`, editor)
            emit('onCreated', editor)
            validate('onCreated')
          },
          onChange(editor) {
            emit('onChange', editor)
            validate('onChange')
          },
          onDestroyed(editor) {
            emit('onDestroyed', editor)
            validate('onDestroyed')
          },
          onMaxLength(editor) {
            emit('onMaxLength', editor)
            validate('onMaxLength')
          },
          onFocus(editor) {
            emit('onFocus', editor)
            validate('onFocus')
          },
          onBlur(editor) {
            emit('onBlur', editor)
            validate('onBlur')
          },
          customAlert(info, type) {
            emit('customAlert', info, type)
            validate('customAlert')
          },
          customPaste(editor, event): any {
            validate('customPaste')
            let res
            emit('customPaste', editor, event, (val: boolean) => {
              res = val
            })
            return res
          },
        },
      })
    }
    /**
     * 元素挂在后初始化编辑器
     */
    onMounted(initEditor)

    onBeforeUnmount(() => {
      const editor = getEditor(props.editorId)
      if (editor == null) return
      // 销毁，并移除 editor
      editor.destroy()
      removeEditor(props.editorId)
    })

    return { box }
  },
})
</script>
