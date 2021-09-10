import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query users {
        users {
            _id
            username
        }
    }
`