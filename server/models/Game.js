const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    teamCat: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    teamDog: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    moves: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Move'
        }
    ],
    wordList: {
        type: Schema.Types.ObjectId,
        ref: 'WordList'
    }

});

const Game = model('Game', gameSchema);

module.exports = Game;