import {Paper, Typography} from "@mui/material";
import PropTypes from "prop-types";
import generateScript from "./generateScript.js";
import {gql, useQuery} from "@apollo/client";

const creatReturnResult = (content,result) => {
    return (
        <Paper
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
                height: '100%',
                boxSizing: 'border-box',
                margin: '5px',
                padding: '5px',
                whiteSpace: 'pre',
            }}
        >
            <Typography

                sx={{
                    display: 'flex',
                    whiteSpace: 'pre-wrap',
                    width: '100%',
                    height: '5%',
                    boxSizing: 'border-box',
                    justifyContent: 'center',
                    bgcolor: result && result === "OK" ? '#99ff99' : '#ff9999',
                }}
            >
                {result}
            </Typography>
            <Typography
                sx={{
                    display: 'flex',
                    whiteSpace: 'pre-wrap',
                    width: '100%',
                    height: '95%',
                    boxSizing: 'border-box',
                    overflow: 'auto',
                }}
            >
                {content}
            </Typography>
        </Paper>
    )
}
const RightFrame = ({linesOfBlocks}) => {
    const formulaAllCharacter = generateScript(linesOfBlocks);
    let formulaForQuery = '';
    let formulaString = [];
    let lineNumber = 1;
    formulaString += `${lineNumber++}${lineNumber<10?' ':''} : `
    formulaAllCharacter.forEach((item) => {
        formulaForQuery += item;
        if(item === '\n')
            formulaString += `\n${lineNumber++}${lineNumber<11?'  ':''}: `;
        else
            formulaString += item;
    })
    const MAIN_QUERY = gql`
        query FormulaValidation( $script: String ) {
            formulaValidation(formula: $script)
        }
    `;
    const {loading, error, data} = useQuery(MAIN_QUERY,{variables: { script:formulaForQuery },});
    if (loading) return creatReturnResult("Loading...","Loading...");
    if (error) return creatReturnResult(formulaString,error.message);
    return creatReturnResult(formulaString, data.formulaValidation ? "OK" : "ERROR");
}
RightFrame.propTypes = {
    linesOfBlocks: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
}
export default RightFrame;