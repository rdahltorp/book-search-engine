//Holds Mutations for addUser, saveBook, removeBook, login. 

import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login(email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            profile {
            _id
            username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            profile {
                _id
                username
            }
        }
    }
`;
export const SAVE_BOOK = gql`
    mutation saveBook($_id: ID!, $bookId: Integer!) {
        saveBook(_id: $_id, bookId: $bookId) {
            _id
            savedBooks
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($_id: ID!, $bookId: Integer!) {
        removeBook(_id: $_id, bookId: $bookId) {
            _id
            savedBooks
        }
    }
`;
