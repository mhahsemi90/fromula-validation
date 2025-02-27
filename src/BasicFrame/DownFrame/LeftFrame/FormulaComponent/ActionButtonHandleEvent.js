import Line from "../../../../ProjectObject/Line.js";
import LineType from "../../../../CommonCode/LineType.js";
import BlockOfLines from "../../../../ProjectObject/BlockOfLines.js";
import {getAllChildRowList, getBlockFromLine, getLastIdFromList} from "../../../CommonBasicFrameMethod.js";
import ExpressionLine from "../../../../ProjectObject/ExpressionLine.js";
import ReturnValueLine from "../../../../ProjectObject/ReturnValueLine.js";

const handleAddBefore = (line, linesOfBlocks, setLinesOfBlocks) => {
    const row = line.row;
    const lastId = getLastIdFromList(linesOfBlocks);
    const newLinesOfBlocks = [
        ...linesOfBlocks.slice(0, row),
        new ExpressionLine(row, line.lineLevel, [], lastId + 1, null),
        ...linesOfBlocks.slice(line.row)
    ];
    for (let i = 0; i < newLinesOfBlocks.length; i++) {
        newLinesOfBlocks[i].row = i;
    }
    setLinesOfBlocks(newLinesOfBlocks);
};

const handleAddAfter = (line, linesOfBlocks, setLinesOfBlocks) => {
    const blockFromLine = getBlockFromLine(line, linesOfBlocks);
    const row = blockFromLine.bottomRow;
    const lastId = getLastIdFromList(linesOfBlocks);
    if (row === linesOfBlocks.length - 1) {
        const newLinesOfBlocks = [
            ...linesOfBlocks,
            new ReturnValueLine(row, line.lineLevel, [], lastId + 1, null)
        ];
        for (let i = 0; i < newLinesOfBlocks.length; i++) {
            newLinesOfBlocks[i].row = i;
        }
        setLinesOfBlocks(newLinesOfBlocks);
    } else {
        const newLinesOfBlocks = [
            ...linesOfBlocks.slice(0, row + 1),
            new ReturnValueLine(row, line.lineLevel, [], lastId + 1, null),
            ...linesOfBlocks.slice(row + 1)
        ];
        for (let i = 0; i < newLinesOfBlocks.length; i++) {
            newLinesOfBlocks[i].row = i;
        }
        setLinesOfBlocks(newLinesOfBlocks);
    }
};

const handleDelete = (line, linesOfBlocks, setLinesOfBlocks, setBlockToEdit, activeLineToEditIdList, setActiveLineToEditIdList) => {
    const allChildRowList = getAllChildRowList(line, linesOfBlocks);
    const row = line.row;
    if (allChildRowList.length > 0) {
        const newLinesOfBlocks = [];
        linesOfBlocks.forEach((l) => {
            if (allChildRowList.indexOf(l.row) === -1)
                newLinesOfBlocks.push(l)
        })
        for (let i = 0; i < newLinesOfBlocks.length; i++) {
            newLinesOfBlocks[i].row = i;
        }
        setLinesOfBlocks(newLinesOfBlocks);
    } else {
        setLinesOfBlocks([]);
    }
    if (activeLineToEditIdList.indexOf(row) > -1) {
        setActiveLineToEditIdList([]);
        setBlockToEdit(new BlockOfLines());
    }
};
export {handleAddBefore, handleAddAfter, handleDelete}