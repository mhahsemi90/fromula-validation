import {Box, Paper, SpeedDial, SpeedDialAction} from "@mui/material";
import PropTypes from "prop-types";
import generateBlock from "../../../../CommonCode/GenerateLine/generateBlock.jsx";
import {ArrowBack, ArrowDownward, ArrowForward, ArrowUpward, Delete} from "@mui/icons-material";
import {handleAddAfter, handleAddBefore, handleChangeLevel, handleDelete} from "./ActionButtonHandleEvent.js";
import {useContext, useId} from "react";
import {IntermediateFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import generateLine from "../../../../CommonCode/GenerateLine/generateLine.jsx";

const handleLineClick = (line, setLineToEdit, setType, setBlinkIndex, setActiveLineToEditRow) => {
    setLineToEdit(line);
    setType(line.lineType);
    setBlinkIndex(line.blockList.length - 1);
    setActiveLineToEditRow(line.row);
}
const handleSpeedDialClick = (e, line, setLineToEdit, setType, setBlinkIndex, setActiveLineToEditRow) => {
    if (e.target.classList.contains('MuiSpeedDial-fab')) {
        handleLineClick(line, setLineToEdit, setType, setBlinkIndex, setActiveLineToEditRow);
    }
}

const LineOfViewBlocks = ({line}) => {
    const {linesOfBlocks, setLinesOfBlocks, getOperandFromMainList} = useContext(MainFrameContext);
    const {
        activeLineToEditRow,
        setActiveLineToEditRow,
        setLineToEdit,
        setBlinkIndex,
        setType
    } = useContext(IntermediateFrameContext);
    const width = `${100 - (line.lineLevel * 3)}%`;
    const bgColor = line.row === activeLineToEditRow ? "#dddddd" : "white";
    const elevationValue = line.row === activeLineToEditRow ? 4 : 2;
    const marginTop = line.row === activeLineToEditRow ? '3px' : 0;
    const marginBottom = line.row === activeLineToEditRow ? '3px' : 0;
    const id = useId()
    const actions = [
        {
            icon: <ArrowUpward/>,
            name: 'Add Before',
            onClick: () => handleAddBefore(line, linesOfBlocks, setLinesOfBlocks, activeLineToEditRow, setActiveLineToEditRow),
        },
        {
            icon: <ArrowDownward/>,
            name: 'Add After',
            onClick: () => handleAddAfter(line, linesOfBlocks, setLinesOfBlocks, activeLineToEditRow, setActiveLineToEditRow)
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
            onClick: () => handleDelete(line, linesOfBlocks, setLinesOfBlocks, setLineToEdit, setType, setBlinkIndex, activeLineToEditRow, setActiveLineToEditRow)
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
                width: width,
                backgroundColor: bgColor,
            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
                onClick={() => handleLineClick(line, setLineToEdit, setType, setBlinkIndex, setActiveLineToEditRow)}>
                {generateLine(line, getOperandFromMainList).map((block, index) =>
                    generateBlock(block, `${id}-${index}`)
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
                        backgroundColor: '#666666',
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
                onClick={(e) => handleSpeedDialClick(e, line, setLineToEdit, setType, setBlinkIndex, setActiveLineToEditRow)}
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
}
export default LineOfViewBlocks;