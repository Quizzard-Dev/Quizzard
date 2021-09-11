import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query users {
        users {
            _id
            username
        }
    }
`

export const GET_USER = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            username
            quizzes {
                title
                questions {
                    questionText
                    answers {
                        answerText
                        isCorrect
                    }
                }
            }
        }
    }
`

export const GET_QUIZZES = gql`
    query quizzes {
        quizzes {
            _id
            title
            author
        }
    }
`

export const GET_QUIZ = gql `
    query quiz($quizId: ID!) {
        quiz(quizId: $quizId) {
            _id
            title
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

export const GET_ME = gql `
    query me {
        me {
            _id
            username
            quizzes {
                title
                questions {
                    questionText
                    index
                    answers {
                        answerText
                        index
                        isCorrect
                    }
                }
            }
        }
    }
`