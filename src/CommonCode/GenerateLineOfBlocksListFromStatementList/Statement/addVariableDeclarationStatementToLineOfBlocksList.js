import Block from "../../../ProjectObject/Block.js";
import addExpressionToBlocks from "../addExpressionToBlocks.js";
import Line from "../../../ProjectObject/Line.js";
import BlockType from "../../BlockType.js";
import LineType from "../../LineType.js";
import {getKeywordFromMainList, getOperatorFromMainList} from "../../getElementFromMainList.js";

const addVariableDeclarationStatementToLineOfBlocksList = (lineOfBlocksList, statement, row, lineLevel, id, parentIdStack) => {
    const blocks = [];
    const keyword = getKeywordFromMainList(statement.kind);
    const parentId = parentIdStack.length > 0 ? parentIdStack[0] : null;
    blocks.push(
        new Block(BlockType.KEYWORD, keyword.title, keyword.enTitle, keyword.code)
    );
    let firstVariable = true;
    statement.declaratorExpressionList.forEach((expression) => {
        if (!firstVariable) {
            const operator = getOperatorFromMainList(',')
            blocks.push(
                new Block(BlockType.SEPARATOR, operator.title, operator.code, operator.code)
            );
        }
        addExpressionToBlocks(blocks, expression);
        firstVariable = false;
    })
    lineOfBlocksList.push(
        new Line(row[0], lineLevel[0], blocks, LineType.VARIABLE_DECLARATION_STATEMENT, id[0]++, parentId)
    );
}
export default addVariableDeclarationStatementToLineOfBlocksList;