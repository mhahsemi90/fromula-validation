import OperatorsMainList from "./OperatorsMainList.js";
import OperandsMainList from "./OperandsMainList.js";
import KeywordMainList from "./KeywordMainList.js";

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