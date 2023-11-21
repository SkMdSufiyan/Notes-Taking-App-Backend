const notesModel = require('../models/notes.model.js');
const usersModel = require('../models/users.model.js');



exports.getAllNotes = async (req, res) => {
    try{
        const userID = req.params.userID;
        // Getting all the notes of this user
        await notesModel.find({noteOwnerID : userID})
        .then(documents => {
            res.status(200).send({message : "All the notes (of this user) data is obtained successfully", data : documents});
        })
        .catch(err => {
            res.status(400).send({message : "Failed to obtain the notes data", error : err })
        })

    }catch(error){
        res.status(500).send({message : "Internal server error", error : error});
    }
}


exports.getSingleNoteByID = async (req, res) => {
    try{
        const noteID = req.params.noteID;

        await notesModel.findOne({_id : noteID})
        .then(result => {
            if(result){
                res.status(200).send({message : "Note data is obtained successfully", data : result});
            }else{
                res.status(400).send({message : "Note not found"});
            }
        })
        .catch(err => {
            res.status(400).send({message : "Failed to obtain the note data", error : err});
        })

    }catch(error){
        res.status(500).send({message : "Internal server error", error : error});
    }
}


exports.addNote = async (req, res) => {
    try{
        const payload = req.body;
        const newNote = new notesModel(payload);

        const userID = req.params.userID;
        

        await newNote.save()
        .then(async result => {
            
            // Getting the notes data (id of all the old notes of the user) of the user
            const userData = await usersModel.findOne({_id : userID});
            const userNotes = userData["notes"];

            if(! userNotes.includes(result._id)){
                userNotes.push(result._id.toString());
            }
            // Updating the "notes" field of the user with new data (id of notes)
            await usersModel.findOneAndUpdate({_id : userID}, {$set : {notes : userNotes}});
                    

            res.status(200).send({message : "Note is added successfully", _id : result._id});
        })
        .catch(err => {
            res.status(400).send({message : "Failed to add the note", error : err});
        })

    }catch(error){
        res.status(500).send({message : "Internal server error", error : error});
    }
}


exports.updateNote = async (req, res) => {
    try{
        const noteID = req.params.noteID;
        const payload = req.body;

        await notesModel.findOneAndUpdate({_id : noteID}, {$set : payload})
        .then(result => {
            if(result){
                res.status(200).send({message : "Note is updated successfully"});
            }else{
                res.status(400).send({message : "Note not found"});
            }
        })
        .catch(err => {
            res.status(400).send({message : "Failed to update the note", error : err});
        })

    }catch(error){
        res.status(500).send({message : "Internal server error", error : error});
    }
}


exports.deleteNote = async (req, res) => {
    try{
        const noteID = req.params.noteID;

        const userID = req.params.userID;

        await notesModel.findOneAndDelete({_id : noteID})
        .then(async result => {
            if(result){

                // Getting the notes data (id of all the old notes of the user) of the user
                const userData = await usersModel.findOne({_id : userID}, {_id : 0, notes : 1});
                const userNotes = userData["notes"];
                const userNewNotes = userNotes.filter(val => val != result._id);
            
                // Updating the "notes" field of the user with new data (by removing the id of the deleted note)
                await usersModel.findOneAndUpdate({_id : userID}, {$set : {notes : userNewNotes}});

                res.status(200).send({message : "Note is deleted successfully"});
            }else{
                res.status(400).send({message : "Note not found"});
            }
        })
        .catch(err => {
            res.status(400).send({message : "Failed to delete the note", error : err});
        })

    }catch(error){
        res.status(500).send({message : "Internal server error", error : error});
    }
}


