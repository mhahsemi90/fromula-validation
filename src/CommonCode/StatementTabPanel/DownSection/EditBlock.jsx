import {Chip} from "@mui/material";
import PropTypes from "prop-types";
import '../../../../public/keyFrame.css'
import {useContext} from "react";
import {MainFrameContext, StatementTabPanelContext} from "../../../MainContext.jsx";
import Blink from "./Blink.jsx";
import Line from "../../../ProjectObject/Line.js";

function deleteEditBlock(editLine, setEditLine, setBlinkIndex, index) {
    const blockList = [];
    editLine.blockList.forEach((block, i) => {
        if (i !== index) blockList.push(block)
    })
    setEditLine(new Line(editLine.row, editLine.lineLevel, blockList, editLine.lineType, editLine.id, editLine.parentId));
    setBlinkIndex(index - 1);
}

const EditBlock = ({block, index}) => {
    const {lang} = useContext(MainFrameContext);
    const {editLine, setEditLine, blinkIndex, setBlinkIndex,} = useContext(StatementTabPanelContext);
    return (
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {index === 0 ? <Blink setBlinkIndex={setBlinkIndex} blinkIndex={blinkIndex} index={-1}/> : null}
            <Chip
                label={lang === 'en' ? block.enTitle : block.title}
                color="primary"
                variant="outlined"
                onClick={() => deleteEditBlock(editLine, setEditLine, setBlinkIndex, index)}
                sx={{
                    margin: '2px',
                }}
            />
            <Blink setBlinkIndex={setBlinkIndex} blinkIndex={blinkIndex} index={index}/>
        </div>);
}
EditBlock.propTypes = {
    block: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
}
export default EditBlock