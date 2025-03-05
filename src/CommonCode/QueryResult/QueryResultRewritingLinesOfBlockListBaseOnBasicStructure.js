import Client from "../../Client.js";
import {gql} from "@apollo/client";
import removeTypename from "./removeTypename.js";

const QueryResultRewritingLinesOfBlockListBaseOnBasicStructure = (linesOfBlocks, setLinesOfBlocks, setFrame) => {
    Client
    .query({
        query: gql`query FormulaRewritingBaseOnBasicStructure( $lineList: [LineInput] ) {
            formulaRewritingBaseOnBasicStructure(lineList: $lineList){
                reWritingLineList{
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
                validationMessage
            }
        }`,
        variables: {
            lineList: linesOfBlocks
        }
    })
    .then((result) => {
        if (result && result.data.formulaRewritingBaseOnBasicStructure.validationMessage === 'OK') {
            console.log(result.data.formulaRewritingBaseOnBasicStructure.reWritingLineList)
            setLinesOfBlocks(
                removeTypename(result.data.formulaRewritingBaseOnBasicStructure.reWritingLineList)
            );
            setFrame('Basic');
        }
    });
}
export {QueryResultRewritingLinesOfBlockListBaseOnBasicStructure};