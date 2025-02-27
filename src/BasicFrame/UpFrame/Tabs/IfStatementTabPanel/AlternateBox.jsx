import {Box, Button, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {useContext, useState} from "react";
import {BasicFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import {
    getBlockFromLine,
    getLastIdFromList,
    clickForSelectBlockToEdit,
    highlightParentAndChild,
    reformatLineRow,
    selectBlockToEdit
} from "../../../CommonBasicFrameMethod.js";
import B from "../../../../BundleConst/B.js";
import PopperForSelectStatementType from "../PopperForSelectStatementType/PopperForSelectStatementType.jsx";
import Line from "../../../../ProjectObject/Line.js";
import LineType from "../../../../CommonCode/LineType.js";

const createAlternate = (type, setLinesOfBlocks, saveChange, setOpen, setBlockToEdit, setActiveLineToEditIdList) => {
    const {lineToEdit, linesOfBlocks} = saveChange();
    const blockToEdit = getBlockFromLine(lineToEdit, linesOfBlocks)
    const bottomRow = blockToEdit.bottomRow;
    const lastId = getLastIdFromList(linesOfBlocks);
    const lineLevel = lineToEdit.lineLevel;
    let elseStatement = null;
    let alternateLine;
    if (type === LineType.IF_STATEMENT) {
        alternateLine = new Line(1, lineLevel, [], LineType.ELSE_IF_STATEMENT, lastId + 1, lineToEdit.id);
    } else {
        elseStatement = new Line(1, lineLevel, [], LineType.ELSE_STATEMENT, lastId + 1, lineToEdit.id);
        alternateLine = new Line(1, lineLevel + 1, [], type, lastId + 2, lastId + 1);
    }
    const newLinesOfBlocks = [];
    if (bottomRow === linesOfBlocks.length - 1) {
        newLinesOfBlocks.push(...linesOfBlocks);
        if (elseStatement)
            newLinesOfBlocks.push(elseStatement);
        newLinesOfBlocks.push(alternateLine);
    } else {
        newLinesOfBlocks.push(...linesOfBlocks.slice(0, bottomRow + 1))
        if (elseStatement)
            newLinesOfBlocks.push(elseStatement);
        newLinesOfBlocks.push(alternateLine);
        newLinesOfBlocks.push(...linesOfBlocks.slice(bottomRow + 1));
    }
    reformatLineRow(newLinesOfBlocks);
    setLinesOfBlocks(newLinesOfBlocks);
    setOpen(false);
    selectBlockToEdit(alternateLine, newLinesOfBlocks, setBlockToEdit, setActiveLineToEditIdList);
}

const AlternateBox = ({alternateEditLine, setAlternateEditLine, saveChange}) => {
    const {linesOfBlocks, setLinesOfBlocks, t} = useContext(MainFrameContext);
    const {blockToEdit, setBlockToEdit, setActiveLineToEditIdList, setHoverBlockIdList} = useContext(BasicFrameContext);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                display: 'flex',
                width: '100%',
                height: '60%',
                alignItems: 'center',
            }}
        >
            <Box
                onMouseEnter={() => highlightParentAndChild(blockToEdit.alternate, linesOfBlocks, setHoverBlockIdList)}
                onMouseLeave={() => setHoverBlockIdList([])}
                sx={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    width: '85%',
                    height: '20%',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        width: '15%',
                        height: '20%',
                        alignItems: 'center',
                    }}
                >
                    <label>ALTERNATE</label>
                </Box>
                <Box
                    onClick={(e) => clickForSelectBlockToEdit(blockToEdit.alternate, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList, setHoverBlockIdList, e, setAnchorEl, setOpen)}
                    sx={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        width: '80%',
                        height: '20%',
                        alignItems: 'center',
                        border: '1px solid',
                        padding: 2,
                        boxShadow: '1px 1px 2px inset',
                    }}
                >
                    <Typography
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',

                        }}
                    >
                        {alternateEditLine}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: '5%',
                        height: '20%',
                    }}
                ></Box>
            </Box>
            <PopperForSelectStatementType
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                open={open}
                setOpen={setOpen}
                createStatement={(type) => createAlternate(type, setLinesOfBlocks, saveChange, setOpen, setBlockToEdit, setActiveLineToEditIdList)}
            />
            <Box
                sx={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    width: '15%',
                    height: '20%',
                    alignItems: 'center',
                }}
            >
                <Button
                    variant="contained"
                    onClick={() => setAlternateEditLine([])}
                >{t(B.F_DELETE)}
                </Button>
            </Box>
        </Box>
    );
}
AlternateBox.propTypes = {
    alternateEditLine: PropTypes.arrayOf(
        PropTypes.element.isRequired
    ).isRequired,
    setAlternateEditLine: PropTypes.func.isRequired,
    saveChange: PropTypes.func.isRequired,
}
export default AlternateBox;