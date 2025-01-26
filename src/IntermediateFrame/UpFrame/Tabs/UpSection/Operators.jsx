import {Box, Chip, Paper} from "@mui/material";
import Line from "../../../../ProjectObject/Line.js";
import Block from "../../../../ProjectObject/Block.js";
import PropTypes from "prop-types";

function addEditBlock(editLine, setEditLine, setBlinkIndex, blinkIndex, operator) {
    const blockList =
        editLine.blockList ?
            [
                ...editLine.blockList.slice(0, blinkIndex + 1),
                new Block(operator.type, operator.title, operator.code, operator.code),
                ...editLine.blockList.slice(blinkIndex + 1)
            ] :
            [
                new Block(operator.type, operator.title, operator.code, operator.code)
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

const Operators = ({editLine, setEditLine, setBlinkIndex, blinkIndex, operators, lang}) => {
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
                        onClick={() => addEditBlock(editLine, setEditLine, setBlinkIndex, blinkIndex, operator)}
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
Operators.propTypes = {
    editLine: PropTypes.object.isRequired,
    blinkIndex: PropTypes.number.isRequired,
    setEditLine: PropTypes.func.isRequired,
    setBlinkIndex: PropTypes.func.isRequired,
    operators: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    lang: PropTypes.string.isRequired,
}
export default Operators;