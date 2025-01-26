import BlockType from "../GenerateLineOfBlocksListFromStatementList/BlockType.js";

const OperatorsMainList = [
    {
        type: BlockType.BINARY_OPERATOR,
        code: "+",
        title: "+",
    },
    {
        type: BlockType.BINARY_OPERATOR,
        code: "-",
        title: "-",
    },
    {
        type: BlockType.BINARY_OPERATOR,
        code: "*",
        title: "×",
    },
    {
        type: BlockType.BINARY_OPERATOR,
        code: "/",
        title: "÷",
    },
    {
        type: BlockType.BINARY_OPERATOR,
        code: "%",
        title: "%",
    },
    {
        type: BlockType.ASSIGNMENT,
        code: "=",
        title: "=",
    },
    {
        type: BlockType.BINARY_OPERATOR,
        code: "==",
        title: "==",
    },
    {
        type: BlockType.BINARY_OPERATOR,
        code: "!=",
        title: "!=",
    },
    {
        type: BlockType.BINARY_OPERATOR,
        code: ">",
        title: ">",
    },
    {
        type: BlockType.BINARY_OPERATOR,
        code: "<",
        title: "<",
    },
    {
        type: BlockType.BINARY_OPERATOR,
        code: "&&",
        title: "&&",
    },
    {
        type: BlockType.BINARY_OPERATOR,
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
];
export default OperatorsMainList;