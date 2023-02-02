<template>
  <div class="flex flex-col">
    <div class="sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div>
          <!-- <div v-if="loading" class="animate-pulse">
            
            <div class="h-8 bg-gray-300 mb-3 rounded"></div>
            <div class="h-8 bg-gray-200 mb-3 rounded"></div>
            <div class="h-8 bg-gray-300 mb-3 rounded"></div>
            <div class="h-8 bg-gray-200 mb-3 rounded"></div>
          </div> -->
          <div v-if="items.length === 0" class="text-center">
            {{ $t('transactions.noResults') }}
          </div>
          <table v-else class="min-w-full table-auto">
            <thead class="border-b">
              <tr>
                <th
                  v-for="column in columns"
                  :key="column.key"
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  <slot :name="`header-${column.key}`" :column="column">
                    <div class="flex gap-2 items-center">
                      {{ column.label }}
                      <template v-if="!column.sortable">
                        <div
                          class="cursor-pointer"
                          @click="toggleSortBy(column.key)"
                        >
                          <Icon
                            v-if="isSortedByAsc"
                            name="heroicons:chevron-up-20-solid"
                          ></Icon>
                          <Icon
                            v-if="isSortedByDesc"
                            name="heroicons:chevron-down-20-solid"
                          ></Icon>
                        </div>
                      </template>
                    </div>
                  </slot>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id" class="border-b">
                <td
                  v-for="column in columns"
                  :key="`${item.id}__${column.key}`"
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  <slot
                    :name="`cell-${column.key}`"
                    :item="item"
                    :column="column"
                  >
                    {{ item[column.key] }}
                  </slot>
                </td>
              </tr>
            </tbody>
          </table>

          <BasePagination
            :current-page="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="pagination.total"
            @update:current-page="handleUpdateCurrentPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  items: {
    type: Array,
    default: () => []
  },
  sortBy: {
    type: Object,
    default: () => ({})
  },
  pagination: {
    type: Object,
    default: () => ({})
  },
  loading: Boolean
})

const emit = defineEmits(['update:sortBy', 'update:currentPage'])

const isSortedByAsc = computed(() => props.sortBy.direction === 'asc')
const isSortedByDesc = computed(() => props.sortBy.direction === 'desc')

const toggleSortBy = (key) => {
  const direction = isSortedByAsc.value ? 'desc' : 'asc'
  emit('update:sortBy', { key, direction })
}

const handleUpdateCurrentPage = (currentPage) =>
  emit('update:currentPage', { currentPage })
</script>