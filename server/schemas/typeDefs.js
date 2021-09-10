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
        author: String
        createdAt: String
        answers: [Answer]
    }

    type Answer {
        answerText: String
        isCorrect: Boolean
    }

    type Query {
        users: [User]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
    }
`

module.exports = typeDefs;