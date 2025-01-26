import {ApolloClient, InMemoryCache} from "@apollo/client";

const Client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    fetchOptions: {
        mode: 'no-cors'
    },
    cache: new InMemoryCache()
});

export default Client;