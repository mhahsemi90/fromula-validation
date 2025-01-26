import Block from "../../ProjectObject/Block.js";
import BlockType from "../BlockType.js";
import {getOperandFromMainList, getOperatorFromMainList} from "../../IntermediateFrame/getElementFromMainList.js";

const addVariableExpressionToBlocks = (blocks, expression) => {
    const operand = getOperandFromMainList(expression.variable.idName)
    blocks.push(
        new Block(BlockType.ID, operand.title,operand.enTitle,operand.code)
    );
    if (expression.initiateValue) {
        const operator = getOperatorFromMainList('=');
        blocks.push(
            new Block(BlockType.ASSIGNMENT, operator.title,operator.code,operator.code)
        );
        blocks.push(
            new Block(BlockType.LITERAL, expression.initiateValue.value,expression.initiateValue.value, expression.initiateValue.value)
        );
    }
}
export default addVariableExpressionToBlocks;