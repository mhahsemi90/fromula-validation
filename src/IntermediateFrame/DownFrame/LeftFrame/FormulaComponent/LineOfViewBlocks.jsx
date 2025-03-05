import PropTypes from "prop-types";
import generateBlock from "../../../../CommonCode/GenerateLine/generateBlock.jsx";
import {handleAddAfter, handleAddBefore, handleChangeLevel, handleDelete} from "./ActionButtonHandleEvent.js";
import {useContext, useId} from "react";
import {IntermediateFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import generateLine from "../../../../CommonCode/GenerateLine/generateLine.jsx";
import {Dropdown} from "antd";
import {
    ArrowDownOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    ArrowUpOutlined,
    DeleteOutlined
} from "@ant-design/icons";

const handleLineClick = (line, setLineToEdit, setType, setActiveLineToEditRow) => {
    setLineToEdit(line);
    setType(line.lineType);
    setActiveLineToEditRow(line.row);
}

const LineOfViewBlocks = ({line}) => {
    const {linesOfBlocks, setLinesOfBlocks, getOperandFromMainList} = useContext(MainFrameContext);
    const {
        activeLineToEditRow,
        setActiveLineToEditRow,
        setLineToEdit,
        setType
    } = useContext(IntermediateFrameContext);
    const width = `${100 - (line.lineLevel * 3)}%`;
    const bgColor = line.row === activeLineToEditRow ? 'bg-[#dddddd]' : 'bg-[white]';
    const elevationValue = line.row === activeLineToEditRow ? 'shadow-e-3 rounded' : 'shadow-e-1 rounded';
    const marginTop = line.row === activeLineToEditRow ? 'mt-0.5' : '';
    const marginBottom = line.row === activeLineToEditRow ? 'mb-0.5' : '';
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
            icon: <ArrowRightOutlined/>,
        },
        {
            label: '',
            key: '4',
            icon: <ArrowLeftOutlined/>,
        },
        {
            label: '',
            key: '5',
            icon: <DeleteOutlined/>,
        },
    ];
    const menuProps = {
        items,
        onClick: (e) => {
            if (e.key === '1') {
                handleAddBefore(line, linesOfBlocks, setLinesOfBlocks, activeLineToEditRow, setActiveLineToEditRow);
            }
            if (e.key === '2') {
                handleAddAfter(line, linesOfBlocks, setLinesOfBlocks, activeLineToEditRow, setActiveLineToEditRow);
            }
            if (e.key === '3') {
                handleChangeLevel(line, 1, linesOfBlocks, setLinesOfBlocks);
            }
            if (e.key === '4') {
                handleChangeLevel(line, -1, linesOfBlocks, setLinesOfBlocks);
            }
            if (e.key === '5') {
                handleDelete(line, linesOfBlocks, setLinesOfBlocks, setLineToEdit, setType, activeLineToEditRow, setActiveLineToEditRow);
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
                onClick={() => handleLineClick(line, setLineToEdit, setType, setActiveLineToEditRow)}
            >
                {generateLine(line, getOperandFromMainList).map((block, index) =>
                    generateBlock(block, `${id}-${index}`),
                )}
            </Dropdown.Button>
        </div>
    )
}
LineOfViewBlocks.propTypes = {
    line: PropTypes.object.isRequired,
}
export default LineOfViewBlocks;