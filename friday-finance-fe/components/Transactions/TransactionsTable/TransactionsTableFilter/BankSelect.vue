<template>
  <BaseSelect
    :model-value="modelValue"
    :label="label"
    :placeholder="placeholder"
    :disabled="loading"
    :options="result?.banks || []"
    @update:model-value="handleUpdateModelValue"
  />
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable'
import { GET_BANKS } from '@/graphql/accounts'

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
  }
})

const emit = defineEmits(['update:modelValue'])

const { loading, result } = useQuery(GET_BANKS)

const handleUpdateModelValue = (value) => emit('update:modelValue', value)
</script>
