import {Box, Paper, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {gql, useQuery} from "@apollo/client";

const creatReturnResult = (validationResult, result) => {
    result = validationResult ? validationResult.validationMessage : result;
    let content = '';
    let lineNumber = 1;
    let row = validationResult && validationResult.generatedFormula.length > 0 ? `${lineNumber++}  : ` : '';
    validationResult && validationResult.generatedFormula.forEach((item) => {
        content += item;
        row += `\n${lineNumber++}${lineNumber < 11 ? '  ' : ''}: `;
    });
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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    width: '100%',
                    height: '95%',
                    overflow: 'auto',
                }}
            >
                <Box
                    sx={{
                        width: '95%',
                        whiteSpace: 'pre',
                    }}
                >
                    <Typography
                        sx={{
                            display: 'flex',
                            whiteSpace: 'pre-wrap',
                            width: '100%',
                            height: '100%',
                            boxSizing: 'border-box',
                        }}
                    >
                        {content}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: '5%',
                        whiteSpace: 'pre',
                    }}
                >
                    <Typography
                        sx={{
                            display: 'flex',
                            whiteSpace: 'pre-wrap',
                            width: '100%',
                            height: '100%',
                            boxSizing: 'border-box',
                        }}
                    >{row}</Typography>
                </Box>
            </Box>
        </Paper>
    )
}

function removeTypename(obj) {
    if (Array.isArray(obj)) {
        return obj.map(removeTypename);
    } else if (obj !== null && typeof obj === 'object') {
        const {__typename, ...rest} = obj;
        Object.keys(rest).forEach((key) => {
            rest[key] = removeTypename(rest[key]);
        });
        return rest;
    }
    return obj;
}

const FinalScriptFrame = ({linesOfBlocks}) => {
    const lineList =  removeTypename(linesOfBlocks);
    const MAIN_QUERY = gql`
        query GenerateFormula( $lineList: [LineInput] ) {
            generateFormula(lineList: $lineList){
                generatedFormula
                validationMessage
            }
        }
    `;
    const {loading, error, data} = useQuery(MAIN_QUERY, {variables: {lineList: lineList},});
    if (loading) return creatReturnResult(null, "Loading...");
    if (error) return creatReturnResult(null, error.message);
    return creatReturnResult(data.generateFormula, data.generateFormula ? "OK" : "ERROR");
}
FinalScriptFrame.propTypes = {
    linesOfBlocks: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
}
export default FinalScriptFrame;