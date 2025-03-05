import FormulaComponent from "./FormulaComponent/FormulaComponent.jsx";
import {useContext} from "react";
import {MainFrameContext} from "../../../MainContext.jsx";

const LeftFrame = () => {
    const {theme} = useContext(MainFrameContext);
    return (
        <div
            className={`flex flex-col items-start flex-wrap w-1/2 h-full overflow-auto box-border m-1 p-1 shadow-e-5 rounded ${theme}`}>
            <FormulaComponent/>
        </div>
    );
}
export default LeftFrame;