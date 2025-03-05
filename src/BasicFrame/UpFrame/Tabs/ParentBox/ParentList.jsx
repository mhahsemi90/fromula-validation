import {useContext, useId} from "react";
import PropTypes from "prop-types";
import generateLine from "../../../../CommonCode/GenerateLine/generateLine.jsx";
import {BasicFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import {clickForSelectBlockToEdit, highlightParentAndChild} from "../../../CommonBasicFrameMethod.js";
import generateBlock from "../../../../CommonCode/GenerateLine/generateBlock.jsx";
import {Breadcrumb} from "antd";

const handleClick = (acceptChange, line, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList, setHoverBlockIdList) => {
    acceptChange();
    clickForSelectBlockToEdit(line, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList, setHoverBlockIdList);
}
const ParentList = ({parentList, acceptChange}) => {
    const {linesOfBlocks, getOperandFromMainList} = useContext(MainFrameContext);
    const {setBlockToEdit, setActiveLineToEditIdList, setHoverBlockIdList} = useContext(BasicFrameContext);
    const id = useId()
    return (
        <Breadcrumb
            separator={">"}
            items={parentList.map((line, index) => {
                return (
                    {
                        title: <div
                            className={'flex flex-row cursor-pointer'}
                            key={`${id}-${index}`}
                            onClick={() => handleClick(acceptChange, line, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList, setHoverBlockIdList)}
                            onMouseEnter={() => highlightParentAndChild(line, linesOfBlocks, setHoverBlockIdList)}
                            onMouseLeave={() => setHoverBlockIdList([])}
                        >
                            {generateLine(line, getOperandFromMainList).map((block, index) =>
                                generateBlock(block, `${id}-${index}`)
                            )}
                        </div>,
                    }
                )
            })}
        />
    )
}
ParentList.propTypes = {
    parentList: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    acceptChange: PropTypes.func.isRequired,
}
export default ParentList;