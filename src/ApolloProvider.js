import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {fetchToken} from "./api/auth/auth";

const authToken = await fetchToken();
const baseURL = process.env.REACT_APP_API_BASE_URL;
const client = new ApolloClient({
    uri: `${baseURL}/graphql`,
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${authToken}`,
    },
});

const ApolloAppProvider = ({children}) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloAppProvider;