import Block from "../../ProjectObject/Block.js";
import BlockType from "../../Blocks/BlockType.js";

const addVariableExpressionToBlocks = (blocks, expression,row) =>{
    blocks.push(
        new Block("ID", expression.variable.idName, expression.variable.idName, row[0])
    );
    if (expression.initiateValue) {
        blocks.push(
            new Block(BlockType.ASSIGNMENT, '=', '=', row[0])
        );
        blocks.push(
            new Block(BlockType.LITERAL, expression.initiateValue.value, expression.initiateValue.value, row[0])
        );
    }
}
export default addVariableExpressionToBlocks;