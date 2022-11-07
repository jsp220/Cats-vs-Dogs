const { Schema, model } = require('mongoose');

const teamSchema = new Schema({
    isTeamDog: {
        type: Boolean
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