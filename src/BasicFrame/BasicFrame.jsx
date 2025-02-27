import {useState} from "react";
import UpFrame from "./UpFrame/UpFrame.jsx";
import DownFrame from "./DownFrame/DownFrame.jsx";
import {BasicFrameContext} from "../MainContext.jsx";
import ExpressionBlockOfLines from "../ProjectObject/ExpressionBlockOfLines.js";

const BasicFrame = () => {
    const [blockToEdit, setBlockToEdit] = useState(new ExpressionBlockOfLines());
    const [activeLineToEditIdList, setActiveLineToEditIdList] = useState([]);
    const [hoverBlockIdList, setHoverBlockIdList] = useState([]);
    const [resultVarNameList, setResultVarNameList] = useState([]);
    return (
        <BasicFrameContext.Provider value={{
            blockToEdit,
            setBlockToEdit,
            activeLineToEditIdList,
            setActiveLineToEditIdList,
            hoverBlockIdList,
            setHoverBlockIdList,
            resultVarNameList,
            setResultVarNameList,
        }}>
            <UpFrame/>
            <DownFrame/>
        </BasicFrameContext.Provider>
    )
}
export default BasicFrame;
