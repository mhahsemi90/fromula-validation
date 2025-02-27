import BlockOfLines from "./BlockOfLines.js";

class ExpressionBlockOfLines extends BlockOfLines {
    constructor(lineType, parentList, topRow, bottomRow, body) {
        super(lineType, parentList, topRow, bottomRow);
        this.body = body;
    }
}

export default ExpressionBlockOfLines;