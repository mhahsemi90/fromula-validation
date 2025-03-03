import {Button} from "antd";
import {useContext, useId} from "react";
import EditBlock from "./EditBlock.jsx";
import {MainFrameContext, StatementTabPanelContext} from "../../../MainContext.jsx";
import B from "../../../BundleConst/B.js";
import {CloseOutlined, SendOutlined} from "@ant-design/icons";

const DownSection = () => {
    const {t} = useContext(MainFrameContext);
    const {editLine, sendChange, cancel} = useContext(StatementTabPanelContext);
    const blockList = editLine && editLine.blockList;
    const id = useId();
    return (
        <div
            className={'flex box-border w-full h-2/5 p-1'}
        >
            <div
                className={'flex flex-col justify-between box-border size-full m-1 p-1 shadow-e-5'}
            >
                <div
                    className={'flex items-center justify-center flex-wrap box-border overflow-auto'}
                >
                    {blockList && blockList.map((block, index) =>
                        (<EditBlock block={block} index={index} key={`${id}-${index}`}/>)
                    )}
                </div>
                <div className={'flex justify-center box-border'}>
                    <Button
                        type={'primary'}
                        icon={<SendOutlined/>}
                        onClick={sendChange}
                    >{t(B.F_SEND)}</Button>
                    <Button
                        type={'primary'}
                        icon={<CloseOutlined/>}
                        onClick={cancel}
                    >{t(B.F_CANCEL)}</Button>
                </div>
            </div>
        </div>
    );
}
export default DownSection;