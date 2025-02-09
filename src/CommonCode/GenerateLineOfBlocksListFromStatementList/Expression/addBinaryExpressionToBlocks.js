import Block from "../../../ProjectObject/Block.js";
import ExpressionType from "./ExpressionType.js";
import BlockType from "../../BlockType.js";
import addExpressionToBlocks from "../addExpressionToBlocks.js";
import {getOperatorFromMainList} from "../../getElementFromMainList.js";

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
            const operator = getOperatorFromMainList(expression.operator);
            let secondExpression = valueStack.pop();
            let firstExpression = valueStack.pop();
            let result = [
                ...firstExpression,
                new Block(BlockType.OPERATOR,operator.title,operator.code,operator.code),
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