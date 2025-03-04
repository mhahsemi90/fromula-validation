import {Box, Button, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {
    clickForSelectBlockToEdit,
    getBlockFromLine,
    highlightParentAndChild,
    reformatLineRow,
    selectBlockToEdit
} from "../../../CommonBasicFrameMethod.js";
import {useContext, useState} from "react";
import {BasicFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import LineType from "../../../../CommonCode/LineType.js";
import PopperForSelectStatementType from "../PopperForSelectStatementType/PopperForSelectStatementType.jsx";
import B from "../../../../BundleConst/B.js";
import Line from "../../../../ProjectObject/Line.js";

const createLoopBody = (type, setLinesOfBlocks, saveChange, setOpen, setBlockToEdit, setActiveLineToEditIdList) => {
    const {lineToEdit, linesOfBlocks} = saveChange();
    const blockToEdit = getBlockFromLine(lineToEdit, linesOfBlocks)
    const bottomRow = blockToEdit.bottomRow;
    const lastId = blockToEdit.loopBody.id;
    const lineLevel = blockToEdit.loopBody.lineLevel;
    let loopBody;
    if (type === LineType.IF_STATEMENT) {
        loopBody = new Line(1, lineLevel, [], LineType.IF_STATEMENT, lastId, lineToEdit.id);
    }
    if (type === LineType.FOR_STATEMENT) {
        loopBody = new Line(1, lineLevel, [], LineType.FOR_STATEMENT, lastId, lineToEdit.id);
    }
    if (loopBody) {
        const newLinesOfBlocks = [];
        blockToEdit.loopBody = loopBody;
        if (bottomRow === linesOfBlocks.length - 1) {
            linesOfBlocks.splice(bottomRow, 1);
            newLinesOfBlocks.push(...linesOfBlocks);
            newLinesOfBlocks.push(loopBody);
        } else {
            newLinesOfBlocks.push(...linesOfBlocks.slice(0, bottomRow - 1))
            newLinesOfBlocks.push(loopBody);
            newLinesOfBlocks.push(...linesOfBlocks.slice(bottomRow - 1));
        }
        reformatLineRow(newLinesOfBlocks);
        setLinesOfBlocks(newLinesOfBlocks);
    }
    setOpen(false);
    selectBlockToEdit(blockToEdit.loopBody, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList);
}
const LoopBodyBox = ({loopBodyEditLine, setLoopBodyEditLine, saveChange}) => {
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
                onMouseEnter={() => highlightParentAndChild(blockToEdit.loopBody, linesOfBlocks, setHoverBlockIdList)}
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
                    <label>LOOP BODY</label>
                </Box>
                <Box
                    onClick={(e) => clickForSelectBlockToEdit(blockToEdit.loopBody, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList, setHoverBlockIdList, e, setAnchorEl, setOpen)}
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
                        {loopBodyEditLine}
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
                createStatement={(type) => createLoopBody(type, setLinesOfBlocks, saveChange, setOpen, setBlockToEdit, setActiveLineToEditIdList)}
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
                    onClick={() => setLoopBodyEditLine([])}
                >{t(B.F_DELETE)}
                </Button>
            </Box>
        </Box>
    )
}
LoopBodyBox.propTypes = {
    loopBodyEditLine: PropTypes.arrayOf(
        PropTypes.element.isRequired
    ).isRequired,
    setLoopBodyEditLine: PropTypes.func.isRequired,
    saveChange: PropTypes.func.isRequired,
}
export default LoopBodyBox;