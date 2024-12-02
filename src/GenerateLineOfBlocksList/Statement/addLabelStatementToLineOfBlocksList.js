import Block from "../../ProjectObject/Block.js";
import BlockType from "../../Blocks/BlockType.js";
import LineOfBlocks from "../../ProjectObject/LineOfBlocks.js";
import addStatementToLineOfBlocksList from "../addStatementToLineOfBlocksList.js";
import StatementType from "./StatementType.js";

const addLabelStatementToLineOfBlocksList = (lineOfBlocksList, statement, row, lineLevel) => {
    const blocks = [];
    blocks.push(
        new Block(BlockType.LABEL, statement.label, statement.label, row[0])
    );
    blocks.push(
        new Block(BlockType.LABEL_ASSIGN, ':', ':', row[0])
    );
    lineOfBlocksList.push(
        new LineOfBlocks(lineLevel[0], blocks)
    );
    row[0]++;
    switch (statement.body.type) {
        case StatementType.BLOCK_STATEMENT:
            addStatementToLineOfBlocksList(lineOfBlocksList, statement.body, row, lineLevel);
            break;
        default:
            lineLevel[0]++;
            addStatementToLineOfBlocksList(lineOfBlocksList, statement.body, row, lineLevel);
            lineLevel[0]--;
            break;
    }
}
export default addLabelStatementToLineOfBlocksList;