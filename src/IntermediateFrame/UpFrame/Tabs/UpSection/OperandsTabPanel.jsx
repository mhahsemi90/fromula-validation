import TabPanel from "../TabPanel.jsx";
import {Button, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import * as Icons from "@mui/icons-material";
import PropTypes from "prop-types";
import Block from "../../../../ProjectObject/Block.js";
import BlockType from "../../../../GenerateLineOfBlocksListFromStatementList/BlockType.js";
import Line from "../../../../ProjectObject/Line.js";
import {useState} from "react";
import {getOperandFromMainList} from "../../../getElementFromMainList.js";
import B from "../../../../BundleConst/B.js";

function addEditBlock(editLine, setEditLine, setBlinkIndex, blinkIndex, value) {
    const item = getOperandFromMainList(value);
    console.log(item, value);
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
            blockList
        )
    );
    setBlinkIndex(blinkIndex + 1);
}

const OperandsTabPanel = ({editLine, setEditLine, setBlinkIndex, blinkIndex, object, lang, index, i, t}) => {
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
                    onClick={() => addEditBlock(editLine, setEditLine, setBlinkIndex, blinkIndex, value, lang)}
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
    editLine: PropTypes.object.isRequired,
    blinkIndex: PropTypes.number.isRequired,
    setEditLine: PropTypes.func.isRequired,
    setBlinkIndex: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    i: PropTypes.number.isRequired,
    t: PropTypes.func.isRequired,
}
export default OperandsTabPanel;
