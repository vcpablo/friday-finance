<template>
  <nav class="flex justify-center mt-8">
    <ul class="inline-flex">
      <li>
        <a
          class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
          :class="{ 'cursor-not-allowed': isFirstPage }"
          @click="handlePreviousPage"
        >
          {{ $t('pagination.previous') }}</a
        >
      </li>
      <li v-for="page in pages" :key="page">
        <a
          class="px-3 py-2 leading-tight text-gray-500 bg-white border border-l-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          :class="{
            'cursor-pointer': page !== '...',
            'bg-gray-600 text-white hover:bg-gray-800 hover:text-white':
              page === currentPage
          }"
          @click="handleSetPage(page)"
          >{{ page }}</a
        >
      </li>
      <li>
        <a
          class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
          :class="{ 'cursor-not-allowed': isLastPage }"
          @click="handleNextPage"
          >{{ $t('pagination.next') }}</a
        >
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { paginate } from '~/utils/pagination'
import {
  BASE_PAGINATION_DEFAULT_CURRENT_PAGE,
  BASE_PAGINATION_DEFAULT_PER_PAGE
} from '~/constants'

const props = defineProps({
  currentPage: {
    type: Number,
    default: BASE_PAGINATION_DEFAULT_CURRENT_PAGE
  },
  perPage: {
    type: Number,
    default: BASE_PAGINATION_DEFAULT_PER_PAGE
  },
  total: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:currentPage'])

const pages = computed(() =>
  paginate(props.currentPage, Math.ceil(props.total / props.perPage))
)

const isFirstPage = computed(() => props.currentPage === 1)
const isLastPage = computed(
  () => props.currentPage === Math.ceil(props.total / props.perPage)
)

const handlePreviousPage = () => {
  if (isFirstPage.value) return
  emit('update:currentPage', props.currentPage - 1)
}

const handleNextPage = () => {
  if (isLastPage.value) return
  emit('update:currentPage', props.currentPage + 1)
}

const handleSetPage = (page) => {
  if (page === '...') return

  emit('update:currentPage', page)
}
</script>
