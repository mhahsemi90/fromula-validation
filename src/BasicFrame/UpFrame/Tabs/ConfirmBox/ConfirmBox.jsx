import {Button} from "antd";
import B from "../../../../BundleConst/B.js";
import PropTypes from "prop-types";
import {useContext} from "react";
import {MainFrameContext} from "../../../../MainContext.jsx";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

const ConfirmBox = ({acceptChange, cancelChange}) => {
    const {t} = useContext(MainFrameContext);
    return (
        <div
            className={'flex justify-center box-border w-full h-[10%]'}
        >
            <Button
                type={'primary'}
                icon={<CheckOutlined/>}
                onClick={acceptChange}
            >{t(B.F_ACCEPT)}</Button>
            <Button
                type={'primary'}
                icon={<CloseOutlined/>}
                onClick={cancelChange}
            >{t(B.F_CANCEL)}</Button>
        </div>
    );
}
ConfirmBox.propTypes = {
    acceptChange: PropTypes.func.isRequired,
    cancelChange: PropTypes.func.isRequired,
}
export default ConfirmBox;