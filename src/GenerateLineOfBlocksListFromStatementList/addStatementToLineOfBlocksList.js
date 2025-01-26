import StatementType from "./Statement/StatementType.js";
import addVariableDeclarationStatementToLineOfBlocksList
    from "./Statement/addVariableDeclarationStatementToLineOfBlocksList.js";
import addBlockStatementToLineOfBlocksList from "./Statement/addBlockStatementToLineOfBlocksList.js";
import addLabelStatementToLineOfBlocksList from "./Statement/addLabelStatementToLineOfBlocksList.js";
import addIfStatementToLineOfBlocksList from "./Statement/addIfStatementToLineOfBlocksList.js";
import addExpressionStatementToLineOfBlocksList from "./Statement/addExpressionStatementToLineOfBlocksList.js";

const addStatementToLineOfBlocksList = (lineOfBlocksList, statement, row, lineLevel) => {
    switch (statement.type) {
        case StatementType.EXPRESSION_STATEMENT:
            addExpressionStatementToLineOfBlocksList(lineOfBlocksList, statement, row, lineLevel);
            break;
        case StatementType.BLOCK_STATEMENT:
            lineLevel[0]++;
            addBlockStatementToLineOfBlocksList(lineOfBlocksList, statement, row, lineLevel);
            lineLevel[0]--;
            row[0]--;
            break;
        case StatementType.VARIABLE_DECLARATION_STATEMENT:
            addVariableDeclarationStatementToLineOfBlocksList(lineOfBlocksList, statement, row, lineLevel);
            break;
        case StatementType.IF_STATEMENT:
            addIfStatementToLineOfBlocksList(lineOfBlocksList, statement, row, lineLevel);
            break;
        case StatementType.LABEL_STATEMENT:
            addLabelStatementToLineOfBlocksList(lineOfBlocksList, statement, row, lineLevel);
            break;
    }

}
export default addStatementToLineOfBlocksList;