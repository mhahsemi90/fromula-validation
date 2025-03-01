import {Box, Paper, SpeedDial, SpeedDialAction} from "@mui/material";
import {useContext, useId} from "react";
import {BasicFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import {ArrowDownward, ArrowUpward, Delete} from "@mui/icons-material";
import {handleAddAfter, handleAddBefore, handleDelete} from "./ActionButtonHandleEvent.js";
import generateBlock from "../../../../CommonCode/GenerateLine/generateBlock.jsx";
import PropTypes from "prop-types";
import generateLine from "../../../../CommonCode/GenerateLine/generateLine.jsx";
import {selectBlockToEdit} from "../../../CommonBasicFrameMethod.js";

const handleSpeedDialClick = (e, line, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList) => {
    if (e.target.classList.contains('MuiSpeedDial-fab')) {
        selectBlockToEdit(line, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList);
    }
}

const getBgColor = (lineRow, hoverBlockIdList, activeLineToEditIdList) => {
    return hoverBlockIdList.indexOf(lineRow) > -1 ?
        "#ffdddd" :
        activeLineToEditIdList.indexOf(lineRow) > -1 ?
            "#dddddd" :
            "white";
}

function getElevationValue(lineRow, activeLineToEditIdList) {
    return activeLineToEditIdList.indexOf(lineRow) > -1 ? 4 : 2;
}

function getMarginTop(lineRow, blockToEdit) {
    return blockToEdit.topRow === lineRow ? '3px' : 0;
}

function getMarginBottom(lineRow, blockToEdit) {
    return blockToEdit.bottomRow === lineRow ? '3px' : 0;
}

const LineOfViewBlocks = ({line}) => {
    const {linesOfBlocks, setLinesOfBlocks,getOperandFromMainList} = useContext(MainFrameContext);
    const {
        activeLineToEditIdList,
        setActiveLineToEditIdList,
        hoverBlockIdList,
        blockToEdit,
        setBlockToEdit
    } = useContext(BasicFrameContext);
    const lineRow = line.row;
    const width = `${100 - (line.lineLevel * 3)}%`;
    const bgColor = getBgColor(lineRow, hoverBlockIdList, activeLineToEditIdList);
    const elevationValue = getElevationValue(lineRow, activeLineToEditIdList);
    const marginTop = getMarginTop(lineRow, blockToEdit);
    const marginBottom = getMarginBottom(lineRow, blockToEdit);
    const id = useId();
    const actions = [
        {
            icon: <ArrowUpward/>,
            name: 'Add Before',
            onClick: () => handleAddBefore(line, linesOfBlocks, setLinesOfBlocks, setActiveLineToEditIdList),
        },
        {
            icon: <ArrowDownward/>,
            name: 'Add After',
            onClick: () => handleAddAfter(line, linesOfBlocks, setLinesOfBlocks, setActiveLineToEditIdList)
        },
        {
            icon: <Delete/>,
            name: 'Delete line',
            onClick: () => handleDelete(line, linesOfBlocks, setLinesOfBlocks, setBlockToEdit, activeLineToEditIdList, setActiveLineToEditIdList)
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
                onClick={() => selectBlockToEdit(line, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList)}>
                {generateLine(line,getOperandFromMainList).map((block, index) =>
                    generateBlock(block, `${id}-${index}`),
                )}
            </Box>
            <SpeedDial
                ariaLabel="SpeedDial example"
                direction="right"
                transitionDuration={0}
                sx={{
                    marginTop: line.parentId === null ? 0 : '8px',
                    marginBottom: line.parentId === null ? 0 : '8px',
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
                onClick={(e) => handleSpeedDialClick(e, line, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList)}
            >
                {actions.filter(() => (line.parentId === null || line.parentId === undefined))
                    .map((action) => (
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