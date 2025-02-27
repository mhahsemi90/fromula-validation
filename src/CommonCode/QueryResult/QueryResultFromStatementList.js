import {gql} from "@apollo/client";
import Client from "../../Client.js";

function removeTypename(obj) {
    if (Array.isArray(obj)) {
        return obj.map(removeTypename);
    } else if (obj !== null && typeof obj === 'object') {
        const {__typename, ...rest} = obj;
        Object.keys(rest).forEach((key) => {
            rest[key] = removeTypename(rest[key]);
        });
        return rest;
    }
    return obj;
}

const QueryResultFromStatementList = (script, setLinesOfBlocks) => {
    Client
    .query({
        query: gql`query {
            formulaParsing(formula: "${script}"){
                id
                parentId
                row
                lineLevel
                blockList{
                    type
                    code
                    title
                    enTitle
                }
                lineType
            }
        }`,
    })
    .then((result) =>
        setLinesOfBlocks(
            result ?
                removeTypename(result.data.formulaParsing) :
                []
        )
    );
}

export default QueryResultFromStatementList