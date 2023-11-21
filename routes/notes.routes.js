const express = require('express');
const {getAllNotes, getSingleNoteByID, addNote, updateNote, deleteNote} = require('../controllers/notes.controller.js');
const { attachProfileOfUser } = require('../controllers/users.controller.js');
const { requireSignIn, isAuth } = require('../utils/authentication.js');



const notesRouter = express.Router();


// "userID" is the id of the user who performs the action on notes

// "getAllNotes" function gets all the notes of that user
notesRouter.get('/:userID/notes', requireSignIn, isAuth, getAllNotes);

notesRouter.get('/:userID/notes/:noteID', requireSignIn, isAuth, getSingleNoteByID);

notesRouter.post('/:userID/notes', requireSignIn, isAuth, addNote);

notesRouter.put('/:userID/notes/:noteID', requireSignIn, isAuth, updateNote);

notesRouter.delete('/:userID/notes/:noteID', requireSignIn, isAuth, deleteNote);


notesRouter.param("userID", attachProfileOfUser);

module.exports = notesRouter;


