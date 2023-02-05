<template>
  <BaseSelect
    :model-value="modelValue"
    :label="label"
    :placeholder="placeholder"
    :disabled="loading"
    :options="result?.categories || []"
    :required="required"
    @update:model-value="handleUpdateModelValue"
  />
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable'
import { GET_CATEGORIES } from '~/graphql/categories'

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
  required: Boolean
})

const emit = defineEmits(['update:modelValue'])

const { loading, result } = useQuery(GET_CATEGORIES)

const handleUpdateModelValue = (value) => emit('update:modelValue', value)
</script>
