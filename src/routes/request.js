const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user")
const mongoose = require("mongoose")
const ConnectionRequestModel = require("../models/connectionRequest");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    //when you call userAuth,you will get loggedIn user information inside req.user

    try {
        const fromUserId = req.user._id;    // logged in user, who is sending request
        const toUserId = req.params.toUserId;  // toUserId is dynamic, it is coming from params
        const status = req.params.status;      // status is dyanamic, it is coming from params
        const allowedStatus = ["interested", "ignored"];
        if (!allowedStatus.includes(status))   // checks status should be only interested or ignored
        {
            return res.status(400).json({
                message: "invalid status type:" + status
            })
        }

        //Validate the ID before querying, User.findById expects a valid ObjectId as input.

        if (!mongoose.Types.ObjectId.isValid(toUserId)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        //Check user is exist in our database or not

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({ message: "User Not Found!" })   // // throw new Error("User Not Found!")
        }

        // Check if there is existing connection request

        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existingConnectionRequest) {
            return res.status(400).json({
                message: "Connection Request Already Exists!!"
            });
        }

        // Add connectionRequest's data in our database

        const connectionRequest = new ConnectionRequestModel({
            fromUserId, toUserId, status
        });

        const data = await connectionRequest.save();  //save into database
        res.json({
            message: req.user.firstName + " is " + status + " in " + toUser.firstName, data      //sending response
        })
    } catch (err) {
        res.status(400).send("Error!" + err.message);

    }
})

module.exports = requestRouter;



