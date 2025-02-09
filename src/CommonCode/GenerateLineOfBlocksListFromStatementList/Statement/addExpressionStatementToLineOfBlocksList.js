import addExpressionToBlocks from "../addExpressionToBlocks.js";
import Line from "../../../ProjectObject/Line.js";
import LineType from "../../LineType.js";

const addExpressionStatementToLineOfBlocksList = (lineOfBlocksList, statement, row, lineLevel, id, parentIdStack) => {
    const blocks = [];
    const parentId = parentIdStack.length > 0 ? parentIdStack[0] : null;
    addExpressionToBlocks(blocks, statement.expression)
    lineOfBlocksList.push(
        new Line(row[0], lineLevel[0], blocks, LineType.EXPRESSION_STATEMENT,id[0]++, parentId)
    );
}
export default addExpressionStatementToLineOfBlocksList;