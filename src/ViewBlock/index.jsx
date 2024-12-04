import {Box} from "@mui/material";
import PropTypes from "prop-types";
import generateBlock from "../GenerateLineOfBlocksList/generateBlock.jsx";

const ViewBlock = ({blocks}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                height: '100%',
            }}>
            {blocks.map((block) =>
                generateBlock(block)
            )}
        </Box>
    )
}
ViewBlock.propTypes = {
    blocks: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
}
export default ViewBlock;