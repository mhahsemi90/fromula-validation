import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

const typeDefs = gql`
    enum BlockType{
        VARIABLE,
        LITERAL,
        ARITHMETIC_OPERATOR,
        ASSIGNMENT_OPERATOR,
        COMPARISON_OPERATOR,
        LOGICAL_OPERATOR,
        BITWISE_OPERATOR,
        KEYWORD,
        SEPARATOR,
        LABEL,
        LABEL_ASSIGN,
        OPEN_PARENTHESES,
        CLOSE_PARENTHESES,
        FUNCTION,
    }
    interface Block{
        type: BlockType
        code: String
        title: String
        enTitle: String
    }
    input BlockInput{
        type: BlockType
        code: String
        title: String
        enTitle: String
    }
    type BlockOutput implements Block{
        type: BlockType
        code: String
        title: String
        enTitle: String
    }
    type Operator implements Block{
        type: BlockType
        code: String
        title: String
        enTitle: String
    }
    type Operand implements Block{
        type: BlockType
        code: String
        title: String
        enTitle: String
    }
    enum LineType{
        EXPRESSION,
        BLOCK,
        VARIABLE_DECLARATION,
        IF,
        LABEL,
        RETURN,
        FOR,
        ELSE,
        ELSE_IF,
    }

    type Line{
        id: Int
        parentId: Int
        row: Int
        lineLevel: Int
        blockList: [BlockOutput]
        lineType: LineType
    }

    input LineInput{
        id: Int
        parentId: Int
        row: Int
        lineLevel: Int
        blockList: [BlockInput]
        lineType: LineType
    }
    type ValidationResult{
        generatedFormula: [String]
        validationMessage: String
    }
    type ReWritingResult{
        reWritingLineList: [Line]
        validationMessage: String
    }
    type Query {
        formulaParsing(formula: String): [Line]
        generateFormula(lineList: [LineInput] ): ValidationResult
        formulaValidation(formula: String): String
        formulaRewritingBaseOnBasicStructure(lineList: [LineInput]): ReWritingResult
    }
    schema {
        query: Query
    }
`;

const Client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    fetchOptions: {
        mode: 'no-cors'
    },
    cache: new InMemoryCache(),
    typeDefs
});

export default Client;