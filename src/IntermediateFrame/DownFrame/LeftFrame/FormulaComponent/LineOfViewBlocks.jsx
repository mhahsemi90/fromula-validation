import {Box, Paper, SpeedDial, SpeedDialAction} from "@mui/material";
import PropTypes from "prop-types";
import generateBlock from "./GenerateBlock/generateBlock.jsx";
import generateLine from "./GenerateBlock/generateLine.jsx";
import {ArrowBack, ArrowDownward, ArrowForward, ArrowUpward, Delete} from "@mui/icons-material";
import {handleAddAfter, handleAddBefore, handleChangeLevel, handleDelete} from "./ActionButtonHandleEvent.js";

const handleLineClick = (line, setEditLine, setType, setBlinkIndex, setActiveLineIndex) => {
    setEditLine(line);
    setType(line.statementType);
    setBlinkIndex(line.blockList.length - 1);
    setActiveLineIndex(line.row);
}
const handleSpeedDialClick = (e, line, setEditLine, setType, setBlinkIndex, setActiveLineIndex) => {
    if (e.target.classList.contains('MuiSpeedDial-fab')) {
        handleLineClick(line, setEditLine, setType, setBlinkIndex, setActiveLineIndex);
    }
}

const LineOfViewBlocks = ({
                              linesOfBlocks,
                              setLinesOfBlocks,
                              line,
                              setEditLine,
                              setType,
                              setBlinkIndex,
                              activeLineIndex,
                              setActiveLineIndex,
                              lang
                          }) => {
    const margin = `${100 - (line.lineLevel * 3)}%`;
    const bgColor = line.row === activeLineIndex ? "#dddddd" : "white";
    const elevationValue = line.row === activeLineIndex ? 4 : 2;
    const marginTop = line.row === activeLineIndex ? '3px' : 0;
    const marginBottom = line.row === activeLineIndex ? '3px' : 0;
    const actions = [
        {
            icon: <ArrowUpward/>,
            name: 'Add Before',
            onClick: () => handleAddBefore(line, linesOfBlocks, setLinesOfBlocks, activeLineIndex, setActiveLineIndex),
        },
        {
            icon: <ArrowDownward/>,
            name: 'Add After',
            onClick: () => handleAddAfter(line, linesOfBlocks, setLinesOfBlocks, activeLineIndex, setActiveLineIndex)
        },
        {
            icon: <ArrowForward/>,
            name: 'Add Level',
            onClick: () => handleChangeLevel(line, 1, linesOfBlocks, setLinesOfBlocks)
        },
        {
            icon: <ArrowBack/>,
            name: 'Remove Level',
            onClick: () => handleChangeLevel(line, -1, linesOfBlocks, setLinesOfBlocks)
        },
        {
            icon: <Delete/>,
            name: 'Delete line',
            onClick: () => handleDelete(line, linesOfBlocks, setLinesOfBlocks, setEditLine, setType, setBlinkIndex, activeLineIndex, setActiveLineIndex)
        },
    ]
    return (
        <Paper
            elevation={elevationValue}
            sx={{
                marginTop: marginTop,
                marginBottom: marginBottom,
                display: 'flex',
                flexWrap: 'wrap',
                width: margin,
                bgcolor: bgColor,
            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
                onClick={() => handleLineClick(line, setEditLine, setType, setBlinkIndex, setActiveLineIndex)}>
                {generateLine(line).map((block) =>
                    generateBlock(block,lang)
                )}
            </Box>
            <SpeedDial
                ariaLabel="SpeedDial example"
                direction="right"
                transitionDuration={0}
                sx={{
                    marginLeft: '10px',
                    '& .MuiSpeedDial-fab': {
                        width: 20,
                        minWidth: 20,
                        height: 20,
                        minHeight: 20,
                        bgcolor: '#666666',
                        opacity: 0.5,

                    },
                    '& :hover': {
                        opacity: 1,
                    },
                    '& .MuiSpeedDialAction-fab': {
                        width: 20,
                        minWidth: 20,
                        height: 20,
                        minHeight: 20,
                    }
                }}
                onClick={(e) => handleSpeedDialClick(e, line, setEditLine, setType, setBlinkIndex, setActiveLineIndex)}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.onClick}
                    />
                ))}
            </SpeedDial>
        </Paper>
    )
}
LineOfViewBlocks.propTypes = {
    line: PropTypes.object.isRequired,
    linesOfBlocks: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    setLinesOfBlocks: PropTypes.func.isRequired,
    setEditLine: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired,
    setBlinkIndex: PropTypes.func.isRequired,
    activeLineIndex: PropTypes.number.isRequired,
    setActiveLineIndex: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
}
export default LineOfViewBlocks;