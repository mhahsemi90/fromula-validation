import {Breadcrumbs, Link} from "@mui/material";
import {useContext, useId} from "react";
import PropTypes from "prop-types";
import generateLine from "../../../../CommonCode/GenerateLine/generateLine.jsx";
import {BasicFrameContext, MainFrameContext} from "../../../../MainContext.jsx";
import {clickForSelectBlockToEdit, highlightParentAndChild} from "../../../CommonBasicFrameMethod.js";
import generateBlock from "../../../../CommonCode/GenerateLine/generateBlock.jsx";

const handleClick = (acceptChange, line, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList, setHoverBlockIdList) => {
    acceptChange();
    clickForSelectBlockToEdit(line, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList, setHoverBlockIdList);
}
const ParentList = ({parentList, acceptChange}) => {
    const {linesOfBlocks, getOperandFromMainList} = useContext(MainFrameContext);
    const {setBlockToEdit, setActiveLineToEditIdList, setHoverBlockIdList} = useContext(BasicFrameContext);
    const id = useId()
    return (
        <Breadcrumbs
            separator={">"}
        >
            {parentList.map((line, index) => {
                return (
                    <Link
                        underline={'hover'}
                        key={`${id}-${index}`}
                        onClick={() => handleClick(acceptChange, line, linesOfBlocks, setBlockToEdit, setActiveLineToEditIdList, setHoverBlockIdList)}
                        onMouseEnter={() => highlightParentAndChild(line, linesOfBlocks, setHoverBlockIdList)}
                        onMouseLeave={() => setHoverBlockIdList([])}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            cursor: 'pointer',
                        }}
                        variant={'h6'}
                    >
                        {generateLine(line, getOperandFromMainList).map((block, index) =>
                            generateBlock(block, `${id}-${index}`)
                        )}
                    </Link>
                )
            })}
        </Breadcrumbs>
    )
}
ParentList.propTypes = {
    parentList: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    acceptChange: PropTypes.func.isRequired,
}
export default ParentList;