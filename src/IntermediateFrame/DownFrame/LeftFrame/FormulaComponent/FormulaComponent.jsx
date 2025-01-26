import LineOfViewBlocks from "./LineOfViewBlocks.jsx";
import PropTypes from "prop-types";
import {v4 as uuidv4} from 'uuid';
import {Box} from "@mui/material";

const FormulaComponent = ({
                              linesOfBlocks,
                              setLinesOfBlocks,
                              setEditLine,
                              setType,
                              setBlinkIndex,
                              activeLineIndex,
                              setActiveLineIndex,
                              t,
                              lang
                          }) => {
    let maxLineLevel = 0;
    linesOfBlocks.forEach((line) => {
        if (line.lineLevel > maxLineLevel)
            maxLineLevel = line.lineLevel;
    });
    return (
        <Box
            sx={{
                direction: 'ltr',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                width: '100%',
            }}
        >
            {linesOfBlocks.map((line) =>
                (<LineOfViewBlocks linesOfBlocks={linesOfBlocks} setLinesOfBlocks={setLinesOfBlocks} line={line}
                                   setEditLine={setEditLine} setType={setType} setBlinkIndex={setBlinkIndex}
                                   activeLineIndex={activeLineIndex} setActiveLineIndex={setActiveLineIndex}
                                   lang={lang} key={uuidv4()}/>)
            )}
        </Box>
    );
}
FormulaComponent.propTypes = {
    linesOfBlocks: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    setLinesOfBlocks: PropTypes.func.isRequired,
    setEditLine: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired,
    setBlinkIndex: PropTypes.func.isRequired,
    setActiveLineIndex: PropTypes.func.isRequired,
    activeLineIndex: PropTypes.number.isRequired,
    t: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
}

export default FormulaComponent;