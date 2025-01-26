import addExpressionToBlocks from "../addExpressionToBlocks.js";
import Line from "../../ProjectObject/Line.js";
import StatementType from "./StatementType.js";

const addExpressionStatementToLineOfBlocksList = (lineOfBlocksList, statement, row, lineLevel) => {
    const blocks = [];
    addExpressionToBlocks(blocks, statement.expression)
    lineOfBlocksList.push(
        new Line(row[0], lineLevel[0], blocks, StatementType.EXPRESSION_STATEMENT)
    );
}
export default addExpressionStatementToLineOfBlocksList;