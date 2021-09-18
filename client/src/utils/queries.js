import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query users {
        users {
            _id
            username
        }
    }
`;

export const GET_TOP_USERS = gql`
    query topUsers {
        topUsers {
            _id
            username
            quizzesTaken
            quizzes {
                _id
            }
        }
    }
`;

export const GET_TOP_QUIZZES = gql`
    query topQuizzes {
        topQuizzes {
            _id
            title
            author
            takers
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
            takers
            author
            questions {
                questionText
                index
                answers {
                    answerText
                    isCorrect
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
      recentlyTaken {
          title
          description
          _id
          author
      }
      quizzes {
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

export const DEEP_SEARCH = gql`
    query DeepSearch($input: SearchInput) {
        deepSearch(input: $input) {
         title
         _id
         author
         description
         tags
         createdAt
  }
}
`
