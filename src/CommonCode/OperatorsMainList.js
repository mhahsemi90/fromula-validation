import BlockType from "./BlockType.js";

const OperatorsMainList = [
    {
        type: BlockType.OPERATOR,
        code: "+",
        title: "+",
    },
    {
        type: BlockType.OPERATOR,
        code: "-",
        title: "-",
    },
    {
        type: BlockType.OPERATOR,
        code: "*",
        title: "×",
    },
    {
        type: BlockType.OPERATOR,
        code: "/",
        title: "÷",
    },
    {
        type: BlockType.OPERATOR,
        code: "%",
        title: "%",
    },
    {
        type: BlockType.ASSIGNMENT,
        code: "=",
        title: "=",
    },
    {
        type: BlockType.OPERATOR,
        code: "==",
        title: "==",
    },
    {
        type: BlockType.OPERATOR,
        code: "!=",
        title: "!=",
    },
    {
        type: BlockType.OPERATOR,
        code: ">",
        title: ">",
    },
    {
        type: BlockType.OPERATOR,
        code: "<",
        title: "<",
    },
    {
        type: BlockType.OPERATOR,
        code: "&&",
        title: "&&",
    },
    {
        type: BlockType.OPERATOR,
        code: "||",
        title: "||",
    },
    {
        type: BlockType.OPEN_PARENTHESES,
        code: "(",
        title: "(",
    },
    {
        type: BlockType.CLOSE_PARENTHESES,
        code: ")",
        title: ")",
    },
    {
        type: BlockType.SEPARATOR,
        code: ",",
        title: "و",
    },
    {
        type: BlockType.SEPARATOR,
        code: "+=",
        title: "+=",
    },
];
export default OperatorsMainList;