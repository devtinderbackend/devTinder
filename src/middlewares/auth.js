const jwt = require("jsonwebtoken");
const User = require("../models/user")
const userAuth = async (req,res,next)=>
    {
    try {
        const cookie = req.cookies;  // get cookie, whichever send by server after making successfull login
        const {token} =cookie;   //extract cookie inside token
        if(!token)
        {
            return res.status(401).send("Please Login")
        //   throw new Error("Invalid token !!!!!")
        }
        const decodeObj = await jwt.verify(token, "Rakesh@12kxjlx3"); // validate token by jwt verify
        const {_id} = decodeObj;  // It return _id
        const user =  await User.findById(_id); //find user by _id
        if(!user)
        {
            throw new Error("User Not Found!")
        }
        req.user =user;
        next();

    } catch (error) {
        res.status(400).send("Error!:" + error.message)

    }
    }

module.exports = {
    userAuth,
}