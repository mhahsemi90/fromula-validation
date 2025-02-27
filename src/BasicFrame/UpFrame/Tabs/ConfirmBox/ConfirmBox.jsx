import {Box, Button} from "@mui/material";
import * as Icons from "@mui/icons-material";
import B from "../../../../BundleConst/B.js";
import PropTypes from "prop-types";
import {useContext} from "react";
import {MainFrameContext} from "../../../../MainContext.jsx";

const ConfirmBox = ({acceptChange, cancelChange}) => {
    const {t} = useContext(MainFrameContext);
    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                height: '10%',
            }}>
            <Button
                variant={'contained'}
                endIcon={<Icons.DoneOutlined/>}
                onClick={acceptChange}
            >{t(B.F_ACCEPT)}</Button>
            <Button
                variant={'contained'}
                endIcon={<Icons.Cancel/>}
                onClick={cancelChange}
            >{t(B.F_CANCEL)}</Button>
        </Box>
    );
}
ConfirmBox.propTypes = {
    acceptChange: PropTypes.func.isRequired,
    cancelChange: PropTypes.func.isRequired,
}
export default ConfirmBox;