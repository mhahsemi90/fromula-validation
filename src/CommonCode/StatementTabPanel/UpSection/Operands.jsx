import {Tab, Tabs} from "@mui/material";
import {useContext, useState} from "react";
import OperandsTabPanel from "./OperandsTabPanel.jsx";
import {MainFrameContext} from "../../../MainContext.jsx";


const Operands = () => {
    const {mainOperands, lang} = useContext(MainFrameContext);
    const [index, setIndex] = useState(0)
    return (
        <div
            className={'flex w-1/2 h-full shadow-e-5'}
        >
            <div
                className={'flex border-r-gray-50 h-full'}
            >
                <Tabs
                    value={index}
                    onChange={(event, newValue) => setIndex(newValue)}
                    orientation="vertical"
                    variant="scrollable">
                    {mainOperands.map((object, i) => {
                        return (<Tab label={lang === 'en' ? object.enTitle : object.title} value={i} key={i}/>)
                    })}
                </Tabs>
            </div>
            <div
                className={'w-full m-1 p-2.5 shadow-e-3'}
            >
                {mainOperands.map((object, i) => {
                    return (
                        <OperandsTabPanel object={object} index={index} i={i} key={i}/>)
                })}
            </div>
        </div>
    );
}
export default Operands;