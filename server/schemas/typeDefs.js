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
        index: Number
    }

    type Question {
        questionText: String
        answers: [Answer]
        index: Number
    }


    input AnswerInput {
        answerText: String
        isCorrect: Boolean
        index: Number
    }

    input QuestionInput {
        questionText: String
        answers: [AnswerInput]
        index: Number
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
        user(userId: ID!): User
        users: [User]
        quiz(quizId: ID!): Quiz
        quizzes: [Quiz]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createQuiz(input: QuizInput!): Quiz
    }
`

module.exports = typeDefs;