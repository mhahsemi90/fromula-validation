import {Box, Paper, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import PropTypes from "prop-types";
import OperandsTabPanel from "./OperandsTabPanel.jsx";


const Operands = ({editLine, setEditLine, setBlinkIndex, blinkIndex, operands, lang, t}) => {
    const [index, setIndex] = useState(0)
    return (
        <Paper
            elevation={5}
            sx={{
                display: 'flex',
                height: '100%',
                width: '50%',
            }}
        >
            <Box sx={{display: 'flex', borderRight: 1, borderColor: 'divider', height: '100%'}}>
                <Tabs
                    value={index}
                    onChange={(event, newValue) => setIndex(newValue)}
                    orientation="vertical"
                    variant="scrollable">
                    {operands.map((object, i) => {
                        return (<Tab label={lang === 'en' ? object.code : object.title} value={i} key={i}/>)
                    })}
                </Tabs>
            </Box>
            <Paper
                elevation={3}
                sx={{
                    margin: '5px',
                    padding: '10px',
                    width: '100%',
                }}
            >
                {operands.map((object, i) => {
                    return (
                        <OperandsTabPanel editLine={editLine} setEditLine={setEditLine} setBlinkIndex={setBlinkIndex}
                                          blinkIndex={blinkIndex} object={object} index={index} lang={lang} i={i} t={t}
                                          key={i}/>)
                })}
            </Paper>
        </Paper>
    );
}
Operands.propTypes = {
    editLine: PropTypes.object.isRequired,
    blinkIndex: PropTypes.number.isRequired,
    setEditLine: PropTypes.func.isRequired,
    setBlinkIndex: PropTypes.func.isRequired,
    operands: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    lang: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
}
export default Operands;