import {Box} from "@mui/material";
import AddNext from "../AddNext/index.jsx";
import Blocks from "../Blocks/index.jsx";
import PropTypes from "prop-types";

const LineOfBlocks = ({blocks}) => {
    const margin = blocks.lineLevel * 10 + 'px';
    return (
        <Box
            sx={{
                marginRight: margin,
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
            }}>
            <Blocks blocks={blocks.blockList}/>
            <AddNext/>
        </Box>
    )
}
LineOfBlocks.propTypes = {
    blocks: PropTypes.object.isRequired,
}
export default LineOfBlocks;