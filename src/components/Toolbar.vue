<template>
  <div ref="box"></div>
</template>

<script lang='ts'>
import { onMounted, defineComponent, ref, onUnmounted, PropType } from 'vue'
import { createToolbar, IToolbarConfig } from '@wangeditor/editor-cattle'
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
    /** 编辑器默认配置 */
    defaultConfig: {
      type: Object as PropType<Partial<IToolbarConfig>>,
      default: {},
    },
  },
  setup(props, context) {
    // 编辑器容器
    const box = ref(null)
    /**
     * 初始化编辑器
     */
    const initToolbar = () => {
      if (!box.value) return

      // 监听编辑器创建成功的事件，创建成功后创建对应的toolbar
      emitter.on(`w-e-created-${props.editorId}`, editor => {
        // 如果编辑器实例未初始化，则抛出错误
        if (editor == null) {
          throw new Error('Not found instance of Editor when create <Toolbar/> component')
        }

        createToolbar({
          editor,
          toolbarSelector: box.value! as Element,
          mode: props.mode,
          config: props.defaultConfig,
        })
      })
    }

    onMounted(() => {
      initToolbar()
    })

    onUnmounted(() => {
      emitter.off(`w-e-created-${props.editorId}`, initToolbar)
    })

    return {
      box,
    }
  },
})
</script>

