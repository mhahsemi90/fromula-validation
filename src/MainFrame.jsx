import {useEffect, useState} from "react";
import {ltrCache, ltrTheme} from "./CommonCode/Theme.js";
import {useTranslation} from "react-i18next";
import {Input, InputLabel} from "@mui/material";
import {Button} from "antd";
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
import "./output.css"
import GetOperandForTest from "./CommonCode/QueryResult/GetOperandForTest.js";
import BlockType from "./CommonCode/BlockType.js";
import {GlobalOutlined, SwapOutlined} from "@ant-design/icons";

const changeFrame = (frame, setFrame, linesOfBlocks, setLinesOfBlocks) => {
    if (frame === 'Intermediate')
        QueryResultRewritingLinesOfBlockListBaseOnBasicStructure(linesOfBlocks, setLinesOfBlocks, setFrame);
    else
        setFrame('Intermediate');
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
    const [cache, setCache] = useState(ltrCache);
    const [theme, setTheme] = useState(ltrTheme);
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
                title: 'مقدار بازگشتی'
            }
        ])
    }, [])
    return (
        <div className={'flex box-border flex-col items-center size-full'}
        >
            <div className={'flex box-border flex-row items-center justify-center h-[4%]'}>
                <InputLabel htmlFor="my-input">تست</InputLabel>
                <Input id="my-input" value={value} onChange={(e) => setValue(e.target.value)}/>
                <Button
                    type={'primary'}
                    onClick={() => QueryResultFromStatementList(value, setLinesOfBlocks)}
                >{t(B.F_SEND)}</Button>
                <Button
                    type={'primary'}
                    icon={<GlobalOutlined/>}
                    onClick={() => changeLanguage(lang, setLang, i18n, setCache, setTheme)}
                >{t(B.F_LANGUAGE)}</Button>
                <Button
                    type={'primary'}
                    icon={<SwapOutlined/>}
                    onClick={() => changeFrame(frame, setFrame, linesOfBlocks, setLinesOfBlocks)}
                ></Button>
            </div>
            <MainFrameContext.Provider value={{
                cache,
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