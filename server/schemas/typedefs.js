//Not sure if I got the saveBook and removeBook mutations right. 
//Need to update the 'me' so it works. It needs to locat the email (currently have it set as ID)

const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        authors: String
        description: String
        bookId: ID
        image: String
        link: String
        title: String
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookInput {
        authors: String
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Query {
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookInput): User
        removeBook(bookId: ID!): User
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;