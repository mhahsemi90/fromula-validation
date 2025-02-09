import {Box} from "@mui/material";
import PropTypes from "prop-types";
import {useContext} from "react";
import {IntermediateFrameContext} from "../../../MainContext.jsx";

const Blink = ({index}) => {
    const {blinkIndex, setBlinkIndex} = useContext(IntermediateFrameContext);
    const blink = 'blink 1s step-end infinite';
    return (
        <Box
            onClick={() => setBlinkIndex(index)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                opacity: index === blinkIndex ? '1' : '0',
                height: '100%',
                animation: index === blinkIndex ? blink : 'none',
                padding: '1px',
                fontSize: '2vw',
                color: '#666666',
            }}
        >I
        </Box>
    );
}
Blink.propTypes = {
    index: PropTypes.number.isRequired,
}
export default Blink;