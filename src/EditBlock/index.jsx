import {Chip} from "@mui/material";
import PropTypes from "prop-types";
import Line from "../ProjectObject/Line.js";

function deleteEditBlock(line, setLine, index) {
    const blockList = [];
    line.blockList.forEach((block, i) => {
        if (i !== index)
            blockList.push(block)
    })
    setLine(
        new Line(
            line.row,
            line.lineLevel,
            blockList
        )
    );
}

const EditBlock = ({block, line, setLine, index}) => {
    return (
        <Chip
            label={block.code}
            onDelete={() => deleteEditBlock(line, setLine, index)}
        />
    )
}
EditBlock.propTypes = {
    block: PropTypes.object.isRequired,
    line: PropTypes.object.isRequired,
    setLine: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
}
export default EditBlock