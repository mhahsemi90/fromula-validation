import KeywordMainList from "./KeywordMainList.js";
import {
    ArithmeticOperatorList,
    ComparisonOperatorList,
    LogicalOperatorList,
    OperatorsMainList
} from "./OperatorsMainList.js";

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
const getKeywordFromMainList = (element) => {
    let operator = {};
    KeywordMainList
        .forEach((item) => {
            if (item.code === element)
                operator = item;
        });
    return operator;
}
export {getOperatorFromMainList, getKeywordFromMainList};