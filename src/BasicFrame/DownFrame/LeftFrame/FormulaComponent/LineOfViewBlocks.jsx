import {Box, Paper, SpeedDial, SpeedDialAction} from "@mui/material";
import {useContext} from "react";
import {BasicFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import {ArrowDownward, ArrowUpward, Delete} from "@mui/icons-material";
import {handleAddAfter, handleAddBefore, handleDelete} from "./ActionButtonHandleEvent.js";
import generateLine
    from "../../../../IntermediateFrame/DownFrame/LeftFrame/FormulaComponent/GenerateBlock/generateLine.jsx";
import generateBlock
    from "../../../../IntermediateFrame/DownFrame/LeftFrame/FormulaComponent/GenerateBlock/generateBlock.jsx";
import PropTypes from "prop-types";

const handleLineClick = (line, linesOfBlocks, setBlockToEdit, setType, setActiveLineToEditIdList) => {
    setBlockToEdit(getBlockFromLine(line, linesOfBlocks));
    setType(line.lineType);
    setActiveLineToEditIdList(fillActiveLineToEditIdListFromLine(line, linesOfBlocks));
}
const handleSpeedDialClick = (e, line, linesOfBlocks, setBlockToEdit, setType, setActiveLineToEditIdList) => {
    if (e.target.classList.contains('MuiSpeedDial-fab')) {
        handleLineClick(line, linesOfBlocks, setBlockToEdit, setType, setActiveLineToEditIdList);
    }
}

const getBgColor = (lineId, hoverBlockIdList, activeLineToEditIdList) => {
    return hoverBlockIdList.indexOf(lineId) > -1 ?
        "#f38d9f" :
        activeLineToEditIdList.indexOf(lineId) > -1 ?
            "#dddddd" :
            "white";
}

function getElevationValue(lineId, activeLineToEditIdList) {
    return activeLineToEditIdList.indexOf(lineId) > -1 ? 4 : 2;
}

function getMarginTop(lineId,blockToEdit) {
    return line.row === activeLineToEditRow ? '3px' : 0;
}

function getMarginBottom(lineId,blockToEdit) {
    return line.row === activeLineToEditRow ? '3px' : 0;
}

const LineOfViewBlocks = ({line}) => {
    const {linesOfBlocks, setLinesOfBlocks, lang} = useContext(MainFrameContext);
    const {
        activeLineToEditIdList,
        setActiveLineToEditIdList,
        hoverBlockIdList,
        blockToEdit,
        setBlockToEdit,
        setType
    } = useContext(BasicFrameContext);
    const lineId = line.id;
    const width = `${100 - (line.lineLevel * 3)}%`;
    const bgColor = getBgColor( lineId, hoverBlockIdList, activeLineToEditIdList);
    const elevationValue = getElevationValue(lineId, activeLineToEditIdList);
    const marginTop = getMarginTop(lineId,blockToEdit);
    const marginBottom = getMarginBottom(lineId,blockToEdit);
    const actions = [
        {
            icon: <ArrowUpward/>,
            name: 'Add Before',
            onClick: () => handleAddBefore(line, linesOfBlocks, setLinesOfBlocks, activeLineToEditIdList, setActiveLineToEditIdList),
        },
        {
            icon: <ArrowDownward/>,
            name: 'Add After',
            onClick: () => handleAddAfter(line, linesOfBlocks, setLinesOfBlocks, activeLineToEditIdList, setActiveLineToEditIdList)
        },
        {
            icon: <Delete/>,
            name: 'Delete line',
            onClick: () => handleDelete(line, linesOfBlocks, setLinesOfBlocks, setBlockToEdit, setType, activeLineToEditIdList, setActiveLineToEditIdList)
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
                bgcolor: bgColor,
            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
                onClick={() => handleLineClick(line, linesOfBlocks, setBlockToEdit, setType, setActiveLineToEditIdList)}>
                {generateLine(line).map((block) =>
                    generateBlock(block, lang)
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
                onClick={(e) => handleSpeedDialClick(e, line, linesOfBlocks, setBlockToEdit, setType, setActiveLineToEditIdList)}
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