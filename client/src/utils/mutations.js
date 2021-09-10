import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        user {
          _id
          username
        }
        token
  }
}
`

export const CREATE_USER = gql`
    mutation createUser($email: String!, $username: String!, $password: String!) {
     addUser(email: $email, username: $username, password: $password) {
         user {
              _id
              username
             }
         token
  }
}
`

export const CREATE_QUIZ = gql `
    mutation createQuiz($input: QuizInput!) {
  createQuiz(input: $input) {
    title
    _id
    createdAt
    author
    questions {
      questionText
      answers {
        answerText
        isCorrect
      }
    }
  }
}
`