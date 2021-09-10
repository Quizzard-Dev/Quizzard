const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String
        quizzes: [Quiz]
    }

    type Quiz {
        _id: ID!
        title: String
        author: String
        createdAt: String
        questions: [Question]
    }


    type Answer {
        answerText: String
        isCorrect: Boolean
    }

    type Question {
        questionText: String
        answers: [Answer]
    }


    input AnswerInput {
        answerText: String
        isCorrect: Boolean
    }

    input QuestionInput {
        questionText: String
        answers: [AnswerInput]
    }

    type Auth {
         token: ID!
         user: User
    }

    input QuizInput {
        title: String
        author: String
        questions: [QuestionInput]
    }

    type Query {
        users: [User]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createQuiz(input: QuizInput!): Quiz
    }
`

module.exports = typeDefs;