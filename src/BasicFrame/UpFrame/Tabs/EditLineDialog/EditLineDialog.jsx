import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import StatementTabPanel from "../../../../CommonCode/StatementTabPanel/StatementTabPanel.jsx";
import PropTypes from "prop-types";

const EditLineDialog = ({
                            open,
                            setOpen,
                            cancel,
                            sendChange,
                            editLine,
                            setEditLine,
                            operators,
                        }) => {
    return (
        <Dialog
            open={open}
            maxWidth={'lg'}
            fullWidth={true}
            sx={{
                direction: 'ltr',
                '& .MuiDialog-container': {
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <DialogTitle title={'Edit Line'}></DialogTitle>
            <DialogContent>
                <StatementTabPanel cancel={cancel} sendChange={sendChange} editLine={editLine}
                                   setEditLine={setEditLine} operators={operators}/>
            </DialogContent>
            {/*<DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
            </DialogActions>*/}
        </Dialog>
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