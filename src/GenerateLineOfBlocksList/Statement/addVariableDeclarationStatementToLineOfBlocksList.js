import Block from "../../ProjectObject/Block.js";
import addExpressionToBlocks from "../addExpressionToBlocks.js";
import LineOfBlocks from "../../ProjectObject/LineOfBlocks.js";
import BlockType from "../../Blocks/BlockType.js";

const addVariableDeclarationStatementToLineOfBlocksList = (lineOfBlocksList, statement, row, lineLevel) => {
    const blocks = [];
    blocks.push(
        new Block(BlockType.KEYWORD, statement.kind, statement.kind, row[0])
    );
    let firstVariable = true;
    statement.declaratorExpressionList.forEach((expression) => {
        if (!firstVariable) {
            blocks.push(
                new Block(BlockType.SEPARATOR, ',', ',', row[0])
            );
        }
        addExpressionToBlocks(blocks, expression, row);
        firstVariable = false;
    })
    lineOfBlocksList.push(
        new LineOfBlocks(lineLevel[0], blocks)
    );
}
export default addVariableDeclarationStatementToLineOfBlocksList;