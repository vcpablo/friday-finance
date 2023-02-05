import { defineStore } from 'pinia'
import { TOAST_TYPES } from '~/constants'

export const useToastStore = defineStore('friday-finance/toast', {
  state: () => ({
    isOpen: false,
    options: {
      type: null,
      message: '',
      timeout: 5000
    }
  }),
  actions: {
    success(message, timeout) {
      this.options.type = TOAST_TYPES.SUCCESS
      this.show({ message, timeout })
    },

    error(message, { timeout }) {
      this.options.type = TOAST_TYPES.ERROR
      this.show({ message, timeout })
    },

    warning(message, { timeout }) {
      this.options.type = TOAST_TYPES.WARNING
      this.show({ message, timeout })
    },

    show({ message, timeout = 5000 }) {
      this.options = {
        ...this.options,
        message,
        timeout
      }

      this.isOpen = true

      if (timeout) {
        setTimeout(() => this.hide(), timeout)
      }
    },
    hide() {
      this.isOpen = false
      this.options = {
        type: null,
        message: '',
        timeout: 5000
      }
    }
  }
})
