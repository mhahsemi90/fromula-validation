import LineOfBlocks from "../LineOfBlocks/index.jsx";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';
import {Box} from "@mui/material";

const FormulaComponent = ({linesOfBlocks,setEditBlocks}) => {
    return (
        <Box
            sx={{
                margin: '5px 10px 0px 0px',
            }}
        >
            {linesOfBlocks.map((line) =>
                (<LineOfBlocks line={line} setEditBlocks={setEditBlocks} key={uuidv4()}/>)
            )}
        </Box>
    );
}
FormulaComponent.propTypes = {
    linesOfBlocks: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    setEditBlocks: PropTypes.func.isRequired,
}

export default FormulaComponent;