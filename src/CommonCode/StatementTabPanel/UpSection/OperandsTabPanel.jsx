import {Button, Radio} from 'antd';
import PropTypes from "prop-types";
import {useContext, useState} from "react";
import {MainFrameContext, StatementTabPanelContext} from "../../../MainContext.jsx";
import B from "../../../BundleConst/B.js";
import Block from "../../../ProjectObject/Block.js";
import BlockType from "../../BlockType.js";
import Line from "../../../ProjectObject/Line.js";
import {SendOutlined} from "@ant-design/icons";

function addOperand(editLine, setEditLine, blinkIndex, setBlinkIndex, value, getOperandFromMainList) {
    const item = getOperandFromMainList(value);
    const blockList =
        editLine.blockList ?
            [
                ...editLine.blockList.slice(0, blinkIndex + 1),
                new Block(BlockType.LABEL, item.title, item.enTitle, item.code),
                ...editLine.blockList.slice(blinkIndex + 1)
            ] :
            [
                new Block(BlockType.LABEL, item.title, item.enTitle, item.code)
            ];
    setEditLine(
        new Line(
            editLine.row,
            editLine.lineLevel,
            blockList,
            editLine.lineType,
            editLine.id,
            editLine.parentId
        )
    );
    setBlinkIndex(blinkIndex + 1);
}

const OperandsTabPanel = ({object}) => {
    const {getOperandFromMainList, lang, t} = useContext(MainFrameContext);
    const {editLine, setEditLine, blinkIndex, setBlinkIndex,} = useContext(StatementTabPanelContext);
    const [value, setValue] = useState(object.blockList && object.blockList.length ? object.blockList[0].code : '');
    const onChange = (e) => {
        setValue(e.target.value);
    };
    return (<>
            <Radio.Group
                className={'flex flex-col gap-6'}
                onChange={onChange}
                value={value}
                options={
                    object.blockList &&
                    object.blockList.map((block) => {
                        return {
                            value: block.code,
                            label: lang === 'en' ? block.enTitle : block.title,
                        };
                    })
                }
            />
            <Button
                type={'primary'}
                icon={<SendOutlined/>}
                className={'self-end sticky bottom-1 p-2'}
                onClick={() => addOperand(editLine, setEditLine, blinkIndex, setBlinkIndex, value, getOperandFromMainList)}
            >{t(B.F_SEND)}</Button>
        </>
    );
}
OperandsTabPanel.propTypes = {
    object: PropTypes.object.isRequired,
}
export default OperandsTabPanel;
