class Statement {
    type;
}

class BlockStatement extends Statement {
    bodyList;
}

class ExpressionStatement extends Statement {
    expression;
}

class IfStatement extends Statement {
    test;
    consequent;
    alternate;
}

class LabeledStatement extends Statement {
    label;
    body;
}

class VariableDeclarationStatement extends Statement {
    kind;
    declaratorExpressionList;
}

class ReturnStatement extends Statement {
    argument;
}

export {
    BlockStatement,
    ExpressionStatement,
    IfStatement,
    LabeledStatement,
    VariableDeclarationStatement,
    ReturnStatement,
}