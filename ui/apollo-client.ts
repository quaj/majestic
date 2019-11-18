import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'

declare var PRODUCTION: boolean

let WS_URL = 'ws://localhost:4000'
let HTTP_URL = 'http://localhost:4000'
if (PRODUCTION && window.location.hostname !== 'localhost') {
  WS_URL = `wss://${window.location.host}`
  HTTP_URL = `https://${window.location.host}`
}

export function getAPIUrl() {
  return HTTP_URL
}

const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true,
  },
})

const httpLink = new HttpLink({ uri: HTTP_URL })

const link = split(
  ({ query }: any) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client
