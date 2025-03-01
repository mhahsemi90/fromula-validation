import Block from "../../../ProjectObject/Block.js";
import BlockType from "../../BlockType.js";
import Line from "../../../ProjectObject/Line.js";
import addStatementToLineOfBlocksList from "../addStatementToLineOfBlocksList.js";
import LineType from "../../LineType.js";
import { getOperatorFromMainList} from "../../getElementFromMainList.js";

const addLabelStatementToLineOfBlocksList = (lineOfBlocksList, statement, row, lineLevel, id, parentIdStack) => {
    const blocks = [];
    const operand = getOperandFromMainList(statement.label);
    const operator = getOperatorFromMainList(':');
    const parentId = parentIdStack.length > 0 ? parentIdStack[0] : null;
    blocks.push(
        new Block(BlockType.LABEL, operand.title, operand.enTitle, operand.code)
    );
    blocks.push(
        new Block(BlockType.LABEL_ASSIGN, operator.title, operator.code, operator.code)
    );
    parentIdStack.unshift(id[0]);
    lineOfBlocksList.push(
        new Line(row[0], lineLevel[0], blocks, LineType.LABEL_STATEMENT, id[0]++, parentId)
    );
    row[0]++;
    switch (statement.body.type) {
        case LineType.BLOCK_STATEMENT:
            addStatementToLineOfBlocksList(lineOfBlocksList, statement.body, row, lineLevel, id, parentIdStack);
            break;
        default:
            lineLevel[0]++;
            addStatementToLineOfBlocksList(lineOfBlocksList, statement.body, row, lineLevel, id, parentIdStack);
            lineLevel[0]--;
            break;
    }
    parentIdStack.shift();
}
export default addLabelStatementToLineOfBlocksList;