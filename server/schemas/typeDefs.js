const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String
        quizzesTaken: Int
        quizzes: [Quiz]
    }

    type Quiz {
        _id: ID!
        title: String
        description: String
        author: String
        createdAt: String
        questions: [Question]
        scores: [Score]
    }

    type Answer {
        answerText: String
        isCorrect: Boolean
        index: Int
    }

    type Question {
        questionText: String
        answers: [Answer]
        index: Int
    }

    type Score {
        username: String
        percent: Float
    }

    input AnswerInput {
        answerText: String
        isCorrect: Boolean
        index: Int
    }

    input QuestionInput {
        questionText: String
        answers: [AnswerInput]
        index: Int
    }

    type Auth {
         token: ID!
         user: User
    }

    type GradedAnswer {
        questionIndex: Int
        correct: Boolean
    }

    type Grade {
        percentage: Float
        results: [GradedAnswer]
    }

    input QuizInput {
        title: String
        description: String
        questions: [QuestionInput]
    }

    input submittedAnswer {
        questionIndex: Int
        chosenAnswer: Int
    }

    type Query {
        me: User
        user(userId: ID!): User
        users: [User]
        quiz(quizId: ID!): Quiz
        quizzes(authorId: ID!, offset: Int, limit: Int): [Quiz]
        searchQuizzes(search: String): [Quiz]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createQuiz(input: QuizInput!): Quiz
        deleteQuiz(quizId: ID!): Quiz
        submitQuiz(quizId: ID!, answers: [submittedAnswer]): Grade
    }
`

module.exports = typeDefs;
