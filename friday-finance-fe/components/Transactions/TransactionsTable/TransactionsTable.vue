<template>
  <h1 class="font-bold mb-3">{{ $t('transactions.transactions') }}</h1>
  <!-- <pre>{{ result.transactions }}</pre> -->

  <BaseTable
    :columns="columns"
    :items="result?.transactions[0]?.data || []"
    :loading="loading"
    :sort-by="sortBy"
    :pagination="pagination"
    @update:sort-by="handleUpdateSortBy"
    @update:current-page="handleUpdateCurrentPage"
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
</template>

<script setup>
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { useI18n } from 'vue-i18n'

import { GET_TRANSACTIONS } from '~/graphql/transactions'
import {
  BASE_PAGINATION_DEFAULT_CURRENT_PAGE,
  BASE_PAGINATION_DEFAULT_PER_PAGE
} from '~~/constants'

const i18n = useI18n()

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

// const items = [
//   {
//     reference: 'Reference',
//     category: 'Category',
//     date: new Date(),
//     amount: 'US$ 20.00'
//   }
// ]

const sortBy = ref({
  key: 'date',
  direction: 'desc'
})

const pagination = ref({
  currentPage: BASE_PAGINATION_DEFAULT_CURRENT_PAGE,
  perPage: BASE_PAGINATION_DEFAULT_PER_PAGE,
  total: 0
})

const { loading, result, refetch, onResult } = useQuery(GET_TRANSACTIONS, {
  pagination: {
    take: pagination.value.perPage,
    skip: Math.ceil(pagination.value.total / pagination.value.perPage)
  }
})

onResult(({ data }) => {
  pagination.value.total = data.transactions[0].total
})

const handleUpdateSortBy = ({ key, direction }) => {
  sortBy.value.key = key
  sortBy.value.direction = direction
}

const handleUpdateCurrentPage = ({ currentPage }) => {
  pagination.value.currentPage = currentPage

  console.log({
    take: pagination.value.perPage,
    skip: (currentPage - 1) * pagination.value.perPage
  })

  refetch({
    pagination: {
      take: pagination.value.perPage,
      skip: (currentPage - 1) * pagination.value.perPage
    }
  })
}
</script>
