
<script lang='ts'>
import { h, onMounted, defineComponent, ref, onUnmounted, PropType } from 'vue'
import { createToolbar, IToolbarConfig, Toolbar } from '@wangeditor/editor-cattle'
import emitter from '../utils/emitter'
import { divide } from 'lodash'
import { getEditor, removeEditor } from '../utils/editor-map'

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
  setup(props) {
    // 编辑器容器
    const selector = ref(null)
    /**
     * 初始化编辑器
     */
    const initToolbar = () => {
      if (!selector.value) return

      // 监听编辑器创建成功的事件，创建成功后创建对应的toolbar
      emitter.on(`w-e-created-${props.editorId}`, editor => {
        // 如果编辑器实例未初始化，则抛出错误
        if (editor == null) {
          throw new Error('Not found instance of Editor when create <Toolbar/> component')
        }

        createToolbar({
          editor,
          selector: selector.value! as Element || '<div></div>',
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

    return () =>
      h('div', {
        ref: selector
      })
  },
})


</script>

