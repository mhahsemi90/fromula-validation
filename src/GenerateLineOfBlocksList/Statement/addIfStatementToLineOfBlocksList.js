import BlockType from "../../ViewBlock/BlockType.js";
import StatementType from "./StatementType.js";
import Line from "../../ProjectObject/Line.js";
import Block from "../../ProjectObject/Block.js";
import addExpressionToBlocks from "../addExpressionToBlocks.js";
import addStatementToLineOfBlocksList from "../addStatementToLineOfBlocksList.js";

const addIfStatementToLineOfBlocksList = (lineOfBlocksList, statement, row, lineLevel) => {
    const blocks = [];
    blocks.push(
        new Block(BlockType.KEYWORD, 'if', 'if')
    );
    blocks.push(
        new Block(BlockType.OPEN_PARENTHESES, '(', '(')
    );
    if (statement.test)
        addExpressionToBlocks(blocks, statement.test)
    blocks.push(
        new Block(BlockType.CLOSE_PARENTHESES, ')', ')')
    );
    lineOfBlocksList.push(
        new Line(row[0],lineLevel[0], blocks)
    );
    if (statement.consequent) {
        row[0]++;
        switch (statement.consequent.type) {
            case StatementType.BLOCK_STATEMENT:
                addStatementToLineOfBlocksList(lineOfBlocksList, statement.consequent, row, lineLevel);
                break;
            default:
                lineLevel[0]++;
                addStatementToLineOfBlocksList(lineOfBlocksList, statement.consequent, row, lineLevel);
                lineLevel[0]--;
                break;
        }
    }
    if (statement.alternate) {
        row[0]++;
        const blocks = [];
        blocks.push(
            new Block(BlockType.KEYWORD, 'else', 'else')
        );
        lineOfBlocksList.push(
            new Line(row[0],lineLevel[0], blocks)
        );
        row[0]++;
        switch (statement.alternate.type) {
            case StatementType.BLOCK_STATEMENT:
                addStatementToLineOfBlocksList(lineOfBlocksList, statement.alternate, row, lineLevel);
                break;
            default:
                lineLevel[0]++;
                addStatementToLineOfBlocksList(lineOfBlocksList, statement.alternate, row, lineLevel);
                lineLevel[0]--;
                break;
        }
    }
}
export default addIfStatementToLineOfBlocksList;