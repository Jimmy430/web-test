import Constants from 'expo-constants'
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from, concat } from '@apollo/client'
import { onError } from 'apollo-link-error'
import { RetryLink } from 'apollo-link-retry'
import { Alert } from 'react-native'
// import fetch from 'node-fetch'
// import ErrorTrackingAPI from '../ErrorTrackingAPI'

// const errorLink = onError(({ graphQLErrors }) => {
//     if (graphQLErrors)
//         graphQLErrors.map(({ message, extensions }) => {
//             ErrorTrackingAPI.sendError(message, "Apollo Client", "GraphQL error")
//         });
// })
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path, extensions }) => {
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            )
        });
    if (networkError)
        Alert.alert('[Graphql Error]', networkError.message)

});

const retryLink = new RetryLink({
    attempts: (count, operation, error) => {
        if (count == 5) {
            return false
        }
        return !!error && operation.operationName != 'specialCase';
    },
    delay: (count) => {
        return count * 1000 * Math.random();
    }
})

const SQLlink = new HttpLink({
    uri: 'https://graphql-dyndev.azurewebsites.net/graphql?code=d7QBUaoUNr7sOBdSkcEgkN/SXPa/TggF4a1SHRQQh17qU1jeKbPlzg==',
    // fetch
})

// const link = ApolloLink.from([
//     retryLink,
//     // errorLink,
//     SQLlink
// ])
const link = from([errorLink, concat(retryLink, SQLlink)])

// export const client = new ApolloClient({
//     link,
//     cache: new InMemoryCache({
//         typePolicies: {
//             /* id of MiniBuffetProdcut might be the same, so use variantId instead */
//             MiniBuffetProduct: {
//                 keyFields: ["variantId"]
//             },
//             MiniBuffetOption: {
//                 keyFields: ["id", "packs", "sequence"]
//             }
//         }
//         // freezeResults: true
//     }),
//     // assumeImmutableResults: true,
// })

export const client = new ApolloClient({
    // uri: 'https://graphql-dyndev.azurewebsites.net/graphql?code=d7QBUaoUNr7sOBdSkcEgkN/SXPa/TggF4a1SHRQQh17qU1jeKbPlzg==',
    uri: 'http://localhost:7071/graphql',
    cache: new InMemoryCache(),
});