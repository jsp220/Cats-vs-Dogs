const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    teams: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Team'
        }
    ],
    startTeam: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    words: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Word'
        }
    ],
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