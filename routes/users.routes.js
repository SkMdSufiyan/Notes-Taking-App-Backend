const express = require('express');
const {getAllUsers, getSingleUserByID, addUser, updateUser, deleteUser, attachProfileOfUser} = require('../controllers/users.controller.js');
const {requireSignIn, isAuth} = require('../utils/authentication.js');
const {isAdmin} = require('../utils/authorization.js');



const usersRouter = express.Router();

// "operatorID" is the id of the user who performs the action of CRUD
// "userID" is the id of the user on whom the action is being performed

usersRouter.get('/:operatorID/users', requireSignIn, isAuth, isAdmin, getAllUsers);

usersRouter.get('/:operatorID/users/:userID', requireSignIn, isAuth, isAdmin, getSingleUserByID);

usersRouter.post('/:operatorID/users', requireSignIn, isAuth, isAdmin, addUser);

usersRouter.put('/:operatorID/users/:userID', requireSignIn, isAuth, isAdmin, updateUser);

usersRouter.delete('/:operatorID/users/:userID', requireSignIn, isAuth, isAdmin, deleteUser);


// For updating the user self-profile
usersRouter.put('/:operatorID/users/updateProfile/:userID', requireSignIn, isAuth, updateUser);

// For getting self-updated-profile of user
usersRouter.get('/:operatorID/users/getSelfProfile/:userID', requireSignIn, isAuth, getSingleUserByID);


usersRouter.param("operatorID", attachProfileOfUser);

module.exports = usersRouter;


