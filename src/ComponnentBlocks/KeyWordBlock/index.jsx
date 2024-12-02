import {Box} from "@mui/material";
import PropTypes from "prop-types";

const KeyWordBlock = ({block})=>{
    return (<Box sx={{marginX: '2px', color: 'blue'}}>{block.title}</Box>)
}
KeyWordBlock.propTypes = {
    block: PropTypes.object.isRequired,
}
export default KeyWordBlock;