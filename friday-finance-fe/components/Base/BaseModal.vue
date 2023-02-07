<template>
  <div v-if="open" class="container mx-auto">
    <div class="flex justify-center">
      <div
        class="absolute inset-0 flex flex-col items-center justify-center bg-gray-700 bg-opacity-50"
      >
        <div class="min-w-5xl bg-white rounded-md shadow-xl">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <h3 class="text-2xl">
                {{ title }}
              </h3>
              <Icon
                name="heroicons:x-mark"
                class="cursor-pointer"
                @click="handleClose"
              />
            </div>
            <hr class="my-4" />
            <div class="flex flex-col gap-3">
              <slot />
            </div>
            <hr class="mt-4" />
          </div>

          <div class="flex justify-end px-6 pb-6">
            <button
              class="px-6 py-2 text-blue-800 border border-blue-600 rounded"
              :disabled="disabled || loading"
              @click="handleClose"
            >
              {{ $t('common.close') }}
            </button>
            <button
              class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded"
              :disabled="disabled || loading"
              @click="handleSave"
            >
              <Icon
                v-if="loading"
                name="heroicons:arrow-path"
                class="animate-spin"
              />
              <span v-else>
                {{ $t('common.save') }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: Boolean,
  disabled: Boolean,
  loading: Boolean,
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'save'])

const handleClose = () => emit('close')

const handleSave = () => emit('save')
</script>
