class Expression {
    type;
}

class OperatorExpression extends Expression {
    operator;
}

class ArrayExpression extends Expression {
    elementList;
}

class CallExpression extends Expression {
    callVariableName;
    argumentList;
}

class ConditionalExpression extends Expression {
    test;
    consequent;
    alternate;
}

class Literal extends Expression {
    value;
}

class MemberExpression extends Expression {
    object;
    property;
}

class ObjectExpression extends Expression {
    propertyList;
}

class OneHandOperatorExpression extends OperatorExpression {
    argument;
}

class PropertyExpression extends Expression {
    key;
    value;
}

class SequenceExpression extends Expression {
    expressionList;
}

class TwoHandOperatorExpression extends OperatorExpression {
    leftChild;
    rightChild;
}

class Variable extends Expression {
    idName;
}

class VariableDeclaratorExpression extends Expression {
    variable;
    initiateValue;
}

export {
    ArrayExpression,
    CallExpression,
    ConditionalExpression,
    Literal,
    MemberExpression,
    ObjectExpression,
    OneHandOperatorExpression,
    PropertyExpression,
    SequenceExpression,
    TwoHandOperatorExpression,
    Variable,
    VariableDeclaratorExpression,
}