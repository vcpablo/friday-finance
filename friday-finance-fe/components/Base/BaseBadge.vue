<template>
  <span class="text-sm font-medium p-3 py-3 rounded" :style="style">
    {{ label }}
  </span>
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
  }
})

const style = computed(() => ({
  background: props.color,
  border: `1px solid #EDEDED`
}))
</script>
