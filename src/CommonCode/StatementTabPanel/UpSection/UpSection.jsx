import Operands from "./Operands.jsx";
import Operators from "./Operators.jsx";

const UpSection = () => {
    return (
        <div
            className={'flex flex-row box-border w-full h-3/5 p-1'}
        >
            <Operands/>
            <Operators/>
        </div>
    );
}
export default UpSection;