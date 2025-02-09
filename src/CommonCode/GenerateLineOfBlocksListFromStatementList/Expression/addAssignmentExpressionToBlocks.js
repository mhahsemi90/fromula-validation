import addExpressionToBlocks from "../addExpressionToBlocks.js";
import BlockType from "../../BlockType.js";
import {getOperatorFromMainList} from "../../getElementFromMainList.js";
import Block from "../../../ProjectObject/Block.js";

const addAssignmentExpressionToBlocks = (blocks, expression) => {
    const operator = getOperatorFromMainList(expression.operator);
    addExpressionToBlocks(blocks, expression.leftChild)
    blocks.push(
        new Block (BlockType.OPERATOR,operator.title,operator.code,operator.code)
    );
    addExpressionToBlocks(blocks, expression.rightChild)
}
export default addAssignmentExpressionToBlocks;