import {Chip} from "@mui/material";
import {useContext, useId} from "react";
import {MainFrameContext, StatementTabPanelContext} from "../../../MainContext.jsx";
import Line from "../../../ProjectObject/Line.js";
import Block from "../../../ProjectObject/Block.js";

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
    setEditLine(
        new Line(
            editLine.row,
            editLine.lineLevel,
            blockList,
            editLine.lineType,
            editLine.id,
            editLine.parentId
        )
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
                        <Chip
                            label={lang === 'en' ? operator.code : operator.title}
                            color="primary"
                            variant="outlined"
                            key={`${id}-${index}`}
                            onClick={() => addOperator(editLine, setEditLine, setBlinkIndex, blinkIndex, operator)}
                            sx={{
                                margin: '5px',
                            }}
                        />
                    ))
                }</div>
        </div>
    );
}
export default Operators;