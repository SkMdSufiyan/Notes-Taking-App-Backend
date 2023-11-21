const {expressjwt} = require('express-jwt');

// exports.requireSignIn = expressjwt({
//         secret: process.env.SECRET_KEY_FOR_LOGIN,
//         algorithms: ['HS256'],
//         requestProperty: 'auth'
//     });


// Returns unauthorized error message in response
exports.requireSignIn = (req, res, next) => {
    expressjwt({
        secret: process.env.SECRET_KEY_FOR_LOGIN,
        algorithms: ['HS256'],
        requestProperty: 'auth',
    })(req, res, (err) => {
        if (err) {
            return res.status(401).send({message : "You are unauthorised to access this page !!!"});
        }
        next();
    });
};


exports.isAuth = (req, res, next) => {
    const user = req.auth._id === req.profile._id.toString();
    if( ! user){
        return res.status(404).send({message : "Access denied !!! Sign In again !!!"});
    }
    next();
}



