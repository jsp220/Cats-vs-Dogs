const { Schema, model } = require('mongoose');

const wordListSchema = new Schema({
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game'
    },
    allWords: [ //25 words, order preserved
        {
            type: Schema.Types.ObjectId,
            ref: 'Word'
        }
    ],
    catWords: [ // 9 words randomly chosen
        {
            type: Schema.Types.ObjectId,
            ref: 'Word'
        }
    ],
    dogWords: [ // 8 words randomly chosen
        {
            type: Schema.Types.ObjectId,
            ref: 'Word'
        }
    ],
    neutralWords: [ // 7 words
        {
            type: Schema.Types.ObjectId,
            ref: 'Word'
        }
    ],
    deathWord: { // 1 word
        type: Schema.Types.ObjectId,
        ref: 'Word'
    }
})

const WordList = model('WordList', wordListSchema);

module.exports = WordList;