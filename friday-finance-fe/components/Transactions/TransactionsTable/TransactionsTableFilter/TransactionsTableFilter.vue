<template>
  <div class="grid grid-cols-12 gap-3">
    <div class="col-span-12 md:col-span-4">
      <label for="price" class="block text-sm font-medium text-gray-700">
        {{ $t('transactions.search') }}
      </label>
      <div class="relative rounded-md">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3"
        >
          <span class="text-gray-500">
            <Icon name="heroicons:magnifying-glass" />
          </span>
        </div>
        <input
          id="query"
          v-model="queryModel"
          type="search"
          name="query"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          :placeholder="$t('transactions.searchPlaceholder')"
        />
      </div>
    </div>
    <div class="col-span-6 md:col-span-2">
      <label for="ending-month" class="block text-sm font-medium text-gray-700">
        {{ $t('transactions.bank') }}
      </label>
      <BankSelect
        v-model="filterModel.bank"
        :placeholder="$t('transactions.noFilterApplied')"
      />
    </div>
    <div class="col-span-6 md:col-span-2">
      <label for="ending-month" class="block text-sm font-medium text-gray-700">
        {{ $t('transactions.account') }}
      </label>
      <AccountSelect
        v-model="filterModel.account"
        :placeholder="$t('transactions.noFilterApplied')"
      />
    </div>
    <div class="col-span-6 md:col-span-2">
      <label
        for="starting-month"
        class="block text-sm font-medium text-gray-700"
      >
        {{ $t('transactions.startingMonth') }}
      </label>
      <div class="relative max-w-sm">
        <input
          id="starting-month"
          v-model="filterModel.startingMonth"
          type="month"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
        />
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="col-span-6 md:col-span-2">
      <label for="ending-month" class="block text-sm font-medium text-gray-700">
        {{ $t('transactions.endingMonth') }}
      </label>
      <div class="relative max-w-sm">
        <input
          id="ending-month"
          v-model="filterModel.endingMonth"
          type="month"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
        />
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { debounce } from 'lodash'
import BankSelect from './BankSelect.vue'
import AccountSelect from './AccountSelect.vue'

const props = defineProps({
  query: {
    type: String,
    default: ''
  },
  filter: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:filter', 'update:query'])
const filterModel = ref(props.filter)
watch(
  () => filterModel.value,
  (value) => emit('update:filter', value),
  { deep: true }
)

const queryModel = computed({
  set: debounce((value) => {
    console.log(value)
    emit('update:query', value)
  }, 500),
  get() {
    return props.query
  }
})

// const filterModel = computed({
//   set: debounce((value) => {
//     console.log(value)
//     emit('update:filter', value)
//   }, 500),
//   get() {
//     return props.filter
//   }
// })

// const handleFilterInput = debounce((field, value) => {
//   emit('update:filter', {
//     ...props.filter,
//     [field]: value
//   })
// }, 500)

// const handleQueryInput = debounce((event) => {
//   emit('update:query', event.target.value)
// }, 500)
</script>
