class BackendExpression {
    type;
}

class OperatorExpression extends BackendExpression {
    operator;
}

class ArrayExpression extends BackendExpression {
    elementList;
}

class CallExpression extends BackendExpression {
    callVariableName;
    argumentList;
}

class ConditionalExpression extends BackendExpression {
    test;
    consequent;
    alternate;
}

class Literal extends BackendExpression {
    value;
}

class MemberExpression extends BackendExpression {
    object;
    property;
}

class ObjectExpression extends BackendExpression {
    propertyList;
}

class OneHandOperatorExpression extends OperatorExpression {
    argument;
}

class PropertyExpression extends BackendExpression {
    key;
    value;
}

class SequenceExpression extends BackendExpression {
    expressionList;
}

class TwoHandOperatorExpression extends OperatorExpression {
    leftChild;
    rightChild;
}

class Variable extends BackendExpression {
    idName;
}

class VariableDeclaratorExpression extends BackendExpression {
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