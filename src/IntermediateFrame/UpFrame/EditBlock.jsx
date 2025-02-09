import {Box, Chip} from "@mui/material";
import PropTypes from "prop-types";
import Line from "../../ProjectObject/Line.js";
import '../../../public/keyFrame.css'
import Blink from "./Tabs/Blink.jsx";
import {useContext} from "react";
import {IntermediateFrameContext, MainFrameContext} from "../../MainContext.jsx";

function deleteEditBlock(lineToEdit, setLineToEdit, setBlinkIndex, index) {
    const blockList = [];
    lineToEdit.blockList.forEach((block, i) => {
        if (i !== index) blockList.push(block)
    })
    setLineToEdit(new Line(lineToEdit.row, lineToEdit.lineLevel, blockList));
    setBlinkIndex(index - 1);
}

const EditBlock = ({block, index,}) => {
    const {lang} = useContext(MainFrameContext);
    const {lineToEdit, setLineToEdit, setBlinkIndex} = useContext(IntermediateFrameContext);
    return (<Box
        sx={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}
    >
        {index === 0 ? <Blink index={-1}/> : null}
        <Chip
            label={lang === 'en' ? block.enTitle : block.title}
            color="primary"
            variant="outlined"
            onClick={() => deleteEditBlock(lineToEdit, setLineToEdit, setBlinkIndex, index)}
            sx={{
                margin: '2px',
            }}
        />
        <Blink index={index}/>
    </Box>);
}
EditBlock.propTypes = {
    block: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
}
export default EditBlock