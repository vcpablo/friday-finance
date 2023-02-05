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
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      @input="handleInput"
    >
      <option :disabled="required" selected value="">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.id"
        :value="option[primaryKey]"
      >
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
  primaryKey: {
    type: String,
    default: 'id'
  },
  disabled: Boolean,
  required: Boolean
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>
