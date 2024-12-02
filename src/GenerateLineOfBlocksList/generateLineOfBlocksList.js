import addStatementToLineOfBlocksList from "./addStatementToLineOfBlocksList.js";

const generateLineOfBlocksList = (data) => {
    const lineOfBlocksList = [];
    let lineLevel = [0];
    let row = [0];
    data.forEach((statement) => {
        addStatementToLineOfBlocksList(lineOfBlocksList, statement, row, lineLevel)
        row[0]++;
    });
    console.log(lineOfBlocksList);
    return lineOfBlocksList;
}
export default generateLineOfBlocksList;