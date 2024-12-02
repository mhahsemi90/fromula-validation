import LineOfBlocks from "../LineOfBlocks/index.jsx";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';
import {Box} from "@mui/material";

const FormulaComponent = ({lineOfBlocksList}) => {
    return (
        <Box
            sx={{
                margin: '5px 10px 0px 0px',
            }}
        >
            {lineOfBlocksList.map((lineOfBlocks) =>
                (<LineOfBlocks blocks={lineOfBlocks} key={uuidv4()}/>)
            )}
        </Box>
    );
}
FormulaComponent.propTypes = {
    lineOfBlocksList: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
}

export default FormulaComponent;