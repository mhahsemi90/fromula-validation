class Line {
    constructor(row, lineLevel, blockList, statementType) {
        this.row = row;
        this.lineLevel = lineLevel;
        this.blockList = blockList;
        this.statementType = statementType;
    }
}

export default Line;