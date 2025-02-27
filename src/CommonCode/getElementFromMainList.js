import KeywordMainList from "./KeywordMainList.js";
import {
    ArithmeticOperatorList,
    ComparisonOperatorList,
    LogicalOperatorList,
    OperatorsMainList
} from "./OperatorsMainList.js";
import {OperandsMainList, ResultVarNameList} from "./OperandsMainList.js";
import BlockType from "./BlockType.js";

const getArithmeticOperatorFromMainList = (element) => {
    let operator = {};
    ArithmeticOperatorList
        .forEach((item) => {
            if (item.code === element)
                operator = item;
        });
    return operator;
}
const getLogicalOperatorFromMainList = (element) => {
    let operator = {};
    const allOperators = [...LogicalOperatorList, ...ComparisonOperatorList];
    allOperators
        .forEach((item) => {
            if (item.code === element)
                operator = item;
        });
    return operator;
}
const getOperatorFromMainList = (element) => {
    let operator = {};
    OperatorsMainList
        .forEach((item) => {
            if (item.code === element)
                operator = item;
        });
    return operator;
}
const getOperandFromMainList = (element) => {
    let operator = {};
    OperandsMainList
        .forEach((group) => {
            group.items
                .forEach((item) => {
                    if (item.code === element)
                        operator = item;
                });
        });
    if (!operator.code)
        ResultVarNameList
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
const getKeywordFromMainList = (element) => {
    let operator = {};
    KeywordMainList
        .forEach((item) => {
            if (item.code === element)
                operator = item;
        });
    return operator;
}
export {getOperatorFromMainList, getOperandFromMainList, getKeywordFromMainList};