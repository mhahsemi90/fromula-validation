import StatementType from "../../../GenerateLineOfBlocksListFromStatementList/Statement/StatementType.js";

const generateScript = (linesOfBlocks) => {
    const allCharacters = [];
    let lineLevel = 0;
    linesOfBlocks.forEach((line) => {
        if (line.lineLevel > lineLevel) {
            for (let i = lineLevel; i < line.lineLevel; i++) {
                for (let j = 0; j < i; j++) {
                    allCharacters.push('\t');
                }
                allCharacters.push('{');
                allCharacters.push('\n');
            }
            lineLevel = line.lineLevel;
        }
        for (let i = 0; i < line.lineLevel; i++) {
            allCharacters.push('\t');
        }
        if (line.statementType === StatementType.IF_STATEMENT) {
            allCharacters.push('if(');
        }
        if (line.statementType === StatementType.FOR_STATEMENT) {
            allCharacters.push('for(');
        }
        if (line.lineLevel < lineLevel) {
            for (let i = lineLevel; i > line.lineLevel; i--) {
                for (let j = 1; j < i; j++) {
                    allCharacters.push('\t');
                }
                allCharacters.push('}');
                allCharacters.push('\n');
            }
            lineLevel = line.lineLevel;
        }
        line.blockList.forEach(block => {
            allCharacters.push(block.code);
            allCharacters.push(' ');
        })
        allCharacters.pop();
        if (line.statementType === StatementType.IF_STATEMENT ||
            line.statementType === StatementType.FOR_STATEMENT) {
            allCharacters.push(')');
        }
        if (line.statementType === StatementType.EXPRESSION_STATEMENT)
            allCharacters.push(';');
        allCharacters.push('\n');
    })
    if (lineLevel > 0) {
        for (let i = lineLevel; i > 0; i--) {
            for (let j = 0; j < i - 1; j++) {
                allCharacters.push('\t');
            }
            allCharacters.push('}');
            allCharacters.push('\n');
        }
    }
    return allCharacters;
}
export default generateScript;