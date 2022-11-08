const { Schema, model } = require('mongoose');

const moveSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game'
    },
    word: {
        type: Schema.Types.ObjectId,
        ref: 'Word'
    },
    clue: {
        type: String
    }
});

const Move = model('Move', moveSchema);

module.exports = Move;

