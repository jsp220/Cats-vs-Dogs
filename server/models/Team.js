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
            ref: 'User',
            sparse: true
        }
    ],
    words: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Word',
            sparse: true
        }
    ]
})

const Team = model('Team', teamSchema);

module.exports = Team;