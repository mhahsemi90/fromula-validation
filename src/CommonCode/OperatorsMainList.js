import BlockType from "./BlockType.js";

const ArithmeticOperatorList = [
    {
        type: BlockType.ARITHMETIC_OPERATOR,
        code: "+",
        title: "+",
        enTitle: "+",
    },
    {
        type: BlockType.ARITHMETIC_OPERATOR,
        code: "-",
        title: "-",
        enTitle: "-",
    },
    {
        type: BlockType.ARITHMETIC_OPERATOR,
        code: "*",
        title: "×",
        enTitle: "*",
    },
    {
        type: BlockType.ARITHMETIC_OPERATOR,
        code: "/",
        title: "÷",
        enTitle: "/",
    },
    {
        type: BlockType.ARITHMETIC_OPERATOR,
        code: "%",
        title: "%",
        enTitle: "%",
    },
    {
        type: BlockType.ARITHMETIC_OPERATOR,
        code: "++",
        title: "++",
        enTitle: "++",
    },
    {
        type: BlockType.ARITHMETIC_OPERATOR,
        code: "--",
        title: "--",
        enTitle: "--",
    },
    {
        type: BlockType.ARITHMETIC_OPERATOR,
        code: "**",
        title: "××",
        enTitle: "**",
    },
]
const AssignmentOperatorList = [
    {
        type: BlockType.ASSIGNMENT_OPERATOR,
        code: "=",
        title: "=",
        enTitle: "=",
    },
    {
        type: BlockType.ASSIGNMENT_OPERATOR,
        code: "+=",
        title: "+=",
        enTitle: "+=",
    },
    {
        type: BlockType.ASSIGNMENT_OPERATOR,
        code: "-=",
        title: "-=",
        enTitle: "-=",
    },
    {
        type: BlockType.ASSIGNMENT_OPERATOR,
        code: "*=",
        title: "×=",
        enTitle: "*=",
    },
    {
        type: BlockType.ASSIGNMENT_OPERATOR,
        code: "/=",
        title: "÷=",
        enTitle: "/=",
    },
    {
        type: BlockType.ASSIGNMENT_OPERATOR,
        code: "%=",
        title: "%=",
        enTitle: "%=",
    },
    {
        type: BlockType.ASSIGNMENT_OPERATOR,
        code: "**=",
        title: "**=",
        enTitle: "**=",
    }
]
const ComparisonOperatorList = [
    {
        type: BlockType.COMPARISON_OPERATOR,
        code: "==",
        title: "==",
        enTitle: "==",
    },
    {
        type: BlockType.COMPARISON_OPERATOR,
        code: "===",
        title: "===",
        enTitle: "===",
    },
    {
        type: BlockType.COMPARISON_OPERATOR,
        code: "!=",
        title: "!=",
        enTitle: "!=",
    },
    {
        type: BlockType.COMPARISON_OPERATOR,
        code: "!==",
        title: "!==",
        enTitle: "!==",
    },
    {
        type: BlockType.COMPARISON_OPERATOR,
        code: ">",
        title: ">",
        enTitle: ">",
    },
    {
        type: BlockType.COMPARISON_OPERATOR,
        code: "<",
        title: "<",
        enTitle: "<",
    },
    {
        type: BlockType.COMPARISON_OPERATOR,
        code: ">=",
        title: ">=",
        enTitle: ">=",
    },
    {
        type: BlockType.COMPARISON_OPERATOR,
        code: "<=",
        title: "<=",
        enTitle: "<=",
    },
    {
        type: BlockType.COMPARISON_OPERATOR,
        code: "?",
        title: "?",
        enTitle: "?",
    },
]
const LogicalOperatorList = [
    {
        type: BlockType.LOGICAL_OPERATOR,
        code: "!",
        title: "!",
        enTitle: "!",
    },
    {
        type: BlockType.LOGICAL_OPERATOR,
        code: "||",
        title: "||",
        enTitle: "||",
    },
    {
        type: BlockType.LOGICAL_OPERATOR,
        code: "&&",
        title: "&&",
        enTitle: "&&",
    },

]
const BitwiseOperatorList = [
    {
        type: BlockType.BITWISE_OPERATOR,
        code: "&",
        title: "&",
        enTitle: "&",
    },
    {
        type: BlockType.BITWISE_OPERATOR,
        code: "|",
        title: "|",
        enTitle: "|",
    },
    {
        type: BlockType.BITWISE_OPERATOR,
        code: "~",
        title: "~",
        enTitle: "~",
    },
    {
        type: BlockType.BITWISE_OPERATOR,
        code: "^",
        title: "^",
        enTitle: "^",
    },
    {
        type: BlockType.BITWISE_OPERATOR,
        code: ">",
        title: ">",
        enTitle: ">",
    },
    {
        type: BlockType.BITWISE_OPERATOR,
        code: "<<",
        title: "<<",
        enTitle: "<<",
    },
    {
        type: BlockType.BITWISE_OPERATOR,
        code: ">>",
        title: ">>",
        enTitle: ">>",
    },
    {
        type: BlockType.BITWISE_OPERATOR,
        code: ">>>",
        title: ">>>",
        enTitle: ">>>",
    },
]
const NotOperatorList = [
    {
        type: BlockType.OPEN_PARENTHESES,
        code: "(",
        title: "(",
        enTitle: "(",
    },
    {
        type: BlockType.CLOSE_PARENTHESES,
        code: ")",
        title: ")",
        enTitle: ")",
    },
    {
        type: BlockType.SEPARATOR,
        code: ",",
        title: "و",
        enTitle: ",",
    },
];
const OperatorsMainList = [
    ...ArithmeticOperatorList,
    ...AssignmentOperatorList,
    ...ComparisonOperatorList,
    ...LogicalOperatorList,
    //...BitwiseOperatorList,
    ...NotOperatorList
];
export {
    OperatorsMainList,
    ArithmeticOperatorList,
    AssignmentOperatorList,
    ComparisonOperatorList,
    LogicalOperatorList,
    BitwiseOperatorList,
    NotOperatorList
};