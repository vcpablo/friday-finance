export const BASE_PAGINATION_DEFAULT_CURRENT_PAGE = 1
export const BASE_PAGINATION_DEFAULT_PER_PAGE = 20

export const TOAST_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
}

export const TOAST_VARIANTS = {
  [TOAST_TYPES.INFO]: {
    background: 'bg-blue-50',
    text: 'text-blue-800',
    border: 'border border-blue-700',
    icon: 'heroicons:heroicons:information-circle'
  },
  [TOAST_TYPES.SUCCESS]: {
    background: 'bg-green-50',
    text: 'text-green-800',
    border: 'border border-green-700',
    icon: 'heroicons:check-circle-solid'
  },
  [TOAST_TYPES.WARNING]: {
    background: 'bg-orange-50',
    text: 'text-orange-800',
    border: 'border border-orange-700',
    icon: 'heroicons:exclamation-triangle-solid'
  },
  [TOAST_TYPES.ERROR]: {
    background: 'bg-red-50',
    text: 'text-red-800',
    border: 'border border-red-700',
    icon: 'heroicons:x-circle-solid'
  }
}
