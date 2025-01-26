import {Box} from "@mui/material";
import PropTypes from "prop-types";

const CommonViewBlock = ({block,lang}) => {
    return (<Box sx={{marginX: '2px'}}>{lang === 'en' ? block.enTitle : block.title}</Box>)
}
CommonViewBlock.propTypes = {
    block: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
}
export default CommonViewBlock;