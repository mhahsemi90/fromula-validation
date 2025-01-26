import {Box} from "@mui/material";
import PropTypes from "prop-types";

const TabPanel = ({children, value, label}) => {
    return (
        <Box
            role="tabpanel"
            hidden={value !== label}
            sx={{
                boxSizing: 'border-box',
                width: '100%',
                height: '100%',
                overflowY: 'auto',
                padding: '2px',
            }}>
            {value === label && children}
        </Box>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
}
export default TabPanel;
