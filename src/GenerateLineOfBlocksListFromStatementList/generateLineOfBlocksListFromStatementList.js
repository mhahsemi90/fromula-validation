import addStatementToLineOfBlocksList from "./addStatementToLineOfBlocksList.js";

const generateLineOfBlocksListFromStatementList = (data) => {
    const lineOfBlocksList = [];
    let lineLevel = [0];
    let row = [0];
    data.forEach((statement) => {
        addStatementToLineOfBlocksList(lineOfBlocksList, statement, row, lineLevel)
        row[0]++;
    });
    return lineOfBlocksList;
}
export default generateLineOfBlocksListFromStatementList;