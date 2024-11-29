const createBlock = (type, title, code, row) => {
    let block = {};
    block["type"] = type;
    block["title"] = title;
    block["code"] = code;
    block["row"] = row;
    return block;
}
const getLineObjectList = (data) => {
    return data.map((statement, index) => {
        const blockList = [];
        if (statement.type === "VARIABLE_DECLARATION") {
            blockList.push(
                createBlock("KEYWORD", statement.kind, statement.kind, index)
            );
            let firstVariable = true;
            statement.declaratorExpressionList.forEach((expression) => {
                if (!firstVariable) {
                    blockList.push(
                        createBlock("PUNCHER", ',', ',', index)
                    );
                }
                blockList.push(
                    createBlock("ID", expression.variableName.idName, expression.variableName.idName, index)
                );
                if (expression.initiateValue) {
                    blockList.push(
                        createBlock("ASSIGNMENT", '=', '=', index)
                    );
                    blockList.push(
                        createBlock("LITERAL", expression.initiateValue.value, expression.initiateValue.value, index)
                    );
                }
                firstVariable = false;
            })
        }
        return blockList;
    });
}
export default getLineObjectList;