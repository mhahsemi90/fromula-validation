import {Typography} from "@mui/material";
import PropTypes from "prop-types";
import {useContext} from "react";
import {MainFrameContext} from "../../../MainContext.jsx";

const CommonViewBlock = ({block}) => {
    const {lang} = useContext(MainFrameContext);
    return (
        <Typography component={'span'} sx={{marginX: '2px'}}>{lang === 'en' ? block.enTitle : block.title}</Typography>)
}
CommonViewBlock.propTypes = {
    block: PropTypes.object.isRequired,
}
export default CommonViewBlock;