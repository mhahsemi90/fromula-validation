import LineType from "../../../../../CommonCode/LineType.js";
import Block from "../../../../../ProjectObject/Block.js";
import BlockType from "../../../../../CommonCode/BlockType.js";
import {getKeywordFromMainList, getOperatorFromMainList} from "../../../../../CommonCode/getElementFromMainList.js";

const generateLine = (line) => {
    const blocks = [];
    if (line.lineType === LineType.IF_STATEMENT) {
        const keyword = getKeywordFromMainList('if')
        const operator = getOperatorFromMainList('(')
        blocks.push(
            new Block(BlockType.KEYWORD, keyword.title,keyword.enTitle,keyword.code)
        );
        blocks.push(
            new Block(BlockType.OPEN_PARENTHESES, operator.title,operator.code,operator.code)
        );
    }
    if (line.lineType === LineType.ELSE_STATEMENT) {
        const keyword = getKeywordFromMainList('else')
        blocks.push(
            new Block(BlockType.KEYWORD, keyword.title,keyword.enTitle,keyword.code)
        );
    }
    if (line.lineType === LineType.ELSE_IF_STATEMENT) {
        const keyword = getKeywordFromMainList('else if')
        const operator = getOperatorFromMainList('(')
        blocks.push(
            new Block(BlockType.KEYWORD, keyword.title,keyword.enTitle,keyword.code)
        );
        blocks.push(
            new Block(BlockType.OPEN_PARENTHESES, operator.title,operator.code,operator.code)
        );
    }
    if (line.lineType === LineType.FOR_STATEMENT) {
        const keyword = getKeywordFromMainList('for')
        const operator = getOperatorFromMainList('(')
        blocks.push(
            new Block(BlockType.KEYWORD, keyword.title,keyword.enTitle,keyword.code)
        );
        blocks.push(
            new Block(BlockType.OPEN_PARENTHESES, operator.title,operator.code,operator.code)
        );
    }
    if (line.lineType === LineType.RETURN_STATEMENT) {
        const keyword = getKeywordFromMainList('return')
        blocks.push(
            new Block(BlockType.KEYWORD, keyword.title,keyword.enTitle,keyword.code)
        );
    }
    blocks.push(...line.blockList);
    if (line.lineType === LineType.IF_STATEMENT ||
    line.lineType === LineType.ELSE_IF_STATEMENT ||
        line.lineType === LineType.FOR_STATEMENT) {
        const operator = getOperatorFromMainList(')')
        blocks.push(
            new Block(BlockType.CLOSE_PARENTHESES, operator.title,operator.code,operator.code)
        );
    }
    return blocks;
}
export default generateLine;