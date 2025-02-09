import {Box, Chip} from "@mui/material";
import PropTypes from "prop-types";
import Line from "../../ProjectObject/Line.js";
import '../../../public/keyFrame.css'
import Blink from "./Tabs/Blink.jsx";

function deleteEditBlock(lineToEdit, setLineToEdit, setBlinkIndex, index) {
    const blockList = [];
    lineToEdit.blockList.forEach((block, i) => {
        if (i !== index) blockList.push(block)
    })
    setLineToEdit(new Line(lineToEdit.row, lineToEdit.lineLevel, blockList));
    setBlinkIndex(index - 1);
}

const EditBlock = ({
                       block, lineToEdit, setLineToEdit, index, setBlinkIndex, blinkIndex, lang
                   }) => {
    return (<Box
            sx={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}
        >
            {index === 0 ? <Blink setBlinkIndex={setBlinkIndex}  blinkIndex={blinkIndex} index={-1}/> : null}
            <Chip
                label={lang === 'en' ? block.enTitle : block.title}
                color="primary"
                variant="outlined"
                onClick={() => deleteEditBlock(lineToEdit, setLineToEdit, setBlinkIndex, index)}
                sx={{
                    margin: '2px',
                }}
            />
            <Blink setBlinkIndex={setBlinkIndex} blinkIndex={blinkIndex} index={index}/>
        </Box>);
}
EditBlock.propTypes = {
    block: PropTypes.object.isRequired,
    lineToEdit: PropTypes.object.isRequired,
    blinkIndex: PropTypes.number.isRequired,
    setLineToEdit: PropTypes.func.isRequired,
    setBlinkIndex: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    lang: PropTypes.string.isRequired,
}
export default EditBlock