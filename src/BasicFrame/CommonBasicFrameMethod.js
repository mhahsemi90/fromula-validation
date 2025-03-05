import LineType from "../CommonCode/LineType.js";
import ExpressionBlockOfLines from "../ProjectObject/ExpressionBlockOfLines.js";
import IfBlockOfLines from "../ProjectObject/IfBlockOfLines.js";
import ForBlockOfLines from "../ProjectObject/ForBlockOfLines.js";

const reformatLineRow = (linesOfBlocks) => {
    for (let i = 0; i < linesOfBlocks.length; i++) {
        linesOfBlocks[i].row = i;
    }
}

const highlightParentAndChild = (line, linesOfBlocks, setHoverBlockIdList) => {
    line && line.lineType && setHoverBlockIdList(
        getAllChildRowList(line, linesOfBlocks)
    );
};
const clickForSelectBlockToEdit = (line, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList, setHoverBlockIdList, setOpen) => {
    if (line && (line.id || line.id === 0)) {
        selectBlockToEdit(line, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList)
        setHoverBlockIdList([]);
    } else if (setOpen) {
        setOpen(true);
    }
};
const highlightChild = (line, linesOfBlocks, setHoverBlockIdList) => {
    setHoverBlockIdList([line.id]);
};
const handleClickForEditLine = (setOpen, setHoverBlockIdList) => {
    setOpen(true);
    setHoverBlockIdList([]);
};
const getAllChildRowList = (line, linesOfBlocks) => {
    const allChildRowList = []
    const allLine = []
    allLine.push(line)
    while (allLine.length > 0) {
        const line = allLine.pop();
        allChildRowList.push(line.row);
        linesOfBlocks.forEach((l) => {
            if (l.parentId === line.id)
                allLine.push(l);
        });
    }
    return allChildRowList;
}

const selectBlockToEdit = (line, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList) => {
    const blockToEdit = getBlockFromLine(line, [...linesOfBlocks]);
    setBlockToEdit(blockToEdit);
    if (line.lineType === LineType.ELSE_STATEMENT)
        setActiveLineToEditIdList(fillActiveLineToEditIdListFromLine(blockToEdit.test, linesOfBlocks));
    else
        setActiveLineToEditIdList(fillActiveLineToEditIdListFromLine(line, linesOfBlocks));
}

const getLastIdFromList = (linesOfBlocks) => {
    let lastId = -1;
    linesOfBlocks && linesOfBlocks.forEach((l) => {
        if (lastId < l.id) {
            lastId = l.id
        }
    })
    return lastId;
};

const getBlockFromLine = (line, linesOfBlocks) => {
    if (line.lineType === LineType.EXPRESSION_STATEMENT ||
        line.lineType === LineType.CHANGE_VALUE_STATEMENT ||
        line.lineType === LineType.RETURN_STATEMENT)
        return new ExpressionBlockOfLines(
            line.lineType,
            getParentList(line, linesOfBlocks),
            line.row,
            line.row,
            {...line}
        );
    if (line.lineType === LineType.IF_STATEMENT ||
        line.lineType === LineType.ELSE_IF_STATEMENT)
        return new IfBlockOfLines(
            LineType.IF_STATEMENT,
            getParentList(line, linesOfBlocks),
            line.row,
            getBottomRow(line, linesOfBlocks),
            {...line},
            {...linesOfBlocks[line.row + 1]},
            {...getElseByParentId(line.id, linesOfBlocks)}
        );
    if (line.lineType === LineType.FOR_STATEMENT)
        return new ForBlockOfLines(
            line.lineType,
            getParentList(line, linesOfBlocks),
            line.row,
            getBottomRow(line, linesOfBlocks),
            {...line},
            {...linesOfBlocks[line.row + 1]}
        );
    if (line.lineType === LineType.ELSE_STATEMENT) {
        const parentLine = getLineFromList(line.parentId, linesOfBlocks);
        return new IfBlockOfLines(
            parentLine.lineType,
            getParentList(parentLine, linesOfBlocks),
            parentLine.row,
            getBottomRow(parentLine, linesOfBlocks),
            {...parentLine},
            {...linesOfBlocks[parentLine.row + 1]},
            {...line}
        );
    }
}

const fillActiveLineToEditIdListFromLine = (line, linesOfBlocks) => {
    return getAllChildRowList(line, linesOfBlocks);
}

const getParentList = (line, linesOfBlocks) => {
    const parentList = []
    fillParentList(parentList, line, linesOfBlocks);
    return parentList;
}

const fillParentList = (parentList, line, linesOfBlocks) => {
    const parentLine = getLineFromList(line.parentId, linesOfBlocks);
    if (parentLine) {
        if (parentLine.parentId || parentLine.parentId === 0)
            fillParentList(parentList, parentLine, linesOfBlocks);
        parentList.push(parentLine);
    }
};

const getBottomRow = (line, linesOfBlocks) => {
    const allChildRowList = getAllChildRowList(line, linesOfBlocks);
    let bottomRow = line.row;
    allChildRowList.forEach((r) => {
        if (bottomRow < r) {
            bottomRow = r
        }
    })
    return bottomRow;
};

function getElseByParentId(lineId, linesOfBlocks) {
    for (let lineOfBlock of linesOfBlocks) {
        if ((lineOfBlock.lineType === LineType.ELSE_STATEMENT ||
                lineOfBlock.lineType === LineType.ELSE_IF_STATEMENT)
            && lineOfBlock.parentId === lineId) {
            return lineOfBlock;
        }
    }
    return null;
}

const getLineFromList = (lineId, linesOfBlocks) => {
    for (let lineOfBlock of linesOfBlocks) {
        if (lineOfBlock.id === lineId) {
            return lineOfBlock;
        }
    }
    return null;
};

export {
    getAllChildRowList,
    selectBlockToEdit,
    getLastIdFromList,
    highlightParentAndChild,
    highlightChild,
    clickForSelectBlockToEdit,
    handleClickForEditLine,
    getBlockFromLine,
    reformatLineRow,
}