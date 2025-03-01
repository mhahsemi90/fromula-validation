import PropTypes from "prop-types";

const TabPanel = ({children, value, label}) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== label}
            style={{
                boxSizing: 'border-box',
                width: '100%',
                height: '100%',
                overflowY: 'auto',
                padding: '2px',
            }}>
            {value === label && children}
        </div>
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
