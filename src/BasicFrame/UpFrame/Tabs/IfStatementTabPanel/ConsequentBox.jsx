import {Typography} from "@mui/material";
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
        <div
            className={'flex items-center box-border w-full h-3/5'}
        >
            <div
                className={'flex items-center box-border w-[85%] h-1/5'}
                onMouseEnter={() => highlightParentAndChild(blockToEdit.consequent, linesOfBlocks, setHoverBlockIdList)}
                onMouseLeave={() => setHoverBlockIdList([])}
            >
                <div
                    className={'flex items-center box-border w-[15%] h-1/5'}
                >
                    <label>CONSEQUENT</label>
                </div>
                <div
                    className={'flex items-center box-border w-4/5 h-1/5 border p-5 shadow-inner'}
                    onClick={(e) => clickForSelectBlockToEdit(blockToEdit.consequent, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList, setHoverBlockIdList, e, setAnchorEl, setOpen)}
                >
                    <Typography
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',

                        }}
                    >
                        {consequentEditLine}
                    </Typography>
                </div>
                <div
                    className={'w-[5%] h-1/5'}
                ></div>
            </div>
            <PopperForSelectStatementType
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                open={open}
                setOpen={setOpen}
                createStatement={(type) => createConsequent(type, setLinesOfBlocks, saveChange, setOpen, setBlockToEdit, setActiveLineToEditIdList)}
            />
            <div
                className={'flex items-center box-border w-[15%] h-1/5'}
            >
                <Button
                    type={'primary'}
                    onClick={() => setConsequentEditLine([])}
                >{t(B.F_DELETE)}
                </Button>
            </div>
        </div>
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