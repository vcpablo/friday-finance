import { defineNuxtPlugin } from '#app'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: runtimeConfig.public.apiUrl
  })
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})
