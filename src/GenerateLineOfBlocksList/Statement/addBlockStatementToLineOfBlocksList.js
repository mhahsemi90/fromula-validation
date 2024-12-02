import addStatementToLineOfBlocksList from "../addStatementToLineOfBlocksList.js";

const addBlockStatementToLineOfBlocksList = (lineOfBlocksList, statement, row, lineLevel) => {
    statement.bodyList.forEach((statement) => {
        addStatementToLineOfBlocksList(lineOfBlocksList, statement, row, lineLevel)
        row[0]++;
    });
}
export default addBlockStatementToLineOfBlocksList;