<template>
  <div>
    <layout></layout>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import Layout from './components/layout.vue';

export default defineComponent({
  components: {
    Layout
  },
  setup() {
    let count = ref(0);
    let msg = 'hello vue mfsu'
    let onClick = () => {
      count.value += 1;
    }
    return {
      onClick,
      count,
      msg
    }
  }
})
</script>
