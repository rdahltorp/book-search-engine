//Import models
const { Book, User } = require('../models');

//based on user-controller
const reslovers = {
    Query: {
        //will include actions to retrive info. From user-controller: getSingleUser 
    },
    Mutation: {
        //will include actions to create or update things like: createUser, saveBook, deleteBook
    }
}