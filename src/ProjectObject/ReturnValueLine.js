import Line from "./Line.js";
import LineType from "../CommonCode/LineType.js";

class ReturnValueLine extends Line {
    constructor(row, lineLevel, blockList, id, parentId) {
        super(row, lineLevel, blockList, LineType.RETURN_STATEMENT, id, parentId)
    }
}

export default ReturnValueLine;