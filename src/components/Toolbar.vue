<template>
  <div ref="selector" classname="w-e-toolbar-init"></div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  onUnmounted,
  PropType,
  onBeforeMount,
} from "vue";
import { createToolbar, IDomEditor, IToolbarConfig } from "@wangeditor/editor";
import emitter from "../utils/emitter";
import { getEditor } from "../utils/editor-map";

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
      default: "default",
    },
    /** 编辑器默认配置 */
    defaultConfig: {
      type: Object as PropType<Partial<IToolbarConfig>>,
      default: {},
    },
  },
  setup(props) {
    // 编辑器容器
    const selector = ref(null);
    /**
     * 初始化编辑器
     */
    const initToolbar = (editor: IDomEditor) => {
      if (!selector.value) return;
      editor = editor || getEditor(props.editorId);
      if (editor == null) {
        throw new Error(
          "Not found instance of Editor when create <Toolbar/> component"
        );
      }
      createToolbar({
        editor,
        selector: (selector.value! as Element) || "<div></div>",
        mode: props.mode,
        config: props.defaultConfig,
      });
    };

    onBeforeMount(() => {
      emitter.on(`w-e-created-${props.editorId}`, (editor) => {
        initToolbar(editor);
      });
    });

    onUnmounted(() => {
      emitter.off(`w-e-created-${props.editorId}`, initToolbar);
    });

    return {
      selector,
    };
  },
});
</script>
