<template>
  <BaseModal
    :open="open"
    :title="$t('transactions.transactionDetails')"
    @save="handleSave"
    @close="handleClose"
  >
    <BaseLoading v-if="loading" />
    <template v-else>
      <div class="flex items-center justify-between gap-20">
        <div class="text-2xl flex flex-col gap-2">
          <div class="flex items-center gap-3">
            <span v-if="result?.transactionById?.reference">
              {{ result?.transactionById?.reference }}
            </span>
            <span v-else class="text-gray-400">
              {{ $t('transactions.noReferenceProvided') }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <div v-if="isEditingCategory" class="flex flex-col gap-2">
              <CategorySelect
                v-model="categoryId"
                required
                :placeholder="$t('transactions.selectCategory')"
              />
              <button
                class="text-xs text-red-500 bg-white rounded flex gap-1 items-center self-end"
                @click="handleCancelEditCategory"
              >
                <Icon name="heroicons:x-mark" />
                {{ $t('common.cancel') }}
              </button>
            </div>
            <BaseBadge
              v-else
              :label="result?.transactionById?.category.name"
              :color="`#${result?.transactionById?.category.color}`"
              class="text-xs"
              :size="2"
            />

            <span
              v-if="!isEditingCategory"
              class="flex items-center text-xs gap-1 text-blue-500 cursor-pointer"
              @click="handleEditCategory"
            >
              <Icon name="heroicons:pencil-square-20-solid" />
              {{ $t('common.edit') }}
            </span>
          </div>
          <span class="text-sm">
            {{
              $d(new Date(result?.transactionById?.date), {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric'
              })
            }}
          </span>
        </div>
        <div class="flex">
          <span class="text-2xl">
            {{ result?.transactionById?.amount }}
          </span>

          <sup class="text-gray-400">{{
            result?.transactionById?.currency
          }}</sup>
        </div>
      </div>

      <hr />

      <div>
        <label class="block font-medium text-gray-700">
          {{ $t('transactions.account') }} /
          {{ $t('transactions.bank') }}
        </label>
        {{ result?.transactionById?.account?.name }} -
        {{ result?.transactionById?.account?.bank }}
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'

import CategorySelect from './CategorySelect.vue'

import { GET_TRANSACTION_BY_ID } from '~/graphql/transactions'

const props = defineProps({
  open: Boolean,

  transactionId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['save', 'close'])

const { loading, result, onResult } = useQuery(GET_TRANSACTION_BY_ID, {
  id: props.transactionId
})

onResult(({ data }) => (categoryId.value = data.transactionById.categoryId))

const isEditingCategory = ref(false)
const categoryId = ref(null)

const handleClose = () => emit('close')

const handleEditCategory = () => (isEditingCategory.value = true)

const handleCancelEditCategory = () => {
  isEditingCategory.value = false
  categoryId.value = result.value.transactionById.categoryId
}

const handleSave = () =>
  emit('save', {
    categoryId: categoryId.value,
    transactionId: props.transactionId
  })
</script>
