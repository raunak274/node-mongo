const Note = require('../models/note.model');

//Create and save a note
exports.create = (req,res) => {
    //Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: 'Note content cannot be empty'
        });
    }

    //create note
    const note = new Note({
        title: req.body.title || 'Untitled Note',
        content: req.body.content
    });

    //save data in database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Internal Server Error'
        })
    })
}

//Retrieve all notes
exports.findAll = (req,res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Internal Server Error'
        })
    })
}

//Retrieve all notes
exports.findOne = (req,res) => {
    Note.findById(req.params.id)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: err.message || 'NotFound'
            })
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            })
        }
        return res.status(500).send({
            message: "Note not found with id " + req.params.id
        })
    })
}

//Retrieve all notes
exports.update = (req,res) => {
    //Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: err.message || 'Note Cannot be empty'
        })
    }

    //Find Note and update with request body
    Note.findByIdAndUpdate(req.params.id, {
        title: req.body.title || 'Untitled Note',
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.id
        });
    });
}

//Retrieve all notes
exports.delete = (req,res) => {
    Note.findByIdAndDelete(req.params.id)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: 'Note not found with id ' + req.params.id
            })
        }
        res.send({
            message : 'Note deleted Successfully'
        })
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.id
        });
    })

}