import {Button, Typography} from "antd";
import PropTypes from "prop-types";
import {useContext, useState} from "react";
import {BasicFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import {
    clickForSelectBlockToEdit,
    getBlockFromLine,
    getLastIdFromList,
    highlightParentAndChild,
    reformatLineRow,
    selectBlockToEdit
} from "../../../CommonBasicFrameMethod.js";
import B from "../../../../BundleConst/B.js";
import PopperForSelectStatementType from "../PopperForSelectStatementType/PopperForSelectStatementType.jsx";
import Line from "../../../../ProjectObject/Line.js";
import LineType from "../../../../CommonCode/LineType.js";

const {Paragraph} = Typography;
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
        <div
            className={'flex items-center box-border w-full h-3/5'}
        >
            <div
                className={'flex items-center box-border w-[85%] h-1/5'}
                onMouseEnter={() => highlightParentAndChild(blockToEdit.alternate, linesOfBlocks, setHoverBlockIdList)}
                onMouseLeave={() => setHoverBlockIdList([])}
            >
                <div
                    className={'flex items-center box-border w-[15%] h-1/5'}
                >
                    <label>ALTERNATE</label>
                </div>
                <div
                    className={'flex items-center box-border w-4/5 h-1/5 border p-5 shadow-inner'}
                    onClick={(e) => clickForSelectBlockToEdit(blockToEdit.alternate, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList, setHoverBlockIdList, e, setAnchorEl, setOpen)}
                >
                    <Paragraph
                        className={'flex flex-row'}
                    >
                        {alternateEditLine}
                    </Paragraph>
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
                createStatement={(type) => createAlternate(type, setLinesOfBlocks, saveChange, setOpen, setBlockToEdit, setActiveLineToEditIdList)}
            />
            <div
                className={'flex items-center box-border w-[15%] h-1/5'}
            >
                <Button
                    type={'primary'}
                    onClick={() => setAlternateEditLine([])}
                >{t(B.F_DELETE)}
                </Button>
            </div>
        </div>
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