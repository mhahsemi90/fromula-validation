import Line from "./Line.js";
import LineType from "../CommonCode/LineType.js";

class ChangeValueLine extends Line {
    constructor(row, lineLevel, blockList, id, parentId, assignmentOperator, resultVar) {
        super(row, lineLevel, blockList, LineType.CHANGE_VALUE_STATEMENT, id, parentId);
        this.assignmentOperator = assignmentOperator;
        this.resultVar = resultVar;
    }
}

export default ChangeValueLine;