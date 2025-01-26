import BlockType from "../BlockType.js";
import StatementType from "./StatementType.js";
import Line from "../../ProjectObject/Line.js";
import Block from "../../ProjectObject/Block.js";
import addExpressionToBlocks from "../addExpressionToBlocks.js";
import addStatementToLineOfBlocksList from "../addStatementToLineOfBlocksList.js";
import {getKeywordFromMainList} from "../../IntermediateFrame/getElementFromMainList.js";

const addIfStatementToLineOfBlocksList = (lineOfBlocksList, statement, row, lineLevel) => {
    const blocks = [];
    if (statement.test)
        addExpressionToBlocks(blocks, statement.test)
    lineOfBlocksList.push(
        new Line(row[0], lineLevel[0], blocks, StatementType.IF_STATEMENT)
    );
    if (statement.consequent) {
        row[0]++;
        switch (statement.consequent.type) {
            case StatementType.BLOCK_STATEMENT:
                addStatementToLineOfBlocksList(lineOfBlocksList, statement.consequent, row, lineLevel);
                break;
            default:
                lineLevel[0]++;
                addStatementToLineOfBlocksList(lineOfBlocksList, statement.consequent, row, lineLevel);
                lineLevel[0]--;
                break;
        }
    }
    if (statement.alternate) {
        row[0]++;
        const blocks = [];
        const keyword = getKeywordFromMainList('else')
        blocks.push(
            new Block(BlockType.KEYWORD, keyword.title,keyword.code,keyword.code)
        );
        lineOfBlocksList.push(
            new Line(row[0], lineLevel[0], blocks, StatementType.ELSE_STATEMENT)
        );
        row[0]++;
        switch (statement.alternate.type) {
            case StatementType.BLOCK_STATEMENT:
                addStatementToLineOfBlocksList(lineOfBlocksList, statement.alternate, row, lineLevel);
                break;
            default:
                lineLevel[0]++;
                addStatementToLineOfBlocksList(lineOfBlocksList, statement.alternate, row, lineLevel);
                lineLevel[0]--;
                break;
        }
    }
}
export default addIfStatementToLineOfBlocksList;