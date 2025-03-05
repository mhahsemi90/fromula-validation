import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, Input} from "antd";
import B from "./BundleConst/B.js";
import {changeLanguage} from "./CommonCode/Language.js";
import {MainFrameContext} from "./MainContext.jsx";
import IntermediateFrame from "./IntermediateFrame/IntermediateFrame.jsx";
import BasicFrame from "./BasicFrame/BasicFrame.jsx";
import QueryResultFromStatementList from "./CommonCode/QueryResult/QueryResultFromStatementList.js";
import {
    QueryResultRewritingLinesOfBlockListBaseOnBasicStructure
} from "./CommonCode/QueryResult/QueryResultRewritingLinesOfBlockListBaseOnBasicStructure.js";
import "./i18n.js";
import "./assets/output.css"
import GetOperandForTest from "./CommonCode/QueryResult/GetOperandForTest.js";
import BlockType from "./CommonCode/BlockType.js";
import {GlobalOutlined, SwapOutlined} from "@ant-design/icons";
import LineType from "./CommonCode/LineType.js";
import {getKeywordFromMainList, getOperatorFromMainList} from "./CommonCode/getElementFromMainList.js";
import Line from "./ProjectObject/Line.js";
import Block from "./ProjectObject/Block.js";
import {reformatLineRow} from "./BasicFrame/CommonBasicFrameMethod.js";

const getDeclarationBlockList = (varName, getOperandFromMainList) => {
    const blockList = [];
    const operand = getOperandFromMainList(varName);
    blockList.push(getKeywordFromMainList('let'));
    blockList.push(operand);
    blockList.push(getOperatorFromMainList('='));
    blockList.push(
        new Block(
            BlockType.LITERAL,
            operand.type === BlockType.STRING_VARIABLE ? "''" : '0',
            operand.type === BlockType.STRING_VARIABLE ? "''" : '0',
            operand.type === BlockType.STRING_VARIABLE ? "''" : '0',
        )
    );
    return blockList;
};
const RewritingLinesOfBlockListBaseOnBasicStructure = (linesOfBlocks, setLinesOfBlocks, setFrame, getOperandFromMainList) => {
    const newLinesOfBlocks = [];
    let haveChangeValueLine = false;
    linesOfBlocks.forEach((line) => {
        if (line.lineType === LineType.RETURN_STATEMENT) {
            line.lineType = LineType.EXPRESSION_STATEMENT;
            line.blockList.unshift(getKeywordFromMainList('return'))
            newLinesOfBlocks.push(line);
        } else if (line.lineType === LineType.CHANGE_VALUE_STATEMENT) {
            haveChangeValueLine = true;
            line.lineType = LineType.EXPRESSION_STATEMENT;
            line.blockList.unshift(getOperandFromMainList(line.assignmentOperator.code))
            line.blockList.unshift(getOperandFromMainList(line.resultVar.code))
            newLinesOfBlocks.push(line);
        } else {
            newLinesOfBlocks.push(line);
        }
    })
    if (haveChangeValueLine) {
        newLinesOfBlocks.unshift(
            new Line(
                1,
                0,
                getDeclarationBlockList('_result', getOperandFromMainList),
                LineType.VARIABLE_DECLARATION_STATEMENT,
                0,
                null
            )
        )
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
    }
    reformatLineRow(newLinesOfBlocks)
    setLinesOfBlocks(newLinesOfBlocks);
    setFrame('Intermediate');
};
const changeFrame = (frame, setFrame, linesOfBlocks, setLinesOfBlocks, getOperandFromMainList) => {
    if (frame === 'Intermediate')
        QueryResultRewritingLinesOfBlockListBaseOnBasicStructure(linesOfBlocks, setLinesOfBlocks, setFrame);
    else
        RewritingLinesOfBlockListBaseOnBasicStructure(linesOfBlocks, setLinesOfBlocks, setFrame, getOperandFromMainList);
};

const getFrame = (frame) => {
    switch (frame) {
        case "Intermediate":
            return <IntermediateFrame/>;
        case "Basic":
            return <BasicFrame/>;
    }
};
const MainFrame = () => {
    const [theme, setTheme] = useState('direction-ltr');
    const [lang, setLang] = useState('en');
    const {t, i18n} = useTranslation();
    const [mainOperands, setMainOperands] = useState([]);
    const [localOperands, setLocalOperands] = useState([]);
    const [value, setValue] = useState('');
    const [linesOfBlocks, setLinesOfBlocks] = useState([]);
    const [frame, setFrame] = useState("Intermediate");
    const getOperandFromMainList = (element) => {
        let operator = {};
        mainOperands
            .forEach((group) => {
                group.blockList
                    .forEach((item) => {
                        if (item.code === element)
                            operator = item;
                    });
            });
        if (!operator.code)
            localOperands
                .forEach((item) => {
                    if (item.code === element)
                        operator = item;
                });
        if (!operator.code)
            operator = {
                type: BlockType.VARIABLE,
                code: element,
                enTitle: element,
                title: element
            }
        return operator;
    }
    useEffect(() => {
        GetOperandForTest(setMainOperands);
        setLocalOperands([
            {
                type: BlockType.NUMBER_VARIABLE,
                code: '_result',
                enTitle: 'result',
                title: 'نتیجه'
            }
        ])
    }, [])
    return (
        <div className={'flex box-border flex-col items-center size-full'}
        >
            <div className={'flex box-border flex-row items-center justify-center h-[4%]'}>
                <Input placeholder="تست" value={value} onChange={(e) => setValue(e.target.value)}/>
                <Button
                    type={'primary'}
                    onClick={() => QueryResultFromStatementList(value, setLinesOfBlocks)}
                >{t(B.F_SEND)}</Button>
                <Button
                    type={'primary'}
                    icon={<GlobalOutlined/>}
                    onClick={() => changeLanguage(lang, setLang, i18n, setTheme)}
                >{t(B.F_LANGUAGE)}</Button>
                <Button
                    type={'primary'}
                    icon={<SwapOutlined/>}
                    onClick={() => changeFrame(frame, setFrame, linesOfBlocks, setLinesOfBlocks, getOperandFromMainList)}
                ></Button>
            </div>
            <MainFrameContext.Provider value={{
                theme,
                lang,
                t,
                mainOperands,
                localOperands,
                linesOfBlocks,
                setLinesOfBlocks,
                getOperandFromMainList,
            }}>
                {getFrame(frame)}
            </MainFrameContext.Provider>
        </div>
    )
}
export default MainFrame;