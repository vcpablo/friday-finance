<template>
  <div class="flex flex-col items-center gap-2">
    <BaseSelect
      :model-value="modelValue"
      :label="label"
      :placeholder="placeholder"
      :disabled="loading"
      :options="result?.categories || []"
      :required="required"
      @update:model-value="handleUpdateModelValue"
    />
    <div class="flex w-full items-center justify-between">
      <button
        v-if="allowCreate"
        class="text-xs text-blue-500 bg-white flex gap-1 items-center"
        @click="handleAddCategory"
      >
        <Icon name="heroicons:plus" />
        {{ $t('transactions.addCategory') }}
      </button>
      <button
        class="text-xs text-red-500 bg-white flex gap-1 items-center"
        @click="handleCancelEditCategory"
      >
        <Icon name="heroicons:x-mark" />
        {{ $t('common.cancel') }}
      </button>
    </div>

    <CategoryAddModal
      :open="isCategoryAddModalOpen"
      @save="handleCategoryAddModalSave"
      @close="handleCategoryAddModalClose"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_CATEGORIES } from '@/graphql/categories'
import CategoryAddModal from './CategoryAddModal.vue'

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
  required: Boolean,
  allowCreate: Boolean
})

const emit = defineEmits(['update:modelValue', 'cancel:edit'])

const { loading, result, refetch } = useQuery(GET_CATEGORIES)

const isCategoryAddModalOpen = ref(false)

const handleUpdateModelValue = (value) => emit('update:modelValue', value)
const handleAddCategory = () => (isCategoryAddModalOpen.value = true)

const handleCategoryAddModalSave = async (categoryId) => {
  isCategoryAddModalOpen.value = false
  await refetch()
  handleUpdateModelValue(categoryId)
}

const handleCancelEditCategory = () => emit('cancel:edit')

const handleCategoryAddModalClose = () => (isCategoryAddModalOpen.value = false)
</script>
