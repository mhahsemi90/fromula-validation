import Block from "../../ProjectObject/Block.js";
import addExpressionToBlocks from "../addExpressionToBlocks.js";
import Line from "../../ProjectObject/Line.js";
import BlockType from "../BlockType.js";
import StatementType from "./StatementType.js";
import {getKeywordFromMainList, getOperatorFromMainList} from "../../IntermediateFrame/getElementFromMainList.js";

const addVariableDeclarationStatementToLineOfBlocksList = (lineOfBlocksList, statement, row, lineLevel) => {
    const blocks = [];
    const keyWord = getKeywordFromMainList(statement.kind);
    blocks.push(
        new Block(BlockType.KEYWORD, keyWord.title, keyWord.code, keyWord.code)
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
        new Line(row[0], lineLevel[0], blocks, StatementType.LABEL_STATEMENT)
    );
}
export default addVariableDeclarationStatementToLineOfBlocksList;