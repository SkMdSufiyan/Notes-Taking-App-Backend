const express = require('express'); // Importing express
// Importing the custom functions from "auth.controller.js"
const { signup, login, logout, forgotPasswordSendEmail, verifyResetAccessToken, resetPassword, activateAccount} = require('../controllers/auth.controller.js');


const authRouter = express.Router(); // Creating an express router

authRouter.post('/signup', signup); // Route for signup
authRouter.get('/activate-account/:accountActivationToken', activateAccount); // Route for account activation
authRouter.post('/login', login); // Route for login
authRouter.get('/logout', logout); // Route for logout

authRouter.post('/forgot-password', forgotPasswordSendEmail); // Route for sending password reset link through email

authRouter.get('/verify-resetaccesstoken/:resetToken', verifyResetAccessToken); // Route for verifying the reset token
authRouter.put('/reset-password/:resetToken', resetPassword); // Route for resetting the password



module.exports = authRouter;