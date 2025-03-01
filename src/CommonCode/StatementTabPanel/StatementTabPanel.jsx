import UpSection from "./UpSection/UpSection.jsx";
import DownSection from "./DownSection/DownSection.jsx";
import PropTypes from "prop-types";
import {useState} from "react";
import {StatementTabPanelContext} from "../../MainContext.jsx";

const StatementTabPanel = ({sendChange, cancel, editLine, setEditLine, operators}) => {
    const blockList = editLine && editLine.blockList;
    const [blinkIndex, setBlinkIndex] = useState(blockList ? blockList.length - 1 : -1);
    return (
        <div
            style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
            }}
        >
            <StatementTabPanelContext.Provider value={{
                sendChange,
                cancel,
                editLine,
                setEditLine,
                blinkIndex,
                setBlinkIndex,
                operators
            }}>
                <UpSection/>
                <DownSection/>
            </StatementTabPanelContext.Provider>
        </div>
    );
}
StatementTabPanel.propTypes = {
    sendChange: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    editLine: PropTypes.object.isRequired,
    setEditLine: PropTypes.func.isRequired,
    operators: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
}
export default StatementTabPanel;