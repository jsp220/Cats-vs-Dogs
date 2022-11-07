const db = require('../config/connection');
const { Schema, model } = require('mongoose');

const wordSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

const Word = model('Word', wordSchema);

module.exports = Word;