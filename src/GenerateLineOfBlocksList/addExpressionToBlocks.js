import addVariableExpressionToBlocks from "./Expression/addVariableExpressionToBlocks.js";
import ExpressionType from "./Expression/ExpressionType.js";

const addExpressionToBlocks = (blocks, expression, row) => {
    switch (expression.type) {
        case ExpressionType.VARIABLE_EXPRESSION:
            break;
        case ExpressionType.LITERAL_EXPRESSION:
            break;
        case ExpressionType.CALL_EXPRESSION:
            break;
        case ExpressionType.ARRAY_EXPRESSION:
            break;
        case ExpressionType.ARRAY_PATTERN_EXPRESSION:
            break;
        case ExpressionType.UNARY_EXPRESSION:
            break;
        case ExpressionType.BINARY_EXPRESSION:
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
            addVariableExpressionToBlocks(blocks, expression, row);
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