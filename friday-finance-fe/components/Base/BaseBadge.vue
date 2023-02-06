<template>
  <div
    class="text-sm font-medium rounded inline-block"
    :class="`p-${size}`"
    :style="style"
  >
    {{ label }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 3
  }
})

const style = computed(() => ({
  background: props.color,
  border: '1px solid #EDEDED'
}))
</script>
