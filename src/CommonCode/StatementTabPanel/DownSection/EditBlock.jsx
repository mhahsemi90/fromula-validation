import PropTypes from "prop-types";
import {useContext} from "react";
import {MainFrameContext, StatementTabPanelContext} from "../../../MainContext.jsx";
import Blink from "./Blink.jsx";
import Line from "../../../ProjectObject/Line.js";
import {Button} from "antd";
import LineType from "../../LineType.js";
import ChangeValueLine from "../../../ProjectObject/ChangeValueLine.js";

function deleteEditBlock(editLine, setEditLine, setBlinkIndex, index) {
    const blockList = [];
    editLine.blockList.forEach((block, i) => {
        if (i !== index) blockList.push(block)
    })
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

    setBlinkIndex(index - 1);
}

const EditBlock = ({block, index}) => {
    const {lang} = useContext(MainFrameContext);
    const {editLine, setEditLine, blinkIndex, setBlinkIndex,} = useContext(StatementTabPanelContext);
    return (
        <div
            className={'inline-flex items-center justify-center'}
        >
            {index === 0 ? <Blink setBlinkIndex={setBlinkIndex} blinkIndex={blinkIndex} index={-1}/> : null}
            <Button
                className={'m-1 bg-transparent border-blue-500 rounded-3xl'}
                onClick={() => deleteEditBlock(editLine, setEditLine, setBlinkIndex, index)}
            >
                {lang === 'en' ? block.enTitle : block.title}
            </Button>
            <Blink setBlinkIndex={setBlinkIndex} blinkIndex={blinkIndex} index={index}/>
        </div>);
}
EditBlock.propTypes = {
    block: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
}
export default EditBlock