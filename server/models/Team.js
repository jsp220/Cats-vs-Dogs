const { Schema, model } = require('mongoose');

const teamSchema = new Schema({
    isTeamCat: {
        type: Boolean
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game'
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    words: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Word'
        }
    ]
})

const Team = model('Team', teamSchema);

module.exports = Team;