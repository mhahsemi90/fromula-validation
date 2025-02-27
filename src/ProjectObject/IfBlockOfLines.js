import BlockOfLines from "./BlockOfLines.js";

class IfBlockOfLines extends BlockOfLines {
    constructor(lineType, parentList, topRow, bottomRow, test, consequent, alternate) {
        super(lineType, parentList, topRow, bottomRow);
        this.test = test;
        this.consequent = consequent;
        this.alternate = alternate;
    }
}

export default IfBlockOfLines;