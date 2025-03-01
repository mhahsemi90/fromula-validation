import {Box, Typography} from "@mui/material";
import {Button} from "antd";
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
import B from "../../../../BundleConst/B.js";
import PopperForSelectStatementType from "../PopperForSelectStatementType/PopperForSelectStatementType.jsx";
import LineType from "../../../../CommonCode/LineType.js";
import Line from "../../../../ProjectObject/Line.js";

const createConsequent = (type, setLinesOfBlocks, saveChange, setOpen, setBlockToEdit, setActiveLineToEditIdList) => {
    const {lineToEdit, linesOfBlocks} = saveChange();
    const blockToEdit = getBlockFromLine(lineToEdit, linesOfBlocks)
    const bottomRow = blockToEdit.bottomRow;
    const lastId = blockToEdit.consequent.id;
    const lineLevel = blockToEdit.consequent.lineLevel;
    let consequentLine;
    if (type === LineType.IF_STATEMENT) {
        consequentLine = new Line(1, lineLevel, [], LineType.IF_STATEMENT, lastId, lineToEdit.id);
    }
    if (type === LineType.FOR_STATEMENT) {
        consequentLine = new Line(1, lineLevel, [], LineType.FOR_STATEMENT, lastId, lineToEdit.id);
    }
    if (consequentLine) {
        const newLinesOfBlocks = [];
        blockToEdit.consequent = consequentLine;
        if (bottomRow === linesOfBlocks.length - 1) {
            linesOfBlocks.splice(bottomRow, 1);
            newLinesOfBlocks.push(...linesOfBlocks);
            newLinesOfBlocks.push(consequentLine);
        } else {
            newLinesOfBlocks.push(...linesOfBlocks.slice(0, bottomRow - 1))
            newLinesOfBlocks.push(consequentLine);
            newLinesOfBlocks.push(...linesOfBlocks.slice(bottomRow - 1));
        }
        reformatLineRow(newLinesOfBlocks);
        setLinesOfBlocks(newLinesOfBlocks);
    }
    setOpen(false);
    selectBlockToEdit(blockToEdit.consequent, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList);
}
const ConsequentBox = ({consequentEditLine, setConsequentEditLine, saveChange}) => {
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
                onMouseEnter={() => highlightParentAndChild(blockToEdit.consequent, linesOfBlocks, setHoverBlockIdList)}
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
                    <label>CONSEQUENT</label>
                </Box>
                <Box
                    onClick={(e) => clickForSelectBlockToEdit(blockToEdit.consequent, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList, setHoverBlockIdList, e, setAnchorEl, setOpen)}
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
                        {consequentEditLine}
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
                createStatement={(type) => createConsequent(type, setLinesOfBlocks, saveChange, setOpen, setBlockToEdit, setActiveLineToEditIdList)}
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
                    type={'primary'}
                    onClick={() => setConsequentEditLine([])}
                >{t(B.F_DELETE)}
                </Button>
            </Box>
        </Box>
    )
}
ConsequentBox.propTypes = {
    consequentEditLine: PropTypes.arrayOf(
        PropTypes.element.isRequired
    ).isRequired,
    setConsequentEditLine: PropTypes.func.isRequired,
    saveChange: PropTypes.func.isRequired,
}
export default ConsequentBox;