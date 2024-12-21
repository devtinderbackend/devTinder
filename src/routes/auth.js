const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user")
// const jwt = require("jsonwebtoken");
const { validateSignUpData } = require("../utils/validations")

//User SignUp API

authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10)
        const user = new User({
            firstName, lastName, emailId, password: passwordHash,
        })
        await user.save();
        res.send("User added successfully")

    } catch (error) {
        res.status(400).send("Error!" + error.message)
    }
})

//Login API

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid Email!");
        }
        const isPasswordValid = await user.validatePassword(password)
        if (isPasswordValid) {
            const token = await user.getJWT();
            res.cookie("token", token);
            res.send("User Login Successfully!")
        }
        else {
            throw new Error("Invaild Password!")
        }
    } catch (error) {
        res.status(400).send("Error!:" + error.message)
    }
});

//Logout API

authRouter.post("/logout",async(req,res)=>
{
    res.cookie("token",null,{expires: new Date(Date.now())});
    res.send("Logout Successfully!")
})
module.exports = authRouter;