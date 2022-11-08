const { AuthenticationError } = require('apollo-server-express');
const { User, Team, Word, Game, Move, WordList } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },
        words: async () => {
            const allWords = await Word.find();
            let chosenWords = [];
            while (chosenWords.length < 25) {
                const word = allWords[Math.floor(Math.random()*allWords.length)];
                if (!chosenWords.includes(word)) chosenWords.push(word);
            }
            console.log(chosenWords)
            return chosenWords;
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },

        // addWordList: async (parent, data) => {
        //     const wordList = await WordList.create(data);

        //     // continue here
        // },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            return { token, user };
        },
    }
};

module.exports = resolvers;