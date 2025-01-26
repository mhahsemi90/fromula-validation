import Block from "../../ProjectObject/Block.js";
import BlockType from "../BlockType.js";
import Line from "../../ProjectObject/Line.js";
import addStatementToLineOfBlocksList from "../addStatementToLineOfBlocksList.js";
import StatementType from "./StatementType.js";
import {getOperandFromMainList, getOperatorFromMainList} from "../../IntermediateFrame/getElementFromMainList.js";

const addLabelStatementToLineOfBlocksList = (lineOfBlocksList, statement, row, lineLevel) => {
    const blocks = [];
    const operand = getOperandFromMainList(statement.label);
    const operator = getOperatorFromMainList(':');
    blocks.push(
        new Block(BlockType.LABEL,operand.title,operand.enTitle,operand.code)
    );
    blocks.push(
        new Block(BlockType.LABEL_ASSIGN, operator.title,operator.code,operator.code)
    );
    lineOfBlocksList.push(
        new Line(row[0], lineLevel[0], blocks, StatementType.LABEL_STATEMENT)
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