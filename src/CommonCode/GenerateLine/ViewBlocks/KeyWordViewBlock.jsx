import {Typography} from "@mui/material";
import PropTypes from "prop-types";
import {useContext} from "react";
import {MainFrameContext} from "../../../MainContext.jsx";

const KeyWordViewBlock = ({block}) => {
    const {lang} = useContext(MainFrameContext);
    return (<Typography component={'span'}
                        sx={{marginX: '2px', color: 'blue'}}>{lang === 'en' ? block.enTitle : block.title}</Typography>)
}
KeyWordViewBlock.propTypes = {
    block: PropTypes.object.isRequired,
}
export default KeyWordViewBlock;