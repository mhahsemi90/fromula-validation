import Line from "../../../../ProjectObject/Line.js";
import StatementType from "../../../../GenerateLineOfBlocksListFromStatementList/Statement/StatementType.js";

const handleAddBefore = (line, linesOfBlocks, setLinesOfBlocks, activeLineIndex, setActiveLineIndex) => {
    const row = line.row;
    const newLinesOfBlocks = [
        ...linesOfBlocks.slice(0, line.row),
        new Line(line.row, line.lineLevel, [], StatementType.EXPRESSION_STATEMENT),
        ...linesOfBlocks.slice(line.row)
    ];
    for (let i = 0; i < newLinesOfBlocks.length; i++) {
        newLinesOfBlocks[i].row = i;
    }
    setLinesOfBlocks(newLinesOfBlocks);
    if (activeLineIndex >= row) {
        console.log("change Active Index before");
        setActiveLineIndex(activeLineIndex + 1);
    }
};

const handleAddAfter = (line, linesOfBlocks, setLinesOfBlocks, activeLineIndex, setActiveLineIndex) => {
    const row = line.row;
    if (line.row === linesOfBlocks.length - 1) {
        const newLinesOfBlocks = [
            ...linesOfBlocks,
            new Line(line.row, line.lineLevel, [], StatementType.EXPRESSION_STATEMENT)
        ];
        for (let i = 0; i < newLinesOfBlocks.length; i++) {
            newLinesOfBlocks[i].row = i;
        }
        setLinesOfBlocks(newLinesOfBlocks);
    } else {
        const newLinesOfBlocks = [
            ...linesOfBlocks.slice(0, line.row + 1),
            new Line(line.row, line.lineLevel, [], StatementType.EXPRESSION_STATEMENT),
            ...linesOfBlocks.slice(line.row + 1)
        ];
        for (let i = 0; i < newLinesOfBlocks.length; i++) {
            newLinesOfBlocks[i].row = i;
        }
        setLinesOfBlocks(newLinesOfBlocks);
    }
    if (activeLineIndex > row) {
        console.log("change Active Index after");
        setActiveLineIndex(activeLineIndex + 1);
    }
};
const handleChangeLevel = (line, number, linesOfBlocks, setLinesOfBlocks) => {
    const level = line.lineLevel + number;
    if (level > -1) {
        linesOfBlocks[line.row].lineLevel = level;
        const newLinesOfBlocks = [...linesOfBlocks];
        setLinesOfBlocks(newLinesOfBlocks);
    }
};
const handleDelete = (line, linesOfBlocks, setLinesOfBlocks, setEditLine, setType, setBlinkIndex, activeLineIndex, setActiveLineIndex) => {
    const row = line.row;
    if (linesOfBlocks.length > 1) {
        linesOfBlocks.splice(line.row, 1);
        const newLinesOfBlocks = [...linesOfBlocks];
        for (let i = 0; i < newLinesOfBlocks.length; i++) {
            newLinesOfBlocks[i].row = i;
        }
        setLinesOfBlocks(newLinesOfBlocks);
    } else {
        setLinesOfBlocks([]);
    }
    if (activeLineIndex === row) {
        setEditLine(new Line(null, 0, [], StatementType.EXPRESSION_STATEMENT));
        setBlinkIndex(-1);
    }
    if (activeLineIndex > row)
        setActiveLineIndex(activeLineIndex - 1);
    else if (activeLineIndex === row)
        setActiveLineIndex(-1);
};
export {handleDelete, handleAddBefore, handleAddAfter, handleChangeLevel}