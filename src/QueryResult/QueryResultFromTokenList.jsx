import Client from "../Client.js";
import {gql} from "@apollo/client";
import generateLineOfBlocksListFromTokenList
    from "../GenerateLineOfBlocksListFromTokenList/generateLineOfBlocksListFromTokenList.js";

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

const QueryResultFromTokenList = (script, setLineObjectList) => {
    Client
    .query({
        query: gql`query {
            getFormulaTokenList(formula: "${script}")
        }`,
    })
    .then((result) =>
        setLineObjectList(
            result ?
                generateLineOfBlocksListFromTokenList(
                    parsingJson(result.data.getFormulaTokenList)
                ) :
                []
        )
    );
}

export default QueryResultFromTokenList