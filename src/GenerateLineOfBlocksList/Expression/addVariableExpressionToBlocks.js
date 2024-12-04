import Block from "../../ProjectObject/Block.js";
import BlockType from "../../ViewBlock/BlockType.js";

const addVariableExpressionToBlocks = (blocks, expression) =>{
    blocks.push(
        new Block(BlockType.ID, expression.variable.idName, expression.variable.idName)
    );
    if (expression.initiateValue) {
        blocks.push(
            new Block(BlockType.ASSIGNMENT, '=', '=')
        );
        blocks.push(
            new Block(BlockType.LITERAL, expression.initiateValue.value, expression.initiateValue.value)
        );
    }
}
export default addVariableExpressionToBlocks;