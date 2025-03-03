import PropTypes from "prop-types";

const TabPanel = ({children, value, label}) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== label}
            className={'box-border size-full overflow-auto p-0.5'}
        >
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
