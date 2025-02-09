import LineType from "../LineType.js";

const getSameLevel = (linesOfBlocks, lineLevel) => {
    const newLineOfBlocks = [];
    while (linesOfBlocks.length > 0 && linesOfBlocks[0].lineLevel > lineLevel) {
        newLineOfBlocks.push(linesOfBlocks.shift());
    }
    return newLineOfBlocks;
};

const generateScriptLine = (line) => {
    const finalScriptList = [];
    if (line.lineType !== LineType.ELSE_STATEMENT &&
        line.lineType !== LineType.ELSE_IF_STATEMENT) {
        for (let j = 0; j < line.lineLevel; j++) {
            finalScriptList.push('\t');
        }
    }
    if (line.lineType === LineType.ELSE_STATEMENT) {
        finalScriptList.push('else');
    }
    if (line.lineType === LineType.IF_STATEMENT) {
        finalScriptList.push('if(');
    }
    if (line.lineType === LineType.ELSE_IF_STATEMENT) {
        finalScriptList.push('else if(');
    }
    if (line.lineType === LineType.FOR_STATEMENT) {
        finalScriptList.push('for(');
    }
    if (line.lineType === LineType.RETURN_STATEMENT) {
        finalScriptList.push('return ');
    }
    if (line.blockList.length > 0) {
        line.blockList.forEach(block => {
            finalScriptList.push(block.code);
            finalScriptList.push(' ');
        })
        finalScriptList.pop();
    }
    if (line.lineType === LineType.IF_STATEMENT ||
        line.lineType === LineType.ELSE_IF_STATEMENT ||
        line.lineType === LineType.FOR_STATEMENT) {
        finalScriptList.push(')');
    }
    if (line.lineType === LineType.EXPRESSION_STATEMENT ||
        line.lineType === LineType.RETURN_STATEMENT ||
        line.lineType === LineType.VARIABLE_DECLARATION_STATEMENT)
        finalScriptList.push(';');
    return finalScriptList;
};
const generateScript = async (lineLevel, linesOfBlocks) => {
    const finalScriptList = [];
    const innerLevel = linesOfBlocks && linesOfBlocks[0] && linesOfBlocks[0].lineType;
    while (linesOfBlocks && linesOfBlocks.length > 0) {
        const type = linesOfBlocks[0].lineType
        if (linesOfBlocks[0].lineLevel === lineLevel) {
            if (type === LineType.ELSE_STATEMENT ||
                type === LineType.ELSE_IF_STATEMENT) {
                finalScriptList.pop();
                finalScriptList.push(' ');
            }
            finalScriptList.push(...generateScriptLine(linesOfBlocks.shift()));
            if (type === LineType.EXPRESSION_STATEMENT ||
                type === LineType.RETURN_STATEMENT ||
                type === LineType.VARIABLE_DECLARATION_STATEMENT)
                finalScriptList.push('\n');
        } else {
            const newLineLevel = lineLevel + 1;
            if (innerLevel === LineType.EXPRESSION_STATEMENT ||
                type === LineType.RETURN_STATEMENT ||
                type === LineType.VARIABLE_DECLARATION_STATEMENT) {
                for (let j = 0; j < lineLevel; j++) {
                    finalScriptList.push('\t');
                }
            }
            finalScriptList.push(' {');
            finalScriptList.push('\n');
            finalScriptList.push(...await generateScript(newLineLevel, getSameLevel(linesOfBlocks, lineLevel)));
            for (let j = 0; j < lineLevel; j++) {
                finalScriptList.push('\t');
            }
            finalScriptList.push('}');
            finalScriptList.push('\n');
        }
    }
    return finalScriptList;
}
export default generateScript;