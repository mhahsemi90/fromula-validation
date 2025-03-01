import {Button, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import * as Icons from "@mui/icons-material";
import PropTypes from "prop-types";
import {useContext, useState} from "react";
import Block from "../../../ProjectObject/Block.js";
import BlockType from "../../BlockType.js";
import Line from "../../../ProjectObject/Line.js";
import {MainFrameContext, StatementTabPanelContext} from "../../../MainContext.jsx";
import TabPanel from "../../TabPanel/TabPanel.jsx";
import B from "../../../BundleConst/B.js";

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

const OperandsTabPanel = ({object, index, i}) => {
    const {getOperandFromMainList, lang, t} = useContext(MainFrameContext);
    const {editLine, setEditLine, blinkIndex, setBlinkIndex,} = useContext(StatementTabPanelContext);
    const [value, setValue] = useState(object.blockList && object.blockList.length ? object.blockList[0].code : '');
    return (
        <TabPanel label={i} value={index} key={i}>
            <RadioGroup
                value={value}
                onChange={(e) => setValue(e.target.value)}
                sx={{display: 'flex', flexDirection: 'column'}}
            >
                {object.blockList.map((item, s) => {
                    return (
                        <FormControlLabel
                            control={<Radio/>}
                            value={item.code}
                            label={lang === 'en' ? item.enTitle : item.title}
                            key={s}
                            sx={{
                                margin: '5px',
                            }}>
                        </FormControlLabel>
                    )
                })}
                <Button
                    variant={'outlined'}
                    endIcon={<Icons.Send/>}
                    sx={{
                        alignSelf: 'flex-end',
                        position: 'sticky',
                        bottom: '0px',
                        right: '5px',
                    }}
                    onClick={() => addOperand(editLine, setEditLine, blinkIndex, setBlinkIndex, value, getOperandFromMainList)}
                >{t(B.F_SEND)}</Button>
            </RadioGroup>
        </TabPanel>
    );
}
OperandsTabPanel.propTypes = {
    object: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    i: PropTypes.number.isRequired,
}
export default OperandsTabPanel;
