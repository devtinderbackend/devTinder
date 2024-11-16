const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validations")

//Profile View API

profileRouter.get("/profile/view",userAuth, async (req, res) => {
    try {
        const user =req.user;
        res.send(user)

    } catch (error) {
        res.status(400).send("Error!:", error.message)

    }
})

//Profile Edit API

profileRouter.patch("/profile/edit",userAuth, async(req,res)=>
{
    try {
        if(!validateEditProfileData(req))
        {
            throw new Error("Invalid Edit Request!")
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key)=>loggedInUser[key]=req.body[key])
        res.send(`${loggedInUser.firstName} your profile is updated`)
        await loggedInUser.save();

    } catch (err) {
        res.status(400).send("Error!" + err.message)

    }
}
)

module.exports = profileRouter;
