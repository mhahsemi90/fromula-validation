import Block from "../../ProjectObject/Block.js";
import ExpressionType from "./ExpressionType.js";
import BlockType from "../../ViewBlock/BlockType.js";
import addExpressionToBlocks from "../addExpressionToBlocks.js";

function callTravers(expression, expressionList) {
    if (expression.type === ExpressionType.BINARY_EXPRESSION) {
        if (expression.leftChild)
            callTravers(expression.leftChild, expressionList);
        if (expression.rightChild)
            callTravers(expression.rightChild, expressionList);
    }
    expressionList.push(expression);
}

const addBinaryExpressionToBlocks = (blocks, expression) => {
    const expressionList = [];
    callTravers(expression, expressionList);
    const valueStack = [];
    for (expression of expressionList) {
        if (expression.type === ExpressionType.BINARY_EXPRESSION) {
            let secondExpression = valueStack.pop();
            let firstExpression = valueStack.pop();
            let result = [
                ...firstExpression,
                new Block(BlockType.BINARY_OPERATOR, expression.operator, expression.operator),
                ...secondExpression
            ];
            valueStack.push(result);
        } else {
            const operand = []
            addExpressionToBlocks(operand, expression);
            valueStack.push(operand);
        }
    }
    blocks.push(...valueStack.pop());
}
export default addBinaryExpressionToBlocks;