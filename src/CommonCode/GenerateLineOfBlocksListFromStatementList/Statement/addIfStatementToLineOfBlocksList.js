import LineType from "../../LineType.js";
import Line from "../../../ProjectObject/Line.js";
import addExpressionToBlocks from "../addExpressionToBlocks.js";
import addStatementToLineOfBlocksList from "../addStatementToLineOfBlocksList.js";

const addIfStatementToLineOfBlocksList = (lineOfBlocksList, statement, row, lineLevel, id, parentIdStack) => {
    const blocks = [];
    let type = LineType.IF_STATEMENT;
    const parentId = parentIdStack.length > 0 ? parentIdStack[0] : null;
    if (statement.test)
        addExpressionToBlocks(blocks, statement.test)
    if (lineOfBlocksList.length && lineOfBlocksList[lineOfBlocksList.length - 1].lineType === LineType.ELSE_STATEMENT) {
        lineOfBlocksList[lineOfBlocksList.length - 1].lineType = LineType.ELSE_IF_STATEMENT;
        lineOfBlocksList[lineOfBlocksList.length - 1].blockList = blocks;
        row[0]--;
    }else{
        parentIdStack.unshift(id[0]);
        lineOfBlocksList.push(
            new Line(row[0], lineLevel[0], blocks, type, id[0]++, parentId)
        );
    }
    if (statement.consequent) {
        row[0]++;
        switch (statement.consequent.type) {
            case LineType.BLOCK_STATEMENT:
                addStatementToLineOfBlocksList(lineOfBlocksList, statement.consequent, row, lineLevel, id, parentIdStack);
                break;
            default:
                lineLevel[0]++;
                addStatementToLineOfBlocksList(lineOfBlocksList, statement.consequent, row, lineLevel, id, parentIdStack);
                lineLevel[0]--;
                break;
        }
    }
    if (statement.alternate) {
        row[0]++;
        const blocks = [];
        const parentId = parentIdStack.length > 0 ? parentIdStack[0] : null;
        parentIdStack.unshift(id[0]);
        lineOfBlocksList.push(
            new Line(row[0], lineLevel[0], blocks, LineType.ELSE_STATEMENT, id[0]++, parentId)
        );
        row[0]++;
        switch (statement.alternate.type) {
            case LineType.BLOCK_STATEMENT:
                addStatementToLineOfBlocksList(lineOfBlocksList, statement.alternate, row, lineLevel, id, parentIdStack);
                break;
            case LineType.IF_STATEMENT:
                addStatementToLineOfBlocksList(lineOfBlocksList, statement.alternate, row, lineLevel, id, parentIdStack);
                break;
            default:
                lineLevel[0]++;
                addStatementToLineOfBlocksList(lineOfBlocksList, statement.alternate, row, lineLevel, id, parentIdStack);
                lineLevel[0]--;
                break;
        }
        parentIdStack.shift();
    }
    parentIdStack.shift();
}
export default addIfStatementToLineOfBlocksList;