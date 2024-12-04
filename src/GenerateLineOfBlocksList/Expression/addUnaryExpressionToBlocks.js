import Block from "../../ProjectObject/Block.js";
import BlockType from "../../ViewBlock/BlockType.js";
import addExpressionToBlocks from "../addExpressionToBlocks.js";

const addUnaryExpressionToBlocks = (blocks, expression) => {
    blocks.push(
        new Block(BlockType.UNARY_OPERATOR, expression.operator, expression.operator)
    );
    addExpressionToBlocks(blocks, expression.argument);
}
export default addUnaryExpressionToBlocks;