import {useContext, useId} from "react";
import {BasicFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import {handleAddAfter, handleAddBefore, handleDelete} from "./ActionButtonHandleEvent.js";
import generateBlock from "../../../../CommonCode/GenerateLine/generateBlock.jsx";
import PropTypes from "prop-types";
import generateLine from "../../../../CommonCode/GenerateLine/generateLine.jsx";
import {selectBlockToEdit} from "../../../CommonBasicFrameMethod.js";
import {Dropdown} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined} from "@ant-design/icons";

const getBgColor = (lineRow, hoverBlockIdList, activeLineToEditIdList) => {
    return hoverBlockIdList.indexOf(lineRow) > -1 ?
        'bg-[#ffdddd]' :
        activeLineToEditIdList.indexOf(lineRow) > -1 ?
            'bg-[#dddddd]' :
            'bg-[white]';
}

function getElevationValue(lineRow, activeLineToEditIdList) {
    return activeLineToEditIdList.indexOf(lineRow) > -1 ? 'shadow-e-5 rounded' : 'shadow-e-3 rounded';
}

function getMarginTop(lineRow, blockToEdit) {
    return blockToEdit.topRow === lineRow ? 'mt-0.5' : '';
}

function getMarginBottom(lineRow, blockToEdit) {
    return blockToEdit.bottomRow === lineRow ? 'mb-0.5' : '';
}

const LineOfViewBlocks = ({line}) => {
    const {linesOfBlocks, setLinesOfBlocks, getOperandFromMainList} = useContext(MainFrameContext);
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
    const items = [
        {
            label: '',
            key: '1',
            icon: <ArrowUpOutlined/>,
        },
        {
            label: '',
            key: '2',
            icon: <ArrowDownOutlined/>,
        },
        {
            label: '',
            key: '3',
            icon: <DeleteOutlined/>,
        },
    ];
    const menuProps = {
        items,
        onClick: (e) => {
            if (e.key === '1') {
                handleAddBefore(line, linesOfBlocks, setLinesOfBlocks, setActiveLineToEditIdList);
            }
            if (e.key === '2') {
                handleAddAfter(line, linesOfBlocks, setLinesOfBlocks, setActiveLineToEditIdList);
            }
            if (e.key === '3') {
                handleDelete(line, linesOfBlocks, setLinesOfBlocks, setBlockToEdit, activeLineToEditIdList, setActiveLineToEditIdList);
            }
        },
    };
    return (
        <div style={{
            width: width,
        }}>
            <Dropdown.Button
                className={`line-of-view flex flex-wrap ${marginTop} ${marginBottom} ${bgColor} ${elevationValue}`}
                menu={menuProps}
                onClick={() => selectBlockToEdit(line, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList)}
            >
                {/*<div
                    className={'flex flex-row flex-wrap items-center'}
                    onClick={() => selectBlockToEdit(line, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList)}
                >*/}
                {generateLine(line, getOperandFromMainList).map((block, index) =>
                    generateBlock(block, `${id}-${index}`),
                )}
                {/*</div>*/}
            </Dropdown.Button>
        </div>
    )
    /*<SpeedDial
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
            </SpeedDial>*/
}
LineOfViewBlocks.propTypes = {
    line: PropTypes.object.isRequired,
}
export default LineOfViewBlocks;