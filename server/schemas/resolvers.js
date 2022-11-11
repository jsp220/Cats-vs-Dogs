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
                const word = allWords[Math.floor(Math.random() * allWords.length)];
                if (!chosenWords.includes(word)) chosenWords.push(word);
            }
            // console.log(chosenWords)
            return chosenWords;
        },
        game: async (parent, { gameId }) => {
            return Game.findOne({ _id: gameId })
                .populate(
                    {
                        path: 'teamCat',
                        populate: {
                            path: 'users',
                            model: 'User'
                        }
                    })
                .populate({
                    path: 'teamDog',
                    populate: {
                        path: 'users',
                        model: 'User'
                    }
                })
                .populate({
                    path: 'wordList',
                    model: 'WordList',
                    populate: [
                        {
                            path: 'allWords',
                            model: 'Word'
                        },
                        {
                            path: 'catWords',
                            model: 'Word'
                        },
                        {
                            path: 'dogWords',
                            model: 'Word'
                        },
                        {
                            path: 'neutralWords',
                            model: 'Word'
                        },
                        {
                            path: 'deathWord',
                            model: 'Word'
                        }
                    ]
                })
                .populate({
                    path: 'moves',
                    model: 'Move'
                });
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

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

        addGame: async (parent, { name }) => {
            return Game.create({ name });
        },

        // wordIds should be an array of 25 word IDs, like 
        // ["636aec484933eeb2c7a668c3", "636aec484933eeb2c7a668c4", etc.]
        addWordList: async (parent, { wordIds }) => {
            const allWords = wordIds.map((wordId) => new Object({ _id: wordId }));

            // this part may need to be moved to front end and
            // just send catWords, dogWords, etc as IDs
            const neutralWords = [...allWords];
            const catWords = [];
            while (catWords.length < 9) {
                const randIndex = Math.floor(Math.random() * neutralWords.length);
                const word = neutralWords[randIndex];
                catWords.push(word);
                neutralWords.splice(randIndex, 1);
            }
            const dogWords = [];
            while (dogWords.length < 8) {
                const randIndex = Math.floor(Math.random() * neutralWords.length);
                const word = neutralWords[randIndex];
                dogWords.push(word);
                neutralWords.splice(randIndex, 1);
            }
            const randIndex = Math.floor(Math.random() * neutralWords.length);
            const deathWord = neutralWords[randIndex];
            neutralWords.splice(randIndex, 1);
            const wordList = await WordList.create({
                allWords: allWords,
                catWords: catWords,
                dogWords: dogWords,
                neutralWords: neutralWords,
                deathWord: deathWord
            });
            return wordList;
        },

        addTeamCat: async (parent, { userIds }) => {
            if (userIds) {
                const users = userIds.map((userId) => new Object({ _id: userId }));
                return Team.create(
                    {
                        isTeamCat: true,
                        users: users
                    });
            }
            return Team.create(
                {
                    isTeamCat: true
                }
            )
        },

        addTeamDog: async (parent, { userIds }) => {
            if (userIds) {
                const users = userIds.map((userId) => new Object({ _id: userId }));
                return Team.create(
                    {
                        isTeamCat: false,
                        users: users
                    }
                );
            };
            return Team.create(
                {
                    isTeamCat: false
                }
            )
        },

        updateGame: async (parent, { gameId, teamCatId, teamDogId, wordListId }) => {
            let args = {};
            if (teamCatId) args.teamCat = { _id: teamCatId };
            if (teamDogId) args.teamDog = { _id: teamDogId };
            if (wordListId) args.wordList = { _id: wordListId };
            console.log(args);
            return await Game.findOneAndUpdate(
                { _id: gameId },
                {
                    $set: args,
                },
                { new: true }
            );
        },

        addClickMove: async (parent, { userId, gameId, wordId }) => {
            const move = await Move.create({
                user: { _id: userId },
                game: { _id: gameId },
                word: { _id: wordId }
            })
            // console.log(move);

            // this part may need to be a separate mutation and have front end
            // call the mutation immediately after adding the move
            const game = await Game.findOneAndUpdate(
                { _id: gameId },
                {
                    $push: {
                        moves: { "_id": move._id }
                    }
                },
                { new: true }
            )
            return move;
        },

    }
};

module.exports = resolvers;