const { get } = require('mongoose');

module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    //creating a note
    app.post('/notes', notes.create);

    //Retrieve all notes
    app.get('/notes', notes.findAll);

    //Retrieve single note with nodeId
    app.get('notes/:id', notes.findOne);

    //Update a note with nodeID
    app.put('/notes/:id', notes.update);

    //Delete a note with NOdeID
    app.delete('/notes/:id', notes.delete);
}