import Line from "./Line.js";
import LineType from "../CommonCode/LineType.js";

class ExpressionLine extends Line {
    constructor(row, lineLevel, blockList, id, parentId) {
        super(row, lineLevel, blockList, LineType.EXPRESSION_STATEMENT, id, parentId)
    }
}

export default ExpressionLine;