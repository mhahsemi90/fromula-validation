import addVariableExpressionToBlocks from "./Expression/addVariableExpressionToBlocks.js";
import ExpressionType from "./Expression/ExpressionType.js";
import addBinaryExpressionToBlocks from "./Expression/addBinaryExpressionToBlocks.js";
import Block from "../ProjectObject/Block.js";
import BlockType from "../ViewBlock/BlockType.js";
import addUnaryExpressionToBlocks from "./Expression/addUnaryExpressionToBlocks.js";

const addExpressionToBlocks = (blocks, expression) => {
    switch (expression.type) {
        case ExpressionType.VARIABLE_EXPRESSION:
            blocks.push(
                new Block(BlockType.ID, expression.idName, expression.idName)
            );
            break;
        case ExpressionType.LITERAL_EXPRESSION:
            blocks.push(
                new Block(BlockType.LITERAL, expression.value, expression.value)
            );
            break;
        case ExpressionType.CALL_EXPRESSION:
            break;
        case ExpressionType.ARRAY_EXPRESSION:
            break;
        case ExpressionType.ARRAY_PATTERN_EXPRESSION:
            break;
        case ExpressionType.UNARY_EXPRESSION:
            addUnaryExpressionToBlocks(blocks, expression);
            break;
        case ExpressionType.BINARY_EXPRESSION:
            addBinaryExpressionToBlocks(blocks, expression);
            break;
        case ExpressionType.CONDITIONAL_EXPRESSION:
            break;
        case ExpressionType.UPDATE_EXPRESSION:
            break;
        case ExpressionType.ASSIGNMENT_EXPRESSION:
            break;
        case ExpressionType.LOGICAL_EXPRESSION:
            break;
        case ExpressionType.VARIABLE_DECLARATOR_EXPRESSION:
            addVariableExpressionToBlocks(blocks, expression);
            break;
        case ExpressionType.PARENTHESIS_EXPRESSION:
            break;
        case ExpressionType.SEQUENCE_EXPRESSION:
            break;
        case ExpressionType.MEMBER_EXPRESSION:
            break;
        case ExpressionType.OBJECT_EXPRESSION:
            break;
        case ExpressionType.PROPERTY_EXPRESSION:
            break;
    }
}

export default addExpressionToBlocks;