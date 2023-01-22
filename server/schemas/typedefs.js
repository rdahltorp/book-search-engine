const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book: {
        authors: String
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type User: {
        _id: ID
        username: String
        email: String
        password: String
        bookCount: Integer
        savedBooks: [Book]
    }

    type Auth: {
        token: ID!
        user: User
    }

    type Query: {
        me: User
    }

    type Mutation: {
        addUser(name: String!, email: String!, password: String!): Auth
        saveBook(_id: ID!, savedBooks: Book!): User
        removeBook(_id: ID!, savedBooks: Book!): User
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;