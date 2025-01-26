import TokenType from "./TokenType.js";
import Line from "../ProjectObject/Line.js";
import StatementType from "../GenerateLineOfBlocksListFromStatementList/Statement/StatementType.js";
import {getOperandFromMainList, getOperatorFromMainList} from "../IntermediateFrame/getElementFromMainList.js";
import Block from "../ProjectObject/Block.js";
import BlockType from "../GenerateLineOfBlocksListFromStatementList/BlockType.js";

const generateLineOfBlocksListFromTokenList = (data) => {
    const lineOfBlocksList = [];
    let blocks = [];
    let lineNumber = 0;
    let level = 0;
    let statementType = StatementType.EXPRESSION_STATEMENT;
    data.forEach((token) => {
        if (token.tokenType === TokenType.NEW_LINE) {
            lineOfBlocksList.push(
                new Line(lineNumber, level, blocks, statementType)
            );
            statementType = StatementType.EXPRESSION_STATEMENT;
            blocks = [];
        } else {
            lineNumber = token.lineNumber - 1;
            level = token.level;
            let blockItem = {};
            switch (token.tokenType) {
                case TokenType.KEYWORD:
                    //blockItem = getKeywordFromMainList(token.value);
                    //blocks.push(
                    //    new Block(BlockType.KEYWORD, blockItem.title, blockItem.enTitle, blockItem.code)
                    //);
                    if (token.value === 'if') {
                        statementType = StatementType.IF_STATEMENT;
                    } else if (token.value === 'else') {
                        statementType = StatementType.ELSE_STATEMENT;
                    } else if (token.value === 'for') {
                        statementType = StatementType.FOR_STATEMENT;
                    }
                    break;
                case TokenType.PUNCTUATOR:
                    blockItem = getOperatorFromMainList(token.value);
                    if (blockItem.code)
                        blocks.push(
                            new Block(BlockType.SEPARATOR, blockItem.title, blockItem.code, blockItem.code)
                        );
                    else
                        blocks.push(
                            new Block(BlockType.SEPARATOR, token.value, token.value, token.value)
                        );
                    break;
                case TokenType.VARIABLE:
                    blockItem = getOperandFromMainList(token.value);
                    if (blockItem.code)
                        blocks.push(
                            new Block(BlockType.VARIABLE, blockItem.title, blockItem.enTitle, blockItem.code)
                        );
                    else
                        blocks.push(
                            new Block(BlockType.VARIABLE, token.value, token.value, token.value)
                        );
                    break;
                case TokenType.LITERAL:
                    blocks.push(
                        new Block(BlockType.LITERAL, token.value, token.value, token.value)
                    );
                    break;
            }
        }
    });
    const finalLineOfBlocksList = [];
    lineOfBlocksList.forEach(line => {
        if (
            line.statementType === StatementType.IF_STATEMENT ||
            line.statementType === StatementType.FOR_STATEMENT
        ) {
            if (line.blockList.length > 2) {
                if (line.blockList[line.blockList.length - 1].code === ')')
                    line.blockList.pop();
                if (line.blockList[0].code === '(')
                    line.blockList.shift();
            }
        }
        if (line.blockList.length > 0) {
            if (
                line.blockList[0].code !== '{' &&
                line.blockList[0].code !== '}'
            ) {
                finalLineOfBlocksList.push(line);
            }
        }

    })
    for (let i = 0; i < finalLineOfBlocksList.length; i++) {
        finalLineOfBlocksList[i].row = i;
    }
    return finalLineOfBlocksList;
}
export default generateLineOfBlocksListFromTokenList;