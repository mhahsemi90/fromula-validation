import StatementTabPanel from "../../../../CommonCode/StatementTabPanel/StatementTabPanel.jsx";
import PropTypes from "prop-types";
import {Modal} from "antd";
import {MainFrameContext} from "../../../../MainContext.jsx";
import {useContext} from "react";

const EditLineDialog = ({
                            open,
                            setOpen,
                            cancel,
                            sendChange,
                            editLine,
                            setEditLine,
                            operators,
                        }) => {
    const {theme} = useContext(MainFrameContext);
    const modalClasses = {
        body: 'h-102',
        content: 'flex flex-col w-4/5'
    };
    return (
        <Modal
            className={`flex ${theme}`}
            open={open}
            onCancel={() => setOpen(false)}
            title={'Edit Line'}
            centered
            width={'100%'}
            footer={null}
            classNames={modalClasses}
        >
            <StatementTabPanel cancel={cancel} sendChange={sendChange} editLine={editLine}
                               setEditLine={setEditLine} operators={operators}/>
        </Modal>
    )
}
EditLineDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    sendChange: PropTypes.func.isRequired,
    editLine: PropTypes.object.isRequired,
    setEditLine: PropTypes.func.isRequired,
    operators: PropTypes.arrayOf(
        PropTypes.object.isRequired,
    ).isRequired,
}
export default EditLineDialog