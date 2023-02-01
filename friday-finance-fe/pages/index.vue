<template>
  <AccountSelect
    v-model="account"
    :label="$t('transactions.account')"
    :placeholder="$t('transactions.noFilterApplied')"
  />
</template>

<script setup>
import AccountSelect from '~/components/Transactions/TransactionsTable/TransactionsTableFilter/AccountSelect.vue'
import { ref } from 'vue'

const account = ref('')
</script>
