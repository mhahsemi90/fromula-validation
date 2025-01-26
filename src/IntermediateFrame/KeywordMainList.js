import BlockType from "../GenerateLineOfBlocksListFromStatementList/BlockType.js";

const KeywordMainList = [
    {
        type: BlockType.KEYWORD,
        code: "let",
        title: "متغییر",
    },
    {
        type: BlockType.KEYWORD,
        code: "var",
        title: "متغییر",
    },
    {
        type: BlockType.KEYWORD,
        code: "const",
        title: "ثابت",
    },
    {
        type: BlockType.KEYWORD,
        code: "if",
        title: "اگر",
    },
    {
        type: BlockType.KEYWORD,
        code: "for",
        title: "حلقه",
    },
];
export default KeywordMainList