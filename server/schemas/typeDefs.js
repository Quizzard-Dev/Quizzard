const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String
        quizzesTaken: Int
        recentlyTaken: [Quiz]
        quizzes: [Quiz]
    }

    type Quiz {
        _id: ID!
        title: String
        tags: [String]
        takers: Int
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

    input SearchInput {
        title: String
        author: String
        tags: [String]
    }

    input QuizInput {
        title: String
        description: String
        tags: [String]
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
        topUsers: [User]
        topQuizzes: [Quiz]
        quiz(quizId: ID!): Quiz
        quizzes(author: String, perPage: Int, after: String): [Quiz]
        searchQuizzes(search: String): [Quiz]
        deepSearch(input: SearchInput): [Quiz]
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
