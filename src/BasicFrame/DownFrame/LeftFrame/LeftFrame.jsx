import FormulaComponent from "./FormulaComponent/FormulaComponent.jsx";
import {useContext} from "react";
import {MainFrameContext} from "../../../MainContext.jsx";

const LeftFrame = () => {
    const {theme} = useContext(MainFrameContext);
    return (
        <div
            className={`flex flex-col flex-wrap items-start box-border w-1/2 h-full m-1 p-1 overflow-auto shadow-e-3 rounded ${theme}`}
        >
            <FormulaComponent/>
        </div>
    );
}
export default LeftFrame;