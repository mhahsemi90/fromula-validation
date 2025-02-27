import addStatementToLineOfBlocksList from "./addStatementToLineOfBlocksList.js";

const generateLineOfBlocksListFromStatementList = (data) => {
    const lineOfBlocksList = [];
    const lineLevel = [0];
    const row = [0];
    const id = [0];
    const parentIdStack = [];
    data.forEach((statement) => {
        addStatementToLineOfBlocksList(lineOfBlocksList, statement, row, lineLevel, id, parentIdStack)
        row[0]++;
    });
    return lineOfBlocksList;
}
export default generateLineOfBlocksListFromStatementList;