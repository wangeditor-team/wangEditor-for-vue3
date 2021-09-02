<template>
  <div>
    <div style="border: 1px solid #ccc">
      <!-- 工具栏 -->
      <Toolbar :editorId="editorId" :mode="mode" />
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
import { defineComponent, computed } from "vue";
import Editor from "./components/Editor.vue";
import Toolbar from "./components/Toolbar.vue";
import { IDomEditor } from "@wangeditor/editor-cattle";
import cloneDeep from "lodash.cloneDeep";

export default defineComponent({
  components: {
    Editor,
    Toolbar,
  },
  setup() {
    // 模式
    const mode = "default";
    // 编辑器唯一id值
    const editorId = "we-1001";
    // 编辑器默认内容
    const defaultContent = [
      {
        type: "paragraph",
        children: [{ text: "一行文字" }],
      },
    ];
    // 深拷贝 defaultContent
    const getDefaultContent = computed(() => cloneDeep(defaultContent));
    // 编辑器相关配置
    const editorConfig = {
      placeholder: "请输入内容123...",
      // 菜单配置
      MENU_CONF: {
        uploadImage: {
          server: "http://106.12.198.214:3000/api/upload-img", // 上传图片地址
          fieldName: "vue-demo-fileName",
        },
        insertImage: {
          checkImage(
            src: string,
            alt: string,
            href: string
          ): boolean | string | undefined {
            if (src.indexOf("http") !== 0) {
              return "图片网址必须以 http/https 开头";
            }
            return true;
          },
        },
      },
    };

    // 编辑器创建完成触发
    const handleCreated = (editor: IDomEditor) => {
      console.log("created", editor);
    };
    // 编辑器change事件触发
    const handleChange = (editor: IDomEditor) => {
      console.log("change:", editor.getText());
    };

    return {
      editorId,
      mode,
      getDefaultContent,
      editorConfig,
      handleCreated,
      handleChange,
    };
  },
});
</script>

<style>
@import url(@wangeditor/editor-cattle/dist/css/style.css);
</style>
