import Block from "../../ProjectObject/Block.js";
import BlockType from "../../ViewBlock/BlockType.js";
import Line from "../../ProjectObject/Line.js";
import addStatementToLineOfBlocksList from "../addStatementToLineOfBlocksList.js";
import StatementType from "./StatementType.js";

const addLabelStatementToLineOfBlocksList = (lineOfBlocksList, statement, row, lineLevel) => {
    const blocks = [];
    blocks.push(
        new Block(BlockType.LABEL, statement.label, statement.label)
    );
    blocks.push(
        new Block(BlockType.LABEL_ASSIGN, ':', ':')
    );
    lineOfBlocksList.push(
        new Line(row[0],lineLevel[0], blocks)
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