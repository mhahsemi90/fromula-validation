import {Typography} from "antd";
import PropTypes from "prop-types";
import {useContext} from "react";
import {MainFrameContext} from "../../../MainContext.jsx";

const {Paragraph} = Typography;
const KeyWordViewBlock = ({block}) => {
    const {lang} = useContext(MainFrameContext);
    return (<Paragraph
        className={'m-0.5 text-blue'}
        component={'span'}
    >
        {lang === 'en' ? block.enTitle : block.title}
    </Paragraph>)
}
KeyWordViewBlock.propTypes = {
    block: PropTypes.object.isRequired,
}
export default KeyWordViewBlock;