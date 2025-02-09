import {Box} from "@mui/material";
import UpSection from "./UpSection/UpSection.jsx";
import DownSection from "./DownSection/DownSection.jsx";
import PropTypes from "prop-types";

const StatementTabPanel = ({confirmChangeLineToEdit, clear, lineType}) => {
    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
            }}
        >
            <UpSection/>
            <DownSection confirmChangeLineToEdit={confirmChangeLineToEdit} clear={clear} lineType={lineType}/>
        </Box>
    );
}
StatementTabPanel.propTypes = {
    confirmChangeLineToEdit: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    lineType: PropTypes.string.isRequired,
}
export default StatementTabPanel;