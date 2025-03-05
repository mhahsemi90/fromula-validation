import {Button, Typography} from "antd";
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

const {Paragraph} = Typography;
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
const creatReturnResult = (formulaString, row, result, setResult, theme, t) => {
    const bgColor = result === t(B.F_NOT_VERIFIED) ? 'bg-[#ffff99]' : result === t(B.F_VERIFIED) ? 'bg-[#99ff99]' : 'bg-[#ff9999]';
    return (
        <div className={'flex flex-col w-1/2 h-full box-border m-1 p-1 shadow-e-5 rounded'}>
            <div className={`flex justify-center box-border w-full h-[5%] ${theme}`}>
                <Paragraph
                    className={`flex whitespace-pre-wrap justify-center box-border size-full ${bgColor}`}
                >
                    {result}
                </Paragraph>
                <Button
                    className={'h-auto'}
                    type={'primary'}
                    onClick={() => verifyScript(formulaString, setResult, t)}>
                    {t(B.F_VERIFY)}
                </Button>
            </div>
            <div className={'flex flex-row-reverse w-full h-[95%] overflow-auto'}>
                <div className={'w-[95%] whitespace-pre'}>
                    <Paragraph
                        className={'flex whitespace-pre-wrap box-border size-full'}
                    >
                        {formulaString}
                    </Paragraph>
                </div>
                <div className={'w-[5%] whitespace-pre'}>
                    <Paragraph
                        className={'flex whitespace-pre-wrap box-border size-full'}
                    >
                        {row}
                    </Paragraph>
                </div>
            </div>
        </div>
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
            varName.type === BlockType.STRING_VARIABLE ? "''" : '0',
            varName.type === BlockType.STRING_VARIABLE ? "''" : '0',
            varName.type === BlockType.STRING_VARIABLE ? "''" : '0',
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
    const {getOperandFromMainList, theme, t} = useContext(MainFrameContext);
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
    }, [getOperandFromMainList, linesOfBlocks, resultVarNameList, setResult, t]);
    return creatReturnResult(formulaString, row, result, setResult, theme, t);
}
FinalScriptFrame.propTypes = {
    linesOfBlocks: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
}
export default FinalScriptFrame;