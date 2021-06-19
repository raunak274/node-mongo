const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String
},
{
    timeStamps: true
});

module.exports = mongoose.model('Note', NoteSchema);