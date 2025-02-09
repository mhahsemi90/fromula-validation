import {Box, Chip, Paper} from "@mui/material";
import Line from "../../../../ProjectObject/Line.js";
import Block from "../../../../ProjectObject/Block.js";
import {useContext} from "react";
import {IntermediateFrameContext, MainFrameContext} from "../../../../MainContext.jsx";

function addEditBlock(lineToEdit, setLineToEdit, setBlinkIndex, blinkIndex, operator) {
    const blockList =
        lineToEdit.blockList ?
            [
                ...lineToEdit.blockList.slice(0, blinkIndex + 1),
                new Block(operator.type, operator.title, operator.code, operator.code),
                ...lineToEdit.blockList.slice(blinkIndex + 1)
            ] :
            [
                new Block(operator.type, operator.title, operator.code, operator.code)
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

const Operators = () => {
    const {operators, lang} = useContext(MainFrameContext);
    const {lineToEdit, setLineToEdit, blinkIndex, setBlinkIndex} = useContext(IntermediateFrameContext);
    return (
        <Paper
            elevation={2}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxSizing: 'border-box',
                width: '50%',
                height: '100%',
            }}
        >
            <Box
                sx={{
                    boxSizing: 'border-box',
                    width: '50%',
                    height: '50%',
                }}
            >{
                operators.map((operator, index) => (
                    <Chip
                        label={lang === 'en' ? operator.code : operator.title}
                        color="primary"
                        variant="outlined"
                        onClick={() => addEditBlock(lineToEdit, setLineToEdit, setBlinkIndex, blinkIndex, operator)}
                        key={index}
                        sx={{
                            margin: '5px',
                        }}
                    />
                ))
            }</Box>
        </Paper>
    );
}
export default Operators;