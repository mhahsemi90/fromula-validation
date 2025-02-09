import TokenType from "./TokenType.js";
import Line from "../../ProjectObject/Line.js";
import LineType from "../LineType.js";
import {getOperandFromMainList, getOperatorFromMainList} from "../getElementFromMainList.js";
import Block from "../../ProjectObject/Block.js";
import BlockType from "../BlockType.js";

const generateLineOfBlocksListFromTokenList = (data) => {
    const lineOfBlocksList = [];
    let blocks = [];
    let row = 0;
    let level = 0;
    let lineType = LineType.EXPRESSION_STATEMENT;
    data.forEach((token) => {
        if (token.tokenType === TokenType.NEW_LINE) {
            lineOfBlocksList.push(
                new Line(row, level, blocks, lineType)
            );
            lineType = LineType.EXPRESSION_STATEMENT;
            blocks = [];
        } else {
            row = token.lineNumber - 1;
            let blockItem = {};
            switch (token.tokenType) {
                case TokenType.KEYWORD:
                    if (token.value === 'if') {
                        lineType = LineType.IF_STATEMENT;
                    } else if (token.value === 'else') {
                        lineType = LineType.ELSE_STATEMENT;
                    } else if (token.value === 'for') {
                        lineType = LineType.FOR_STATEMENT;
                    } else if (token.value === 'return') {
                        lineType = LineType.RETURN_STATEMENT;
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
            line.lineType === LineType.IF_STATEMENT ||
            line.lineType === LineType.FOR_STATEMENT
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