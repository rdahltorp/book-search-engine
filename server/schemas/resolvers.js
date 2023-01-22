const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth')

//based on user-controller
const resolvers = {
    Query: {
        //will include actions to retrive info. From user-controller: getSingleUser 
        
        //Code below should get user by the params which is looking for the id. Then we should be able to populate any items in that model. 
        me: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return await User.find(params);
        },
    },
    Mutation: {
        //will include actions to create or update things like: createUser, saveBook, removeBook, login

        addUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },

        //Not sure this one is correct, specifially on the $addToSet. 
        saveBook: async (parent, { _id, user }) => {
            const savedBook = await User.findOneAndUpdate(
                //Based on user id
                { _id },
                //Sets the selected book to the user's savedBook array
                { $addToSet: { savedBooks: Book.bookId }},
            );
            return savedBook;
        },

        removeBook: async (parent, { bookId }) => {
            return User.findOneAndUpdate(
                { _id },
                { $pull: { savedBooks: { _id: bookId } } },
                { new: true }
            );
        },
        login: async (parent, { email, username, password }) => {
            const user = await Profile.findOne({ $or: [{ username: username }, { email: email }] });
            if (!user) {
                return resolvers.status(400).json({ message: "Can't find this user" })
            };

            const correctPw = await  user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Wrong Password')
            };

            const token = signToken(user);
            return { token, user };
        },
    },
}

module.exports = resolvers;