import addExpressionToBlocks from "../addExpressionToBlocks.js";
import Line from "../../ProjectObject/Line.js";

const addExpressionStatementToLineOfBlocksList = (lineOfBlocksList, statement, row, lineLevel) => {
    const blocks = [];
    addExpressionToBlocks(blocks, statement.expression)
    lineOfBlocksList.push(
        new Line(row[0],lineLevel[0], blocks)
    );
}
export default addExpressionStatementToLineOfBlocksList;