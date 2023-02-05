<template>
  <Transition>
    <div
      v-if="toast.isOpen"
      class="absolute p-10 right-10 base-toast"
      role="alert"
    >
      <div
        class="flex items-center gap-2 justify-between p-3 rounded"
        :class="[
          toastVariants.border,
          toastVariants.background,
          toastVariants.text
        ]"
      >
        <div>
          <Icon :name="toastVariants.icon" />
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
import { useToastStore } from '~/stores/toast'
import { TOAST_VARIANTS } from '~/constants'

const toast = useToastStore()

const toastVariants = computed(() => TOAST_VARIANTS[toast.options.type] || {})
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
