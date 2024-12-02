import {Box} from "@mui/material";
import PropTypes from "prop-types";

const CommonBlock = ({block}) => {
    return (<Box sx={{marginX: '2px'}}>{block.title}</Box>)
}
CommonBlock.propTypes = {
    block: PropTypes.object.isRequired,
}
export default CommonBlock;