import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/graphql',
})

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('access_token') : null

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )

      // Handle authentication errors
      if (
        message.includes('Unauthorized') ||
        message.includes('Invalid token') ||
        message.includes('Token expired') ||
        message.includes('Failed to refresh Strava token') ||
        extensions?.code === 'UNAUTHENTICATED'
      ) {
        console.log('🔐 Authentication error detected, logging out user')

        // Clear local storage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token')
          localStorage.removeItem('user')
        }

        // Redirect to login page
        if (
          typeof window !== 'undefined' &&
          window.location.pathname !== '/login'
        ) {
          window.location.href = '/login'
        }
      }
    })
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`)

    // Handle network errors that might be auth-related
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      console.log('🔐 Network authentication error detected, logging out user')

      // Clear local storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
      }

      // Redirect to login page
      if (
        typeof window !== 'undefined' &&
        window.location.pathname !== '/login'
      ) {
        window.location.href = '/login'
      }
    }
  }
})

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            merge(_, incoming) {
              return incoming
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})

// Utility function to logout user
export const logout = () => {
  // Clear local storage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
  }

  // Clear Apollo cache
  apolloClient.clearStore()

  // Redirect to login page
  if (typeof window !== 'undefined') {
    window.location.href = '/login'
  }
}
