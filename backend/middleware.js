const jwt = require("jsonwebtoken");

require('dotenv').config();



const authMiddleware = (req, res, next) => {

    /////////////////   token logic   /////////////////////

    // Checks the headers for an Authorization header (Bearer <token>)

    // const authHeader = req.headers.authorization;

    // if(!authHeader || !authHeader.startsWith("Bearer ")){

    //     return res.status(403).json({
    //         message: "Unauthorized"
    //     });
    // }

    // // Verifies that the token is valid

    // const token = authHeader.split(" ")[1];

    // try{
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     console.log(decoded);
    //     //  Puts the userId in the request object if the token checks out.
    //     req.userId = decoded.userId;
    //     next();
    // }catch(err){
    //     // If not, return a 403 status back to the user
    //     return res.status(403).json({
    //         message: "Unauthorized"
    //     });
    // }


    /////////////////   session logic   /////////////////////\

    // Checks the session for a userId
    if(!req.session.userId){
        return res.status(403).json({
            message: "Unauthorized from middleware"
        });
    }
    next();
    
};

module.exports = {
    authMiddleware
};

