import {useContext, useEffect, useState} from "react";
import {BasicFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import ParentBox from "../ParentBox/ParentBox.jsx";
import ConfirmBox from "../ConfirmBox/ConfirmBox.jsx";
import BodyBox from "./BodyBox.jsx";
import ExpressionBlockOfLines from "../../../../ProjectObject/ExpressionBlockOfLines.js";
import {getLastIdFromList} from "../../../CommonBasicFrameMethod.js";
import ReturnValueLine from "../../../../ProjectObject/ReturnValueLine.js";
import LineType from "../../../../CommonCode/LineType.js";
import {getOperatorFromMainList} from "../../../../CommonCode/getElementFromMainList.js";
import ExpressionTypeBox from "./ExpressionTypeBox.jsx";

const hasVariable = (resultVarNameList, resultVarName) => {
    let result = false;
    resultVarNameList.forEach(item => {
        if (item.code === resultVarName.code)
            result = true;
    })
    return result;
};
const acceptChange = (
    linesOfBlocks,
    setLinesOfBlocks,
    blockToEdit,
    setBlockToEdit,
    setActiveLineToEditIdList,
    bodyLineToEdit,
    expressionType,
    assignmentOperator,
    resultVarName,
    resultVarNameList,
    setResultVarNameList,
) => {
    const newLinesOfBlocks = [];
    let lineToEdit = bodyLineToEdit;
    if (expressionType === 'change') {
        lineToEdit.lineType = LineType.CHANGE_VALUE_STATEMENT;
        lineToEdit.assignmentOperator = assignmentOperator;
        lineToEdit.resultVar = resultVarName;
        if (resultVarName.code && !hasVariable(resultVarNameList, resultVarName)) {
            resultVarNameList.push(resultVarName);
            setResultVarNameList([...resultVarNameList]);
        }
    } else {
        lineToEdit.lineType = LineType.RETURN_STATEMENT;
    }
    if (lineToEdit.row && !lineToEdit.blockList && !lineToEdit.parentId)
        lineToEdit = null;
    if (!lineToEdit) {
        linesOfBlocks.splice(blockToEdit.body.row, 1);
        newLinesOfBlocks.push(...linesOfBlocks);
    } else if (lineToEdit.row === 0 || lineToEdit.row) {
        linesOfBlocks.forEach((l, i) => {
            if (i === lineToEdit.row)
                newLinesOfBlocks.push(lineToEdit);
            else
                newLinesOfBlocks.push(l);
        });
    } else {
        lineToEdit.row = linesOfBlocks.length;
        lineToEdit.lineLevel = 0;
        if (!lineToEdit.blockList)
            lineToEdit.blockList = [];
        lineToEdit.id = getLastIdFromList(linesOfBlocks) + 1;
        newLinesOfBlocks.push(...linesOfBlocks);
        newLinesOfBlocks.push(lineToEdit);
    }
    setLinesOfBlocks(newLinesOfBlocks);
    setBlockToEdit(new ExpressionBlockOfLines());
    setActiveLineToEditIdList([]);
}
const cancelChange = (setBlockToEdit, setActiveLineToEditIdList) => {
    setBlockToEdit(new ExpressionBlockOfLines());
    setActiveLineToEditIdList([]);
}
const ExpressionStatementTabPanel = () => {
    const {linesOfBlocks, setLinesOfBlocks} = useContext(MainFrameContext);
    const {
        blockToEdit,
        setBlockToEdit,
        setActiveLineToEditIdList,
        resultVarNameList,
        setResultVarNameList,
    } = useContext(BasicFrameContext);
    const [bodyLineToEdit, setBodyLineToEdit] = useState(new ReturnValueLine());
    const [assignmentOperator, setAssignmentOperator] = useState(getOperatorFromMainList('+='));
    const [resultVarName, setResultVarName] = useState({});
    const [expressionType, setExpressionType] = useState('return');
    useEffect(() => {
        const body = blockToEdit.body ? blockToEdit.body : new ReturnValueLine();
        setBodyLineToEdit(body);
        setExpressionType(body.lineType === LineType.CHANGE_VALUE_STATEMENT ? 'change' : 'return');
        if (body.lineType === LineType.CHANGE_VALUE_STATEMENT) {
            setAssignmentOperator(body.assignmentOperator);
            setResultVarName(body.resultVar);
        }
        console.log("ExpressionStatementTabPanel useEffect");
    }, [blockToEdit]);
    return (
        <div
            className={'flex flex-col box-border size-full p-1'}
        >
            <div
                className={'flex flex-col justify-between box-border size-full m-1 p-2 shadow-e-5 rounded'}
            >
                <ParentBox
                    acceptChange={() => acceptChange(
                        linesOfBlocks,
                        setLinesOfBlocks,
                        blockToEdit,
                        setBlockToEdit,
                        setActiveLineToEditIdList,
                        bodyLineToEdit,
                        expressionType,
                        assignmentOperator,
                        resultVarName,
                        resultVarNameList,
                        setResultVarNameList)}
                />
                <ExpressionTypeBox
                    assignmentOperator={assignmentOperator}
                    setAssignmentOperator={setAssignmentOperator}
                    resultVarName={resultVarName}
                    setResultVarName={setResultVarName}
                    expressionType={expressionType}
                    setExpressionType={setExpressionType}
                    bodyLineToEdit={bodyLineToEdit}
                    setBodyLineToEdit={setBodyLineToEdit}
                />
                <BodyBox bodyLineToEdit={bodyLineToEdit} setBodyLineToEdit={setBodyLineToEdit}/>
                <ConfirmBox
                    acceptChange={() => acceptChange(
                        linesOfBlocks,
                        setLinesOfBlocks,
                        blockToEdit,
                        setBlockToEdit,
                        setActiveLineToEditIdList,
                        bodyLineToEdit,
                        expressionType,
                        assignmentOperator,
                        resultVarName,
                        resultVarNameList,
                        setResultVarNameList)}
                    cancelChange={() => cancelChange(setBlockToEdit, setActiveLineToEditIdList)}
                />
            </div>
        </div>
    );
}
export default ExpressionStatementTabPanel;