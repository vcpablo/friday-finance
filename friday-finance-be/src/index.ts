import { ApolloServer } from 'apollo-server'
import { schema } from './graphql/schema'
import { context } from './graphql/context'

const server = new ApolloServer({
  schema,
  context,
})

server.listen().then(({ url }) => {
  console.log(`Graphql api running at ${url}graphql`)
})