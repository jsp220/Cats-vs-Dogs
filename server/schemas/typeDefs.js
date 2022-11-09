const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Word {
        _id: ID!
        name: String
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        wins: Int
        losses: Int
        team: Team
        isSpyMaster: Boolean
    }

    type Team {
        _id: ID!
        isTeamCat: Boolean
        game: Game
        users: [User]
        words: [Word]
    }

    type Game {
        _id: ID!
        name: String!
        teamCat: Team
        teamDog: Team
        moves: [Move]
        wordList: WordList
    }

    type Move {
        _id: ID!
        user: User
        game: Game
        word: Word
        clue: String
    }

    type WordList {
        _id: ID!
        game: Game
        allWords: [Word]
        catWords: [Word]
        dogWords: [Word]
        neutralWords: [Word]
        deathWord: [Word]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user(userId: ID!): User
        words: [Word]
        game(gameId: ID!): Game
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addGame(name: String!): Game
        addTeamCat(userIds: [ID]): Team
        addTeamDog: Team
        updateGame(gameId: ID, teamCatId: ID, teamDogId: ID, wordListId: ID): Game
        addWordList(wordIds: [ID]): WordList
    }

`;

module.exports = typeDefs;