<template>
  <span>
    <label
      v-if="label"
      :for="$attrs.id"
      class="block mb-2 text-sm font-medium text-gray-900"
      >{{ label }}</label
    >
    <select
      :id="$attrs.id"
      :value="modelValue"
      :disabled="disabled"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      @input="handleInput"
    >
      <option selected disabled value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.name }}
      </option>
    </select>
  </span>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  disabled: Boolean
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>
