import Block from "../../ProjectObject/Block.js";
import addExpressionToBlocks from "../addExpressionToBlocks.js";
import Line from "../../ProjectObject/Line.js";
import BlockType from "../../ViewBlock/BlockType.js";

const addVariableDeclarationStatementToLineOfBlocksList = (lineOfBlocksList, statement, row, lineLevel) => {
    const blocks = [];
    blocks.push(
        new Block(BlockType.KEYWORD, statement.kind, statement.kind)
    );
    let firstVariable = true;
    statement.declaratorExpressionList.forEach((expression) => {
        if (!firstVariable) {
            blocks.push(
                new Block(BlockType.SEPARATOR, ',', ',')
            );
        }
        addExpressionToBlocks(blocks, expression);
        firstVariable = false;
    })
    lineOfBlocksList.push(
        new Line(row[0],lineLevel[0], blocks)
    );
}
export default addVariableDeclarationStatementToLineOfBlocksList;