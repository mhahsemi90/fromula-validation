import {Button, Modal} from "antd";
import PropTypes from "prop-types";
import LineType from "../../../../CommonCode/LineType.js";

const PopperForSelectStatementType = ({open, setOpen, createStatement}) => {
    return (
        <Modal
            title={null}
            footer={null}
            open={open}
            onCancel={() => setOpen(false)}
            closable={false}
        >
            <Button
                onClick={() => createStatement(LineType.EXPRESSION_STATEMENT)}
            >One</Button>
            <Button
                onClick={() => createStatement(LineType.IF_STATEMENT)}
            >Two</Button>
            <Button
                onClick={() => createStatement(LineType.FOR_STATEMENT)}
            >Three</Button>
        </Modal>
    );
}


PopperForSelectStatementType.propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    createStatement: PropTypes.func.isRequired,
}
export default PopperForSelectStatementType;