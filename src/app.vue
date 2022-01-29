<template>
  <div>{{msg}}</div>
</template>

<script>
import {defineComponent, ref} from 'vue';

export default defineComponent({
  setup() {
    let count = ref(0);
    let msg = 'hello vue mfsu'
    return {
      count,
      msg
    }
  }
})
</script>
