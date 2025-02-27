import LineType from "../LineType.js";
import addVariableDeclarationStatementToLineOfBlocksList
    from "./Statement/addVariableDeclarationStatementToLineOfBlocksList.js";
import addBlockStatementToLineOfBlocksList from "./Statement/addBlockStatementToLineOfBlocksList.js";
import addLabelStatementToLineOfBlocksList from "./Statement/addLabelStatementToLineOfBlocksList.js";
import addIfStatementToLineOfBlocksList from "./Statement/addIfStatementToLineOfBlocksList.js";
import addExpressionStatementToLineOfBlocksList from "./Statement/addExpressionStatementToLineOfBlocksList.js";
import addReturnStatementToLineOfBlocksList from "./Statement/addReturnStatementToLineOfBlocksList.js";

const addStatementToLineOfBlocksList = (lineOfBlocksList, statement, row, lineLevel, id, parentIdStack) => {
    switch (statement.type) {
        case LineType.EXPRESSION_STATEMENT:
            addExpressionStatementToLineOfBlocksList(lineOfBlocksList, statement, row, lineLevel, id, parentIdStack);
            break;
        case LineType.BLOCK_STATEMENT:
            lineLevel[0]++;
            addBlockStatementToLineOfBlocksList(lineOfBlocksList, statement, row, lineLevel, id, parentIdStack);
            lineLevel[0]--;
            row[0]--;
            break;
        case LineType.VARIABLE_DECLARATION_STATEMENT:
            addVariableDeclarationStatementToLineOfBlocksList(lineOfBlocksList, statement, row, lineLevel, id, parentIdStack);
            break;
        case LineType.IF_STATEMENT:
            addIfStatementToLineOfBlocksList(lineOfBlocksList, statement, row, lineLevel, id, parentIdStack);
            break;
        case LineType.LABEL_STATEMENT:
            addLabelStatementToLineOfBlocksList(lineOfBlocksList, statement, row, lineLevel, id, parentIdStack);
            break;
        case LineType.RETURN_STATEMENT:
            addReturnStatementToLineOfBlocksList(lineOfBlocksList, statement, row, lineLevel, id, parentIdStack);
            break;
    }

}
export default addStatementToLineOfBlocksList;