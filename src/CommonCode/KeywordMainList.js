import BlockType from "./BlockType.js";

const KeywordMainList = [
    {
        type: BlockType.KEYWORD,
        code: "let",
        enTitle: "let",
        title: "متغییر",
    },
    {
        type: BlockType.KEYWORD,
        code: "var",
        enTitle: "var",
        title: "متغییر",
    },
    {
        type: BlockType.KEYWORD,
        code: "const",
        enTitle: "const",
        title: "ثابت",
    },
    {
        type: BlockType.KEYWORD,
        code: "if",
        enTitle: "if",
        title: "اگر",
    },
    {
        type: BlockType.KEYWORD,
        code: "for",
        enTitle: "for",
        title: "حلقه",
    },
    {
        type: BlockType.KEYWORD,
        code: "else",
        enTitle: "else",
        title: "در غیر این صورت",
    },
    {
        type: BlockType.KEYWORD,
        code: "else if",
        enTitle: "else if",
        title: "در غیر این صورت اگر",
    },
    {
        type: BlockType.KEYWORD,
        code: "return",
        enTitle: "return",
        title: "مقدار بازگشتی",
    },
    {
        type: BlockType.KEYWORD,
        code: "_result",
        enTitle: "result",
        title: "مقدار اولیه",
    },
];
export default KeywordMainList