const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
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
        savedBooks: [Book]
    }

    type Query: {
        users: [User]
    }

    type Mutation: {
        createUser: User
        saveBook: Book
        deleteBook: Book
    }
`;

module.exports = typeDefs;