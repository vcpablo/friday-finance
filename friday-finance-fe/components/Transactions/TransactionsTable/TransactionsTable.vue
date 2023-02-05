<template>
  <h1 class="font-bold mb-3">{{ $t('transactions.transactions') }}</h1>
  <TransactionsTableFilter
    :query="query"
    :filter="filter"
    @update:filter="handleUpdateFilter"
    @update:query="handleUpdateQuery"
  />

  <BaseTable
    :columns="columns"
    :items="result?.transactions[0]?.data || []"
    :loading="loading"
    :sort-by="sortBy"
    :pagination="pagination"
    @update:sort-by="handleUpdateSortBy"
    @update:current-page="handleUpdateCurrentPage"
    @click:row="handleClickRow"
  >
    <template #header-amount="{ column }">
      <div class="text-right">{{ column.label }}</div>
    </template>
    <template #cell-reference="{ item }">
      <span v-if="item.reference">
        {{ item.reference }}
      </span>
      <span v-else class="text-gray-300">
        {{ $t('transactions.noReferenceProvided') }}
      </span>
    </template>

    <template #cell-category="{ item }">
      <BaseBadge
        :label="item.category.name"
        :color="`#${item.category.color}`"
      />
    </template>

    <template #cell-date="{ item }">
      {{
        $d(new Date(item.date), {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      }}
    </template>

    <template #cell-amount="{ item }">
      <div class="text-right">
        {{ item.amount }}

        <span class="text-gray-300">{{ item.currency }}</span>
      </div>
    </template>
  </BaseTable>

  <TransactionDetailsModal
    v-if="transactionDetailsId"
    :transaction-id="transactionDetailsId"
    :open="isTransactionDetailsModalOpen"
    @save="handleTransactionDetailsModalSave"
    @close="handleTransactionDetailsModalClose"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { useI18n } from 'vue-i18n'
import { useToastStore } from '~/stores/toast'

import TransactionsTableFilter from './TransactionsTableFilter/TransactionsTableFilter.vue'
import TransactionDetailsModal from './TransactionDetailsModal/TransactionDetailsModal.vue'

import { GET_TRANSACTIONS, UPDATE_TRANSACTION } from '~/graphql/transactions'
import {
  BASE_PAGINATION_DEFAULT_CURRENT_PAGE,
  BASE_PAGINATION_DEFAULT_PER_PAGE
} from '~/constants'

const i18n = useI18n()
const toast = useToastStore()

const columns = [
  {
    key: 'reference',
    label: i18n.t('transactions.reference')
  },
  {
    key: 'category',
    label: i18n.t('transactions.category')
  },
  {
    key: 'date',
    label: i18n.t('transactions.date')
  },
  {
    key: 'amount',
    label: i18n.t('transactions.amount')
  }
]

const sortBy = ref({
  key: 'date',
  direction: 'desc'
})

const pagination = ref({
  currentPage: BASE_PAGINATION_DEFAULT_CURRENT_PAGE,
  perPage: BASE_PAGINATION_DEFAULT_PER_PAGE,
  total: 0
})

const query = ref('')
const filter = ref({
  bank: null,
  account: null,
  startingMonth: null,
  endingMonth: null
})

const isTransactionDetailsModalOpen = ref(false)
const transactionDetailsId = ref(null)

const { loading, result, refetch, onResult } = useQuery(GET_TRANSACTIONS, {
  pagination: {
    take: pagination.value.perPage,
    skip: Math.ceil(pagination.value.total / pagination.value.perPage)
  },
  sort: [{ [sortBy.value.key]: sortBy.value.direction }]
})

const { mutate } = useMutation(UPDATE_TRANSACTION)

onResult(({ data }) => {
  pagination.value.total = data.transactions[0].total
})

const handleUpdateSortBy = ({ key, direction }) => {
  sortBy.value.key = key
  sortBy.value.direction = direction

  handleRefetch()
}

const handleUpdateCurrentPage = ({ currentPage }) => {
  pagination.value.currentPage = currentPage

  refetch({
    pagination: {
      take: pagination.value.perPage,
      skip: (currentPage - 1) * pagination.value.perPage
    }
  })
}

const handleUpdateFilter = (value) => {
  pagination.value.currentPage = 1
  filter.value = value

  handleRefetch()
}

const handleUpdateQuery = (value) => {
  pagination.value.currentPage = 1
  query.value = value

  handleRefetch()
}

const handleRefetch = () =>
  refetch({
    pagination: {
      take: pagination.value.perPage,
      skip: (pagination.value.currentPage - 1) * pagination.value.perPage
    },
    filter: filter.value,
    sort: [{ [sortBy.value.key]: sortBy.value.direction }],
    query: query.value
  })

const handleClickRow = (transaction) => {
  transactionDetailsId.value = transaction.id
  isTransactionDetailsModalOpen.value = true
}

const handleTransactionDetailsModalSave = async ({
  transactionId,
  categoryId
}) => {
  try {
    await mutate({
      transaction: {
        id: transactionId,
        categoryId
      }
    })

    toast.success(i18n.t('transactions.savedSuccessfully'))
    handleRefetch()
    handleTransactionDetailsModalClose()
  } catch (error) {
    console.error(error)
    toast.error(i18n.t('transactions.error'))
  }
}

const handleTransactionDetailsModalClose = () => {
  isTransactionDetailsModalOpen.value = false
  transactionDetailsId.value = null
}
</script>
