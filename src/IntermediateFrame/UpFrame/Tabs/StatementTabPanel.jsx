import {Box} from "@mui/material";
import UpSection from "./UpSection/UpSection.jsx";
import DownSection from "./DownSection/DownSection.jsx";
import PropTypes from "prop-types";

const StatementTabPanel = ({
                               editLine,
                               setEditLine,
                               linesOfBlocks,
                               setLinesOfBlocks,
                               setEditedLine,
                               clear,
                               statementType,
                               blinkIndex,
                               setBlinkIndex,
                               setActiveLineIndex,
                               operators,
                               operands,
                               t,
                               lang
                           }) => {
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
            <UpSection editLine={editLine} setEditLine={setEditLine} setBlinkIndex={setBlinkIndex}
                       blinkIndex={blinkIndex} operators={operators} operands={operands} lang={lang} t={t}/>
            <DownSection
                editLine={editLine}
                setEditLine={setEditLine}
                linesOfBlocks={linesOfBlocks}
                setLinesOfBlocks={setLinesOfBlocks}
                setEditedLine={setEditedLine}
                clear={clear}
                statementType={statementType}
                blinkIndex={blinkIndex}
                setBlinkIndex={setBlinkIndex}
                setActiveLineIndex={setActiveLineIndex}
                t={t}
                lang={lang}
            />
        </Box>
    );
}
StatementTabPanel.propTypes = {
    editLine: PropTypes.object.isRequired,
    setEditLine: PropTypes.func.isRequired,
    linesOfBlocks: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    setLinesOfBlocks: PropTypes.func.isRequired,
    setEditedLine: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    statementType: PropTypes.string.isRequired,
    setBlinkIndex: PropTypes.func.isRequired,
    setActiveLineIndex: PropTypes.func.isRequired,
    blinkIndex: PropTypes.number.isRequired,
    operators: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    operands: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    t: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
}
export default StatementTabPanel;