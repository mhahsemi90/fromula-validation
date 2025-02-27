import Line from "../../../../ProjectObject/Line.js";
import LineType from "../../../../CommonCode/LineType.js";

const handleAddBefore = (line, linesOfBlocks, setLinesOfBlocks, activeLineToEditRow, setActiveLineToEditRow) => {
    const row = line.row;
    const newLinesOfBlocks = [
        ...linesOfBlocks.slice(0, line.row),
        new Line(line.row, line.lineLevel, [], LineType.EXPRESSION_STATEMENT, line.id, line.parentId),
        ...linesOfBlocks.slice(line.row)
    ];
    for (let i = 0; i < newLinesOfBlocks.length; i++) {
        newLinesOfBlocks[i].row = i;
    }
    setLinesOfBlocks(newLinesOfBlocks);
    if (activeLineToEditRow >= row) {
        console.log("change Active Index before");
        setActiveLineToEditRow(activeLineToEditRow + 1);
    }
};

const handleAddAfter = (line, linesOfBlocks, setLinesOfBlocks, activeLineToEditRow, setActiveLineToEditRow) => {
    const row = line.row;
    if (line.row === linesOfBlocks.length - 1) {
        const newLinesOfBlocks = [
            ...linesOfBlocks,
            new Line(line.row, line.lineLevel, [], LineType.EXPRESSION_STATEMENT, line.id, line.parentId)
        ];
        for (let i = 0; i < newLinesOfBlocks.length; i++) {
            newLinesOfBlocks[i].row = i;
        }
        setLinesOfBlocks(newLinesOfBlocks);
    } else {
        const newLinesOfBlocks = [
            ...linesOfBlocks.slice(0, line.row + 1),
            new Line(line.row, line.lineLevel, [], LineType.EXPRESSION_STATEMENT, line.id, line.parentId),
            ...linesOfBlocks.slice(line.row + 1)
        ];
        for (let i = 0; i < newLinesOfBlocks.length; i++) {
            newLinesOfBlocks[i].row = i;
        }
        setLinesOfBlocks(newLinesOfBlocks);
    }
    if (activeLineToEditRow > row) {
        console.log("change Active Index after");
        setActiveLineToEditRow(activeLineToEditRow + 1);
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
const handleDelete = (line, linesOfBlocks, setLinesOfBlocks, setLineToEdit, setType, setBlinkIndex, activeLineToEditRow, setActiveLineToEditRow) => {
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
    if (activeLineToEditRow === row) {
        setLineToEdit(new Line());
        setBlinkIndex(-1);
    }
    if (activeLineToEditRow > row)
        setActiveLineToEditRow(activeLineToEditRow - 1);
    else if (activeLineToEditRow === row)
        setActiveLineToEditRow(-1);
};
export {handleDelete, handleAddBefore, handleAddAfter, handleChangeLevel}