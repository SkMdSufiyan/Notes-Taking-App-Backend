exports.isAdmin = (req, res, next) => {
    const admin = req.profile.typeOfUser === "Admin";

    if( ! admin ){
        return res.status(404).send({message : "Access denied !!! Admin resource !!!"});
    }

    next();
}





