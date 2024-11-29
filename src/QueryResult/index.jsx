import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import getLineObjectList from "../GetLineObject/getLineObjectList.js";

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    fetchOptions: {
        mode: 'no-cors'
    },
    cache: new InMemoryCache()

});

const parsingJson = (json) => {
    let result = [];
    try {
        result = JSON.parse(json);
    } catch (err) {
        console.log(err);
    }
    return result;
}

const QueryResult = (script, setLineObjectList) => {
    client
        .query({
            query: gql`query {
        formulaValidation(formula: "${script}")  
                 }`,
        })
        .then((result) => setLineObjectList(
            result ?
                getLineObjectList(
                    parsingJson(result.data.formulaValidation)
                ) :
                []
        ));
}

export default QueryResult