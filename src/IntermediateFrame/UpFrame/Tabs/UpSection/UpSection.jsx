import {Box} from "@mui/material";
import Operands from "./Operands.jsx";
import Operators from "./Operators.jsx";
import PropTypes from "prop-types";

const UpSection = ({editLine, setEditLine, setBlinkIndex, blinkIndex, operands, operators, lang ,t}) => {
    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '60%',
                padding: '5px',
            }}
        >{/*up*/}
            <Operands lang={lang} editLine={editLine} setEditLine={setEditLine} setBlinkIndex={setBlinkIndex}
                      blinkIndex={blinkIndex} operands={operands} t={t}/>
            <Operators lang={lang} editLine={editLine} setEditLine={setEditLine} setBlinkIndex={setBlinkIndex}
                       blinkIndex={blinkIndex} operators={operators}/>
        </Box>
    );
}
UpSection.propTypes = {
    editLine: PropTypes.object.isRequired,
    blinkIndex: PropTypes.number.isRequired,
    setEditLine: PropTypes.func.isRequired,
    setBlinkIndex: PropTypes.func.isRequired,
    operators: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    operands: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    lang: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
}
export default UpSection;