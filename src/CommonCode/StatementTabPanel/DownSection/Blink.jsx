import PropTypes from "prop-types";

const Blink = ({setBlinkIndex, blinkIndex, index}) => {
    const blink = 'blink 1s step-end infinite';
    return (
        <div
            onClick={() => setBlinkIndex(index)}
            style={{
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
        </div>
    );
}
Blink.propTypes = {
    blinkIndex: PropTypes.number.isRequired,
    setBlinkIndex: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
}
export default Blink;