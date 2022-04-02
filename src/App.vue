<template>
  <div>
    <button @click="changeType('')">clear</button>
    <button @click="changeType('basic')">Basic demo</button>
    <button @click="changeType('v-model')">v-model HTML demo</button>
  </div>
  <hr>
  <BasicDemo v-if="type === 'basic'"></BasicDemo>
  <VModelHTMLDemo v-if="type === 'v-model'"></VModelHTMLDemo>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BasicDemo from './pages/BasicDemo.vue'
import VModelHTMLDemo from './pages/VModelHTMLDemo.vue'

export default defineComponent({
  components: {
    BasicDemo,
    VModelHTMLDemo,
  },
  setup() {
    const type = ref('')

    function changeType(newType: string) {
      type.value = newType
    }

    return {
      type,
      changeType
    }
  },
})
</script>
