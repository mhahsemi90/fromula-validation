import {Box} from "@mui/material";
import PropTypes from "prop-types";

const KeyWordViewBlock = ({block, lang}) => {
    return (<Box sx={{marginX: '2px', color: 'blue'}}>{lang === 'en' ? block.enTitle : block.title}</Box>)
}
KeyWordViewBlock.propTypes = {
    block: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
}
export default KeyWordViewBlock;