import {Tabs} from 'antd';
import {useContext, useEffect, useState} from "react";
import {MainFrameContext} from "../../../MainContext.jsx";
import OperandsTabPanel from "./OperandsTabPanel.jsx";


const Operands = () => {
    const {mainOperands, lang} = useContext(MainFrameContext);
    const [index, setIndex] = useState(mainOperands && mainOperands[0] ? mainOperands[0].code : '');
    useEffect(() => {
        setIndex(mainOperands && mainOperands[0] ? mainOperands[0].code : '')
    }, [mainOperands]);
    return (
        <div
            className={'flex w-1/2 h-full shadow-e-5 rounded'}
        >
            <div
                className={'flex border-r-gray-50 size-full pr-2'}
            >
                <Tabs
                    className={'size-full'}
                    tabPosition='left'
                    activeKey={index}
                    onChange={setIndex}
                    items={
                        mainOperands.map((object) => {
                            return (
                                {
                                    key: object.code,
                                    label: lang === 'en' ? object.enTitle : object.title,
                                    className: 'size-full !p-1 !pb-2.5',
                                    children:
                                        <div
                                            className={'flex flex-col size-full m-1 p-2 shadow-e-3 rounded overflow-auto'}
                                        >
                                            <OperandsTabPanel object={object}/>
                                        </div>

                                }
                            )
                        })
                    }
                />
            </div>
        </div>
    );
}
export default Operands;