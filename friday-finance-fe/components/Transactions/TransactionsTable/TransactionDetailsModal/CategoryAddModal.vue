<template>
  <BaseModal
    :open="open"
    :title="$t('transactions.addCategory')"
    :loading="loading"
    class="category-add-modal"
    @save="handleSave"
    @close="handleClose"
  >
    <form style="min-width: 25rem">
      <div class="mb-6">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900"
          >{{ $t('categories.name') }} *</label
        >
        <input
          id="name"
          v-model="category.name"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
          @input="handleNameInput"
        />
        <small v-if="errors.name" class="text-red-500">
          {{ $t('categories.validation.name') }}
        </small>
      </div>
      <div class="mb-6">
        <label
          for="color"
          class="block mb-2 text-sm font-medium text-gray-900"
          >{{ $t('categories.color') }}</label
        >
        <input
          id="color"
          v-model="category.color"
          type="color"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-10 p-1"
        />
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { useToastStore } from '@/stores/toast'
import { useI18n } from 'vue-i18n'

import { CREATE_CATEGORY } from '@/graphql/categories'

const props = defineProps({
  open: Boolean,

  transactionId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['save', 'close'])

const { loading, mutate } = useMutation(CREATE_CATEGORY, {
  id: props.transactionId
})

const toast = useToastStore()
const i18n = useI18n()

const category = ref({
  name: '',
  color: ''
})

const errors = ref({
  name: false
})

const handleClose = () => emit('close')

const handleSave = async () => {
  try {
    if (validate()) {
      const { data } = await mutate({
        category: {
          ...category.value,
          color: category.value.color.replace('#', '')
        }
      })

      toast.success(i18n.t('categories.createdSuccessfully'))
      emit('save', data.createCategory.id)
    }
  } catch (error) {
    console.error(error)
    toast.error(i18n.t('categories.createError'))
  }
}

const validate = () => {
  errors.value.name = !category.value.name

  return Object.values(errors.value).every((error) => !error)
}

const handleNameInput = () => (errors.value.name = false)
</script>

<style scoped>
.category-add-modal {
  z-index: 2;
}
</style>
