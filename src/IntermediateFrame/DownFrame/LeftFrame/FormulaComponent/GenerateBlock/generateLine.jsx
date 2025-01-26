import StatementType from "../../../../../GenerateLineOfBlocksListFromStatementList/Statement/StatementType.js";
import Block from "../../../../../ProjectObject/Block.js";
import BlockType from "../../../../../GenerateLineOfBlocksListFromStatementList/BlockType.js";
import {getKeywordFromMainList, getOperatorFromMainList} from "../../../../getElementFromMainList.js";

const generateLine = (line) => {
    const blocks = [];
    if (line.statementType === StatementType.IF_STATEMENT) {
        const keyword = getKeywordFromMainList('if')
        const operator = getOperatorFromMainList('(')
        blocks.push(
            new Block(BlockType.KEYWORD, keyword.title,keyword.code,keyword.code)
        );
        blocks.push(
            new Block(BlockType.OPEN_PARENTHESES, operator.title,operator.code,operator.code)
        );
    }
    if (line.statementType === StatementType.FOR_STATEMENT) {
        const keyword = getKeywordFromMainList('for')
        const operator = getOperatorFromMainList('(')
        blocks.push(
            new Block(BlockType.KEYWORD, keyword.title,keyword.code,keyword.code)
        );
        blocks.push(
            new Block(BlockType.OPEN_PARENTHESES, operator.title,operator.code,operator.code)
        );
    }
    blocks.push(...line.blockList);
    if (line.statementType === StatementType.IF_STATEMENT ||
        line.statementType === StatementType.FOR_STATEMENT) {
        const operator = getOperatorFromMainList(')')
        blocks.push(
            new Block(BlockType.CLOSE_PARENTHESES, operator.title,operator.code,operator.code)
        );
    }
    return blocks;
}
export default generateLine;