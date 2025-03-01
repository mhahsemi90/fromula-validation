import {Paper, Typography} from "@mui/material";
import {Button} from "antd";
import PropTypes from "prop-types";
import generateScript from "./generateScript.js";
import Client from "../../Client.js";
import {gql} from "@apollo/client";
import {useContext, useEffect, useState} from "react";
import {BasicFrameContext, MainFrameContext} from "../../MainContext.jsx";
import B from "../../BundleConst/B.js";
import Line from "../../ProjectObject/Line.js";
import LineType from "../LineType.js";
import {getKeywordFromMainList, getOperatorFromMainList} from "../getElementFromMainList.js";
import Block from "../../ProjectObject/Block.js";
import BlockType from "../BlockType.js";

const verifyScript = (formulaString, setResult, t) => {
    Client
    .query({
        query: gql`query FormulaValidation( $formula: String ) {
            formulaValidation(formula: $formula)
        }`,
        variables: {
            formula: formulaString
        }
    })
    .then((result) => {
        result ?
            setResult(result.data.formulaValidation === "OK" ? t(B.F_VERIFIED) : result.data.formulaValidation)
            : []
    });
};
const creatReturnResult = (formulaString, row, result, setResult, t) => {
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
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '5%',
                    boxSizing: 'border-box',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    sx={{
                        display: 'flex',
                        whiteSpace: 'pre-wrap',
                        width: '100%',
                        height: '100%',
                        boxSizing: 'border-box',
                        justifyContent: 'center',
                        backgroundColor: result === t(B.F_NOT_VERIFIED) ? '#ffff99' : result === t(B.F_VERIFIED) ? '#99ff99' : '#ff9999',
                    }}
                >
                    {result}
                </Typography>
                <Button
                    type={'primary'}
                    onClick={() => verifyScript(formulaString, setResult, t)}>
                    {t(B.F_VERIFY)}
                </Button>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    width: '100%',
                    height: '95%',
                    overflow: 'auto',
                }}
            >
                <div
                    style={{
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
                        {formulaString}
                    </Typography>
                </div>
                <div
                    style={{
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
                </div>
            </div>
        </Paper>
    )
}

const getDeclarationBlockList = (varName, getOperandFromMainList) => {
    const blockList = [];
    blockList.push(getKeywordFromMainList('let'));
    blockList.push(getOperandFromMainList(varName.code));
    blockList.push(getOperatorFromMainList('='));
    blockList.push(
        new Block(
            BlockType.LITERAL,
            varName.type === BlockType.STRING_VARIABLE ? '' : 0,
            varName.type === BlockType.STRING_VARIABLE ? '' : 0,
            varName.type === BlockType.STRING_VARIABLE ? '' : 0,
        )
    );
    return blockList;
};
const getNewLinesOfBlocks = (linesOfBlocks, resultVarNameList, getOperandFromMainList) => {
    const newLinesOfBlocks = [];
    if (resultVarNameList && resultVarNameList.length > 0)
        resultVarNameList.forEach(varName => {
            newLinesOfBlocks.push(
                new Line(
                    1,
                    0,
                    getDeclarationBlockList(varName, getOperandFromMainList),
                    LineType.VARIABLE_DECLARATION_STATEMENT,
                    0,
                    null
                )
            )
        });
    newLinesOfBlocks.push(...linesOfBlocks);
    if (resultVarNameList && resultVarNameList.length > 0)
        newLinesOfBlocks.push(
            new Line(
                1,
                0,
                [getOperandFromMainList('_result')],
                LineType.RETURN_STATEMENT,
                0,
                null
            )
        );
    return newLinesOfBlocks;
}
const FinalScriptFrame = ({linesOfBlocks}) => {
    const {getOperandFromMainList, t} = useContext(MainFrameContext);
    const {resultVarNameList} = useContext(BasicFrameContext);
    const [result, setResult] = useState(t(B.F_NOT_VERIFIED));
    const [formulaString, setFormulaString] = useState('');
    const [row, setRow] = useState('');
    useEffect(() => {
        setResult(t(B.F_NOT_VERIFIED));
        const newLinesOfBlocks = getNewLinesOfBlocks(linesOfBlocks, resultVarNameList, getOperandFromMainList);
        const formulaAllCharacter = generateScript(0, newLinesOfBlocks);
        let lineNumber = 1;
        let formula = '';
        let countLine = formulaAllCharacter.length > 0 ? `${lineNumber++}  : ` : '';
        formulaAllCharacter.forEach((item) => {
            formula += item;
            if (item === '\n') {
                countLine += `\n${lineNumber++}${lineNumber < 11 ? '  ' : ''}: `;
            }
        });
        setFormulaString(formula);
        setRow(countLine);
    }, [linesOfBlocks, resultVarNameList, setResult, t]);
    return creatReturnResult(formulaString, row, result, setResult, t);
}
FinalScriptFrame.propTypes = {
    linesOfBlocks: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
}
export default FinalScriptFrame;