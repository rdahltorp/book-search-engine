//Import models
const { saveBook } = require('../controllers/user-controller');
const { Book, User } = require('../models');
const { set } = require('../models/Book');

//based on user-controller
const reslovers = {
    Query: {
        //will include actions to retrive info. From user-controller: getSingleUser 
        
        //Code below should get user by the params which is looking for the id. Then we should be able to populate any items in that model. 
        getSingleUser: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return await User.find(params);
        },
    },
    Mutation: {
        //will include actions to create or update things like: createUser, saveBook, deleteBook, login

        createUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },

        //Not sure this one is correct, specifially on the $set front. 
        saveBook: async (parent, { _id, user }) => {
            const savedBook = await User.findOneAndUpdate(
                //Based on user id
                { _id },
                //Sets the selected book to the user's savedBook array
                { $set: { savedBook: Book.bookId }},
                //Informs of a new change
                { upsert: true }
            );
            return savedBook;
        }
    }
}

module.exports = reslovers;