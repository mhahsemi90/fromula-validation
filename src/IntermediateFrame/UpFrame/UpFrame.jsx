import AllTabs from "./Tabs/AllTabs.jsx";
import {useContext} from "react";
import {MainFrameContext} from "../../MainContext.jsx";

const UpFrame = () => {
    const {theme} = useContext(MainFrameContext);
    return (

        <div className={`flex box-border w-full h-[48%] m-1 p-1 ${theme}`}>
            <AllTabs/>
        </div>

    )
}
export default UpFrame;