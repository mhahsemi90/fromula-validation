import {Typography} from "antd";
import PropTypes from "prop-types";
import {useContext} from "react";
import {MainFrameContext} from "../../../MainContext.jsx";

const {Paragraph} = Typography;
const CommonViewBlock = ({block}) => {
    const {lang} = useContext(MainFrameContext);
    return (
        <Paragraph
            className={'m-0.5'}
            component={'span'}
        >
            {lang === 'en' ? block.enTitle : block.title}
        </Paragraph>)
}
CommonViewBlock.propTypes = {
    block: PropTypes.object.isRequired,
}
export default CommonViewBlock;