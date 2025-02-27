import BlockOfLines from "./BlockOfLines.js";

class ForBlockOfLines extends BlockOfLines {
    constructor(lineType, parentList, topRow, bottomRow, loopVar, loopBody) {
        super(lineType, parentList, topRow, bottomRow);
        this.loopVar = loopVar;
        this.loopBody = loopBody;
    }
}

export default ForBlockOfLines;