const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth')

//based on user-controller
const resolvers = {
    Query: {
        //will include actions to retrive info. From user-controller: getSingleUser 
        
        //Code below should get user by the params which is looking for the id. Then we should be able to populate any items in that model. 
        // me: async (parent, args, context) => {
        //     console.log(parent);
        //     console.log(args);
        //     console.log(context);
        //     return await User.findOne({_id});
        // },
        me: async (parent, args, context) => {
            if (context.user) {
                return Profile.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need t obe logged in!');
        }
    },
    Mutation: {
        //will include actions to create or update things like: createUser, saveBook, removeBook, login

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },

        //Not sure this one is correct, specifially on the $addToSet. 
        saveBook: async (parent, { bookData }, context) => {
            const savedBook = await User.findOneAndUpdate(
                //Based on user id
                { _id: context.user._id },
                //Sets the selected book to the user's savedBook array
                { $addToSet: { savedBooks: bookData }},
            );
            return savedBook;
        },

        removeBook: async (parent, { bookId }, context) => {
            return User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            );
        },
        login: async (parent, { email, username, password }) => {
            const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
            if (!user) {
                return resolvers.status(400).json({ message: "Can't find this user" })
            };

            const correctPw = await  user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Wrong Password')
            };

            const token = signToken(user);
            console.log(user);
            return { token, user };
        },
    },
}

module.exports = resolvers;