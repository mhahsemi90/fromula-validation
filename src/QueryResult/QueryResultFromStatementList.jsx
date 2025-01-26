import {gql} from "@apollo/client";
import generateLineOfBlocksListFromStatementList from "../GenerateLineOfBlocksListFromStatementList/generateLineOfBlocksListFromStatementList.js";
import Client from "../Client.js";

const parsingJson = (json) => {
    console.log(json);
    let result = [];
    try {
        result = JSON.parse(json);
    } catch (err) {
        console.log(err);
    }
    return result;
}

const QueryResultFromStatementList = (script, setLineObjectList) => {
    Client
    .query({
        query: gql`query {
            formulaParsing(formula: "${script}")
        }`,
    })
    .then((result) =>
        setLineObjectList(
            result ?
                generateLineOfBlocksListFromStatementList(
                    parsingJson(result.data.formulaParsing)
                ) :
                []
        )
    );
}

export default QueryResultFromStatementList