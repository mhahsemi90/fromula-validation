import {useState} from "react";
import Line from "../ProjectObject/Line.js";
import UpFrame from "./UpFrame/UpFrame.jsx";
import DownFrame from "./DownFrame/DownFrame.jsx";
import LineType from "../CommonCode/LineType.js";
import {IntermediateFrameContext} from "../MainContext.jsx";

const IntermediateFrame = () => {
    const [lineToEdit, setLineToEdit] = useState(new Line());
    const [activeLineToEditRow, setActiveLineToEditRow] = useState(-1);
    const [type, setType] = useState(
        lineToEdit.lineType ?
            lineToEdit.lineType :
            LineType.EXPRESSION_STATEMENT);
    return (
        <IntermediateFrameContext.Provider value={{
            lineToEdit,
            setLineToEdit,
            activeLineToEditRow,
            setActiveLineToEditRow,
            type,
            setType,
        }}>
            <UpFrame/>
            <DownFrame/>
        </IntermediateFrameContext.Provider>
    )
}
export default IntermediateFrame
