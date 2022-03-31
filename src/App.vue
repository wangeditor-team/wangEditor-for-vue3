<template>
  <div>
    <button @click="changeType('')">clear</button>
    <button @click="changeType('basic')">Basic demo</button>
  </div>
  <hr>
  <BasicDemo v-if="type === 'basic'"></BasicDemo>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BasicDemo from './pages/BasicDemo.vue'

export default defineComponent({
  components: {
    BasicDemo,
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

