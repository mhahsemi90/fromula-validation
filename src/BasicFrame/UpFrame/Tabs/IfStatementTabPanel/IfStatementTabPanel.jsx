import {Box, Paper} from "@mui/material";
import {useContext, useEffect, useId, useState} from "react";
import {BasicFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import generateLine from "../../../../CommonCode/GenerateLine/generateLine.jsx";
import ParentBox from "../ParentBox/ParentBox.jsx";
import ConfirmBox from "../ConfirmBox/ConfirmBox.jsx";
import TestBox from "./TestBox.jsx";
import ConsequentBox from "./ConsequentBox.jsx";
import AlternateBox from "./AlternateBox.jsx";
import Line from "../../../../ProjectObject/Line.js";
import LineType from "../../../../CommonCode/LineType.js";
import ExpressionBlockOfLines from "../../../../ProjectObject/ExpressionBlockOfLines.js";
import {getLastIdFromList, reformatLineRow} from "../../../CommonBasicFrameMethod.js";
import ReturnValueLine from "../../../../ProjectObject/ReturnValueLine.js";
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
const deleteLineById = (linesOfBlocks, id) => {
    const newLinesOfBlocks = [];
    const allRemovingIdList = [];
    allRemovingIdList.push(id);
    linesOfBlocks.forEach((l) => {
        if (allRemovingIdList.indexOf(l.id) < 0)
            newLinesOfBlocks.push(l);
        else
            allRemovingIdList.push(l.id);
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
const saveChange = (linesOfBlocks, setLinesOfBlocks, blockToEdit, testLineToEdit, consequentEditLine, alternateEditLine) => {
    let newLinesOfBlocks = [];
    let lineToEdit = testLineToEdit;
    if (lineToEdit.row === 0 || lineToEdit.row) {
        linesOfBlocks.forEach((l, i) => {
            if (i === lineToEdit.row) {
                newLinesOfBlocks.push(lineToEdit);
                if (!blockToEdit.consequent.id) {
                    const consequentLine = new ReturnValueLine(
                        lineToEdit.row,
                        lineToEdit.lineLevel + 1,
                        [],
                        getLastIdFromList(linesOfBlocks) + 1,
                        lineToEdit.id
                    );
                    newLinesOfBlocks.push(consequentLine);
                }
            } else {
                newLinesOfBlocks.push(l);
            }
        });
        if (consequentEditLine.length === 0 && blockToEdit.consequent.id) {
            newLinesOfBlocks = clearLineById(newLinesOfBlocks, blockToEdit.consequent.id);
            newLinesOfBlocks = deleteAllLineInFamily(newLinesOfBlocks, blockToEdit.consequent.id);
        }
        if (alternateEditLine.length === 0 && blockToEdit.alternate.id) {
            newLinesOfBlocks = deleteLineById(newLinesOfBlocks, blockToEdit.alternate.id);
            newLinesOfBlocks = deleteAllLineInFamily(newLinesOfBlocks, blockToEdit.alternate.id);
        }
    } else {
        lineToEdit.row = linesOfBlocks.length;
        lineToEdit.lineLevel = 0;
        if (!lineToEdit.blockList)
            lineToEdit.blockList = [];
        lineToEdit.id = getLastIdFromList(linesOfBlocks) + 1;
        const consequentLine = new ReturnValueLine(
            lineToEdit.row + 1,
            lineToEdit.lineLevel + 1,
            [],
            lineToEdit.id + 1,
            lineToEdit.id
        );
        newLinesOfBlocks.push(...linesOfBlocks);
        newLinesOfBlocks.push(lineToEdit);
        newLinesOfBlocks.push(consequentLine);
    }
    reformatLineRow(newLinesOfBlocks);
    setLinesOfBlocks(newLinesOfBlocks);
    return {lineToEdit, linesOfBlocks: newLinesOfBlocks};
}
const acceptChange = (linesOfBlocks, setLinesOfBlocks, blockToEdit, setBlockToEdit, setActiveLineToEditIdList, testLineToEdit, consequentEditLine, alternateEditLine) => {
    saveChange(linesOfBlocks, setLinesOfBlocks, blockToEdit, testLineToEdit, consequentEditLine, alternateEditLine);
    clearChange(setBlockToEdit, setActiveLineToEditIdList);
}
const clearChange = (setBlockToEdit, setActiveLineToEditIdList) => {
    setBlockToEdit(new ExpressionBlockOfLines());
    setActiveLineToEditIdList([]);
}
const IfStatementTabPanel = () => {
    const {linesOfBlocks, setLinesOfBlocks, getOperandFromMainList} = useContext(MainFrameContext);
    const {blockToEdit, setBlockToEdit, setActiveLineToEditIdList} = useContext(BasicFrameContext);
    const [testLineToEdit, setTestLineToEdit] = useState(new Line());
    const [consequentEditLine, setConsequentEditLine] = useState([]);
    const [alternateEditLine, setAlternateEditLine] = useState([]);
    const id = useId()
    useEffect(() => {
        const test = blockToEdit.test ? blockToEdit.test : new Line();
        if (!test.lineType) test.lineType = LineType.IF_STATEMENT;
        setTestLineToEdit(test);
        blockToEdit.consequent && blockToEdit.consequent.blockList ? setConsequentEditLine(
            generateLine(blockToEdit.consequent, getOperandFromMainList).map((block, index) =>
                    generateBlock(block, `${id}-${index}`)
            )
        ) : setConsequentEditLine([]);
        blockToEdit.alternate && blockToEdit.alternate.blockList ? setAlternateEditLine(
            generateLine(blockToEdit.alternate, getOperandFromMainList).map((block, index) =>
                    generateBlock(block, `${id}-${index}`)
            )
        ) : setAlternateEditLine([]);
    }, [blockToEdit, id]);
    return (
        <Box
            sx={{
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
                        testLineToEdit,
                        consequentEditLine,
                        alternateEditLine)}
                />
                <TestBox
                    testLineToEdit={testLineToEdit}
                    setTestLineToEdit={setTestLineToEdit}
                />
                <ConsequentBox
                    consequentEditLine={consequentEditLine}
                    setConsequentEditLine={setConsequentEditLine}
                    saveChange={() => saveChange(linesOfBlocks, setLinesOfBlocks, blockToEdit, testLineToEdit, consequentEditLine, alternateEditLine)}
                />
                <AlternateBox
                    alternateEditLine={alternateEditLine}
                    setAlternateEditLine={setAlternateEditLine}
                    saveChange={() => saveChange(linesOfBlocks, setLinesOfBlocks, blockToEdit, testLineToEdit, consequentEditLine, alternateEditLine)}
                />
                <ConfirmBox
                    acceptChange={() => acceptChange(
                        linesOfBlocks,
                        setLinesOfBlocks,
                        blockToEdit,
                        setBlockToEdit,
                        setActiveLineToEditIdList,
                        testLineToEdit,
                        consequentEditLine,
                        alternateEditLine)}
                    cancelChange={() => clearChange(setBlockToEdit, setActiveLineToEditIdList)}
                />
            </Paper>
        </Box>
    );
}
export default IfStatementTabPanel;