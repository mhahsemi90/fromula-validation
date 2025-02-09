import TabPanel from "../TabPanel.jsx";
import {Button, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import * as Icons from "@mui/icons-material";
import PropTypes from "prop-types";
import Block from "../../../../ProjectObject/Block.js";
import BlockType from "../../../../CommonCode/BlockType.js";
import Line from "../../../../ProjectObject/Line.js";
import {useContext, useState} from "react";
import {getOperandFromMainList} from "../../../../CommonCode/getElementFromMainList.js";
import B from "../../../../BundleConst/B.js";
import {IntermediateFrameContext, MainFrameContext} from "../../../../MainContext.jsx";

function addEditBlock(lineToEdit, setLineToEdit, setBlinkIndex, blinkIndex, value) {
    const item = getOperandFromMainList(value);
    console.log(item, value);
    const blockList =
        lineToEdit.blockList ?
            [
                ...lineToEdit.blockList.slice(0, blinkIndex + 1),
                new Block(BlockType.LABEL, item.title, item.enTitle, item.code),
                ...lineToEdit.blockList.slice(blinkIndex + 1)
            ] :
            [
                new Block(BlockType.LABEL, item.title, item.enTitle, item.code)
            ];
    setLineToEdit(
        new Line(
            lineToEdit.row,
            lineToEdit.lineLevel,
            blockList
        )
    );
    setBlinkIndex(blinkIndex + 1);
}

const OperandsTabPanel = ({object, index, i}) => {
    const {lang, t} = useContext(MainFrameContext);
    const {lineToEdit, setLineToEdit, blinkIndex, setBlinkIndex} = useContext(IntermediateFrameContext);
    const [value, setValue] = useState(object.items ? object.items[0].code : '');
    return (
        <TabPanel label={i} value={index} key={i}>
            <RadioGroup
                value={value}
                onChange={(e) => setValue(e.target.value)}
                sx={{display: 'flex', flexDirection: 'column'}}
            >
                {object.items.map((item, s) => {
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
                    onClick={() => addEditBlock(lineToEdit, setLineToEdit, setBlinkIndex, blinkIndex, value, lang)}
                    sx={{
                        alignSelf: 'flex-end',
                        position: 'sticky',
                        bottom: '0px',
                        right: '5px',
                    }}
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
