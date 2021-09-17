import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query users {
        users {
            _id
            username
        }
    }
`;

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
`;

export const GET_QUIZZES = gql`
    query quizzes($author: String!) {
        quizzes(author: $author) {
            _id
            title
            tags
            description
            author
            questions {
                questionText
                index
                answers {
                    answerText
                    index
                }
            }
        }
    }
`;

export const GET_QUIZ = gql`
    query quiz($quizId: ID!) {
        quiz(quizId: $quizId) {
            _id
            title
            author
            createdAt
            description
            tags
            questions {
                questionText
                index
                answers {
                    answerText
                    index
                    isCorrect
                }
            }
            scores {
                username
                percent
            }
        }
    }
`;

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      quizzes(offset: $offset, limit: $limit) {
        _id
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
`;

export const SEARCH_QUIZZES = gql`
  query search($search: String!) {
    searchQuizzes(search: $search) {
      _id
      title
      author
    }
  }
`;
