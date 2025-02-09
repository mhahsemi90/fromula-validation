import {useState} from "react";
import UpFrame from "./UpFrame/UpFrame.jsx";
import DownFrame from "./DownFrame/DownFrame.jsx";
import LineType from "../CommonCode/LineType.js";
import {BasicFrameContext} from "../MainContext.jsx";
import BlockOfLines from "../ProjectObject/BlockOfLines.js";

const BasicFrame = () => {
    const [blockToEdit, setBlockToEdit] = useState(new BlockOfLines());
    const [activeLineToEditIdList, setActiveLineToEditIdList] = useState([]);
    const [hoverBlockIdList, setHoverBlockIdList] = useState([]);
    const [type, setType] = useState(
        blockToEdit.lineType && blockToEdit.lineType ?
            blockToEdit.lineType :
            LineType.EXPRESSION_STATEMENT
    );
    return (
        <BasicFrameContext.Provider value={{
            blockToEdit,
            setBlockToEdit,
            activeLineToEditIdList,
            setActiveLineToEditIdList,
            hoverBlockIdList,
            setHoverBlockIdList,
            type,
            setType,
        }}>
            <UpFrame/>
            <DownFrame/>
        </BasicFrameContext.Provider>
    )
}
export default BasicFrame;
