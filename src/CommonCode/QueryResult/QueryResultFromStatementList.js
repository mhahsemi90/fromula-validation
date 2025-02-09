import {gql} from "@apollo/client";
import Client from "../../Client.js";

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
                result.data.formulaParsing :
                []
        )
    );
}

export default QueryResultFromStatementList