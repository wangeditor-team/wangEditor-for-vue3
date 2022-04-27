<template>
  <div ref="box" style="height: 100%"></div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref, PropType, toRaw, watch, shallowRef } from 'vue'
import {
  createEditor,
  IEditorConfig,
  SlateEditor,
  SlateTransforms,
  SlateDescendant,
  IDomEditor,
} from '@wangeditor/editor'
import { genErrorInfo } from '../utils/create-info'

export default defineComponent({
  props: {
    /** 编辑器模式 */
    mode: {
      type: String,
      default: 'default',
    },
    /** 编辑器默认内容 */
    defaultContent: {
      type: Array as PropType<SlateDescendant[]>,
      default: [],
    },
    defaultHtml: {
      type: String,
      default: '',
    },
    /** 编辑器默认配置 */
    defaultConfig: {
      type: Object as PropType<Partial<IEditorConfig>>,
      default: {},
    },
    /* 自定义 v-model */
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const box = ref(null) // 编辑器容器

    const editorRef = shallowRef<null | IDomEditor>(null) // editor 实例，必须用 shallowRef

    const curValue = ref('') // 记录 editor 当前 html 内容

    /**
     * 初始化编辑器
     */
    const initEditor = () => {
      if (!box.value) return
      // 获取原始数据，解除响应式特性
      const defaultContent = toRaw(props.defaultContent)

      createEditor({
        selector: box.value! as Element,
        mode: props.mode,
        content: defaultContent || [],
        html: props.defaultHtml || props.modelValue || '',
        config: {
          ...props.defaultConfig,
          onCreated(editor) {
            editorRef.value = editor // 记录 editor 实例

            context.emit('onCreated', editor)

            if (props.defaultConfig.onCreated) {
              const info = genErrorInfo('onCreated')
              throw new Error(info)
            }
          },
          onChange(editor) {
            const editorHtml = editor.getHtml()
            curValue.value = editorHtml // 记录当前内容
            context.emit('update:modelValue', editorHtml) // 触发 v-model 值变化

            context.emit('onChange', editor)
            if (props.defaultConfig.onChange) {
              const info = genErrorInfo('onChange')
              throw new Error(info)
            }
          },
          onDestroyed(editor) {
            context.emit('onDestroyed', editor)
            if (props.defaultConfig.onDestroyed) {
              const info = genErrorInfo('onDestroyed')
              throw new Error(info)
            }
          },
          onMaxLength(editor) {
            context.emit('onMaxLength', editor)
            if (props.defaultConfig.onMaxLength) {
              const info = genErrorInfo('onMaxLength')
              throw new Error(info)
            }
          },
          onFocus(editor) {
            context.emit('onFocus', editor)
            if (props.defaultConfig.onFocus) {
              const info = genErrorInfo('onFocus')
              throw new Error(info)
            }
          },
          onBlur(editor) {
            context.emit('onBlur', editor)
            if (props.defaultConfig.onBlur) {
              const info = genErrorInfo('onBlur')
              throw new Error(info)
            }
          },
          customAlert(info, type) {
            context.emit('customAlert', info, type)
            // @ts-ignore
            if (props.defaultConfig.customAlert) {
              const info = genErrorInfo('customAlert')
              throw new Error(info)
            }
          },
          customPaste: (editor, event): any => {
            if (props.defaultConfig.customPaste) {
              const info = genErrorInfo('customPaste')
              throw new Error(info)
            }
            let res
            context.emit('customPaste', editor, event, (val: boolean) => {
              res = val
            })
            return res
          },
        },
      })
    }

    /**
     * 设置 HTML
     * @param newHtml new html
     */
    function setHtml(newHtml: string) {
      const editor = editorRef.value
      if (editor == null) return

      // 记录编辑器当前状态
      const isEditorDisabled = editor.isDisabled()
      const isEditorFocused = editor.isFocused()
      const editorSelectionStr = JSON.stringify(editor.selection)

      // 删除并重新设置 HTML
      editor.enable()
      editor.focus()
      editor.select([])
      editor.deleteFragment()
      // @ts-ignore
      SlateTransforms.setNodes(editor, { type: 'paragraph' }, { mode: 'highest' })
      editor.dangerouslyInsertHtml(newHtml)

      // 恢复编辑器状态
      if (!isEditorFocused) {
        editor.deselect()
        editor.blur()
      }
      if (isEditorDisabled) {
        editor.deselect()
        editor.disable()
      }
      if (editor.isFocused()) {
        try {
          editor.select(JSON.parse(editorSelectionStr)) // 选中原来的位置
        } catch (ex) {
          editor.select(SlateEditor.start(editor, [])) // 选中开始
        }
      }
    }

    /**
     * 元素挂在后初始化编辑器
     */
    onMounted(() => {
      initEditor()
    })

    // 监听 v-model 值变化
    watch(
      () => props.modelValue,
      newVal => {
        if (newVal === curValue.value) return // 和当前内容一样，则忽略

        // 重新设置 HTML
        setHtml(newVal)
      }
    )

    return {
      box,
    }
  },
})
</script>
