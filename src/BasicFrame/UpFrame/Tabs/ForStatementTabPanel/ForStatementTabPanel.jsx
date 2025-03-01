import {Paper} from "@mui/material";
import {useContext, useEffect, useId, useState} from "react";
import {BasicFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import generateLine from "../../../../CommonCode/GenerateLine/generateLine.jsx";
import ParentBox from "../ParentBox/ParentBox.jsx";
import ConfirmBox from "../ConfirmBox/ConfirmBox.jsx";
import LoopVarBox from "./LoopVarBox.jsx";
import LoopBodyBox from "./LoopBodyBox.jsx";
import ExpressionBlockOfLines from "../../../../ProjectObject/ExpressionBlockOfLines.js";
import Line from "../../../../ProjectObject/Line.js";
import LineType from "../../../../CommonCode/LineType.js";
import {getLastIdFromList, reformatLineRow} from "../../../CommonBasicFrameMethod.js";
import ChangeValueLine from "../../../../ProjectObject/ChangeValueLine.js";
import generateBlock from "../../../../CommonCode/GenerateLine/generateBlock.jsx";

const clearLineById = (linesOfBlocks, id) => {
    const newLinesOfBlocks = [];
    linesOfBlocks.forEach((l) => {
        if (l.id === id) {
            l.blockList = [];
            l.lineType = LineType.EXPRESSION_STATEMENT;
            newLinesOfBlocks.push(l);
        } else {
            newLinesOfBlocks.push(l);
        }
    });
    return newLinesOfBlocks;
};
const deleteAllLineInFamily = (linesOfBlocks, id) => {
    const newLinesOfBlocks = [];
    const allRemovingIdList = [];
    allRemovingIdList.push(id);
    linesOfBlocks.forEach((l) => {
        if (!l.parentId || allRemovingIdList.indexOf(l.parentId) < 0)
            newLinesOfBlocks.push(l);
        else
            allRemovingIdList.push(l.id);
    });
    return newLinesOfBlocks;
};
const saveChange = (linesOfBlocks, setLinesOfBlocks, blockToEdit, loopVarToEdit, loopBodyEditLine) => {
    let newLinesOfBlocks = [];
    let lineToEdit = loopVarToEdit;
    if (lineToEdit.row === 0 || lineToEdit.row) {
        linesOfBlocks.forEach((l, i) => {
            if (i === lineToEdit.row) {
                newLinesOfBlocks.push(lineToEdit);
                if (!blockToEdit.loopBody.id) {
                    const loopBodyLine = new ChangeValueLine(
                        lineToEdit.row,
                        lineToEdit.lineLevel + 1,
                        [],
                        getLastIdFromList(linesOfBlocks) + 1,
                        lineToEdit.id,
                        {},
                        {}
                    );
                    newLinesOfBlocks.push(loopBodyLine);
                }
            } else {
                newLinesOfBlocks.push(l);
            }
        });
        if (loopBodyEditLine.length === 0 && blockToEdit.loopBody.id) {
            newLinesOfBlocks = clearLineById(newLinesOfBlocks, blockToEdit.loopBody.id);
            newLinesOfBlocks = deleteAllLineInFamily(newLinesOfBlocks, blockToEdit.loopBody.id);
        }
    } else {
        lineToEdit.row = linesOfBlocks.length;
        lineToEdit.lineLevel = 0;
        if (!lineToEdit.blockList)
            lineToEdit.blockList = [];
        lineToEdit.id = getLastIdFromList(linesOfBlocks) + 1;
        const loopBodyLine = new ChangeValueLine(
            lineToEdit.row + 1,
            lineToEdit.lineLevel + 1,
            [],
            lineToEdit.id + 1,
            lineToEdit.id,
            {},
            {},
        );
        newLinesOfBlocks.push(...linesOfBlocks);
        newLinesOfBlocks.push(lineToEdit);
        newLinesOfBlocks.push(loopBodyLine);
    }
    reformatLineRow(newLinesOfBlocks);
    setLinesOfBlocks(newLinesOfBlocks);
    return {lineToEdit, linesOfBlocks: newLinesOfBlocks};
}
const acceptChange = (linesOfBlocks, setLinesOfBlocks, blockToEdit, setBlockToEdit, setActiveLineToEditIdList, testLineToEdit, consequentEditLine, alternateEditLine) => {
    saveChange(linesOfBlocks, setLinesOfBlocks, blockToEdit, testLineToEdit, consequentEditLine, alternateEditLine);
    clearChange(setBlockToEdit, setActiveLineToEditIdList);
};
const clearChange = (setBlockToEdit, setActiveLineToEditIdList) => {
    setBlockToEdit(new ExpressionBlockOfLines());
    setActiveLineToEditIdList([]);
};
const ForStatementTabPanel = () => {
    const {linesOfBlocks, setLinesOfBlocks, getOperandFromMainList} = useContext(MainFrameContext);
    const {blockToEdit, setBlockToEdit, setActiveLineToEditIdList} = useContext(BasicFrameContext);
    const [loopVarToEdit, setLoopVarToEdit] = useState(new Line());
    const [loopBodyEditLine, setLoopBodyEditLine] = useState([]);
    const id = useId()
    useEffect(() => {
        const loopVar = blockToEdit.loopVar ? blockToEdit.loopVar : new Line();
        if (!loopVar.lineType) loopVar.lineType = LineType.FOR_STATEMENT;
        setLoopVarToEdit(loopVar);
        blockToEdit.loopBody && blockToEdit.loopBody.blockList ? setLoopBodyEditLine(
            generateLine(blockToEdit.loopBody, getOperandFromMainList).map((block, index) =>
                    generateBlock(block, `${id}-${index}`)
                /*<GenerateBlock block={block} key={`${id}-${index}`}/>*/
            )
        ) : setLoopBodyEditLine([]);
    }, [blockToEdit, getOperandFromMainList, id]);
    return (
        <div
            style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    padding: '5px',
                    margin: '5px',
                }}
            >
                <ParentBox
                    acceptChange={() => acceptChange(
                        linesOfBlocks,
                        setLinesOfBlocks,
                        blockToEdit,
                        setBlockToEdit,
                        setActiveLineToEditIdList,
                        loopVarToEdit,
                        loopBodyEditLine)}
                />
                <LoopVarBox
                    loopVarToEdit={loopVarToEdit}
                    setLoopVarToEdit={setLoopVarToEdit}
                />
                <LoopBodyBox
                    loopBodyEditLine={loopBodyEditLine}
                    setLoopBodyEditLine={setLoopBodyEditLine}
                    saveChange={() => saveChange(linesOfBlocks, setLinesOfBlocks, blockToEdit, loopVarToEdit, loopBodyEditLine)}
                />
                <ConfirmBox
                    acceptChange={() => acceptChange(
                        linesOfBlocks,
                        setLinesOfBlocks,
                        blockToEdit,
                        setBlockToEdit,
                        setActiveLineToEditIdList,
                        loopVarToEdit,
                        loopBodyEditLine)}
                    cancelChange={() => clearChange(setBlockToEdit, setActiveLineToEditIdList)}
                />
            </Paper>
        </div>
    );
}
export default ForStatementTabPanel;