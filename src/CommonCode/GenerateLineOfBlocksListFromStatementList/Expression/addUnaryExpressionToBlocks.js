import Block from "../../../ProjectObject/Block.js";
import BlockType from "../../BlockType.js";
import addExpressionToBlocks from "../addExpressionToBlocks.js";
import {getOperatorFromMainList} from "../../getElementFromMainList.js";

const addUnaryExpressionToBlocks = (blocks, expression) => {
    const operator = getOperatorFromMainList(expression.operator)
    blocks.push(
        new Block(BlockType.UNARY_OPERATOR ,operator.title,operator.code,operator.code)
    );
    addExpressionToBlocks(blocks, expression.argument);
}
export default addUnaryExpressionToBlocks;