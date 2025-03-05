import {useContext, useId} from "react";
import {MainFrameContext, StatementTabPanelContext} from "../../../MainContext.jsx";
import Line from "../../../ProjectObject/Line.js";
import Block from "../../../ProjectObject/Block.js";
import {Button} from "antd";
import LineType from "../../LineType.js";
import ChangeValueLine from "../../../ProjectObject/ChangeValueLine.js";

function addOperator(editLine, setEditLine, setBlinkIndex, blinkIndex, operator) {
    const blockList =
        editLine.blockList ?
            [
                ...editLine.blockList.slice(0, blinkIndex + 1),
                new Block(operator.type, operator.title, operator.code, operator.code),
                ...editLine.blockList.slice(blinkIndex + 1)
            ] :
            [
                new Block(operator.type, operator.title, operator.code, operator.code)
            ];
    if (editLine.lineType === LineType.CHANGE_VALUE_STATEMENT)
        setEditLine(new ChangeValueLine(
            editLine.row,
            editLine.lineLevel,
            blockList,
            editLine.id,
            editLine.parentId,
            editLine.assignmentOperator,
            editLine.resultVar)
        );
    else
        setEditLine(new Line(
            editLine.row,
            editLine.lineLevel,
            blockList,
            editLine.lineType,
            editLine.id,
            editLine.parentId)
        );
    setBlinkIndex(blinkIndex + 1);
}

const Operators = () => {
    const {lang} = useContext(MainFrameContext);
    const {editLine, setEditLine, blinkIndex, setBlinkIndex, operators} = useContext(StatementTabPanelContext);
    const id = useId();
    return (
        <div
            className={'flex items-center justify-center box-border w-1/2 h-full shadow-e-1 rounded'}
        >
            <div
                className={'box-border size-full p-2.5 overflow-auto'}
            >
                {
                    operators && operators.map((operator, index) => (
                        <Button
                            className={'m-1 bg-transparent border-blue-500 rounded-3xl'}
                            key={`${id}-${index}`}
                            onClick={() => addOperator(editLine, setEditLine, setBlinkIndex, blinkIndex, operator)}
                        >
                            {lang === 'en' ? operator.enTitle : operator.title}
                        </Button>
                    ))
                }</div>
        </div>
    );
}
export default Operators;