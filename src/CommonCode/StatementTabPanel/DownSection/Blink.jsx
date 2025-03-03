import PropTypes from "prop-types";

const Blink = ({setBlinkIndex, blinkIndex, index}) => {
    const opacity = index === blinkIndex ? 'opacity-100' : 'opacity-0';
    const animation = index === blinkIndex ? 'animate-blink' : '';
    return (
        <div
            onClick={() => setBlinkIndex(index)}
            className={`flex items-center justify-center box-border h-full p-px text-[2vw] text-gray-500 ${opacity} ${animation}`}
        >
            I
        </div>
    );
}
Blink.propTypes = {
    blinkIndex: PropTypes.number.isRequired,
    setBlinkIndex: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
}
export default Blink;