<template>
  <div class="flex flex-col">
    <div class="sm:-mx-6 lg:-mx-8 overflow-x-auto">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div>
          <table class="min-w-full table-auto">
            <thead class="border-b">
              <tr>
                <th
                  v-for="column in columns"
                  :key="column.key"
                  :data-testid="`base-table-column__${column.key}`"
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  <slot :name="`header-${column.key}`" :column="column">
                    <div class="flex gap-2 items-center">
                      {{ column.label }}
                      <div
                        v-if="column.sortable"
                        :data-testid="`base-table-sorting__${column.key}`"
                        class="cursor-pointer"
                        @click="toggleSortBy(column.key)"
                      >
                        <Icon
                          v-if="isSortedByAsc"
                          :data-testid="`base-table-sorting-asc__${column.key}`"
                          name="heroicons:chevron-up-20-solid"
                        ></Icon>
                        <Icon
                          v-if="isSortedByDesc"
                          :data-testid="`base-table-sorting-desc__${column.key}`"
                          name="heroicons:chevron-down-20-solid"
                        ></Icon>
                      </div>
                    </div>
                  </slot>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading" data-testid="base-table-loading">
                <td :colspan="columns.length">
                  <BaseLoading />
                </td>
              </tr>
              <tr v-else-if="error">
                <td :colspan="columns.length" class="p-3">
                  <div
                    class="flex items-center gap-2 justify-center p-3 rounded bg-red-50 text-red-800 border border-red-700"
                  >
                    <Icon name="heroicons:x-circle-20-solid" />
                    {{ error }}
                  </div>
                </td>
              </tr>
              <tr
                v-else-if="items.length === 0"
                data-testid="base-table-no-results"
              >
                <td :colspan="columns.length">
                  <div class="flex items-center justify-center gap-3 py-5">
                    {{ $t('common.noResults') }}
                  </div>
                </td>
              </tr>
              <tr
                v-for="item in items"
                :key="item.id"
                :data-testid="`base-table-row__${item.id}`"
                class="border-b hover:bg-gray-100 hover:cursor-pointer"
                :class="{ 'blur-sm': loading }"
                @click="handleClickRow(item)"
              >
                <td
                  v-for="column in columns"
                  :key="`${item.id}__${column.key}`"
                  :data-testid="`base-table-cell__${item.id}__${column.key}`"
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
            v-if="pagination.total / pagination.perPage > 1"
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
  error: {
    type: String,
    default: ''
  },
  loading: Boolean
})

const emit = defineEmits(['update:sortBy', 'update:currentPage', 'click:row'])

const isSortedByAsc = computed(() => props.sortBy.direction === 'asc')
const isSortedByDesc = computed(() => props.sortBy.direction === 'desc')

const toggleSortBy = (key) => {
  const direction = isSortedByAsc.value ? 'desc' : 'asc'
  emit('update:sortBy', { key, direction })
}

const handleUpdateCurrentPage = (currentPage) =>
  emit('update:currentPage', { currentPage })

const handleClickRow = (item) => emit('click:row', item)
</script>
