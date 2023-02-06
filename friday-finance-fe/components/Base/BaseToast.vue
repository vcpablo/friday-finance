<template>
  <Transition>
    <div
      v-if="toast.isOpen"
      class="absolute p-10 right-10 base-toast"
      role="alert"
    >
      <div
        class="flex items-center gap-2 justify-between p-3 rounded"
        :class="variant"
      >
        <div>
          <Icon :name="icon" />
          {{ toast.options.message }}
        </div>
        <Icon
          name="heroicons:x-mark"
          class="cursor-pointer"
          @click="handleHide"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { useToastStore } from '@/stores/toast'
import { TOAST_TYPES, TOAST_ICONS } from '@/constants'

const toast = useToastStore()

const variant = computed(() => ({
  'bg-blue-50 text-blue-800 border border-blue-700':
    toast.options.type === TOAST_TYPES.INFO,
  'bg-green-50 text-green-800 border border-green-700':
    toast.options.type === TOAST_TYPES.SUCCESS,
  'bg-red-50 text-red-800 border border-red-700':
    toast.options.type === TOAST_TYPES.ERROR,
  'bg-yellow-50 text-yellow-800 border border-yellow-700':
    toast.options.type === TOAST_TYPES.WARNING
}))

const icon = computed(() => TOAST_ICONS[toast.options.type])

const handleHide = () => toast.hide()
</script>

<style>
.base-toast {
  z-index: 1;
  min-width: 450px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
