import addStatementToLineOfBlocksList from "../addStatementToLineOfBlocksList.js";

const addBlockStatementToLineOfBlocksList = (lineOfBlocksList, statement, row, lineLevel,id,parentIdStack) => {
    statement.bodyList.forEach((statement) => {
        addStatementToLineOfBlocksList(lineOfBlocksList, statement, row, lineLevel,id,parentIdStack)
        row[0]++;
    });
}
export default addBlockStatementToLineOfBlocksList;