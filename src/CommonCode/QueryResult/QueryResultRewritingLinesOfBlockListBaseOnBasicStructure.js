import Client from "../../Client.js";
import {gql} from "@apollo/client";

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

const QueryResultRewritingLinesOfBlockListBaseOnBasicStructure = (linesOfBlocks, setLinesOfBlocks) => {
    const lineList = removeTypename(linesOfBlocks);
    Client
    .query({
        query: gql`query FormulaRewritingBaseOnBasicStructure($lineList: [LineInput]) {
            formulaRewritingBaseOnBasicStructure(lineList: $lineList){
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
        variables: {
            lineList: lineList
        }
    })
    .then((result) =>
        setLinesOfBlocks(
            result ?
                result.data.formulaRewritingBaseOnBasicStructure :
                []
        )
    );
}
export {QueryResultRewritingLinesOfBlockListBaseOnBasicStructure};