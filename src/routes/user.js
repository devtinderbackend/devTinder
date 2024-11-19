const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user")
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName")
        res.json({
            message: "Fetch Connection Data",
            data: connectionRequests
        })
    }
    catch (err) {
        res.status(400).send("Error!" + err.message)

    }
})

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequestModel.find({
            $or: [
                {
                    toUserId: loggedInUser._id, status: "accepted"
                },
                {
                    fromUserId: loggedInUser._id, status: "accepted"
                }
            ]
        }).populate("fromUserId", "firstName lastName").populate("toUserId", "firstName lastName");

        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId
        });
        res.json({ data })

    } catch (err) {
        res.status(400).send("Error!", err.message)

    }
})

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        limit = limit > 50 ? 50 : limit
        const connectionRequests = await ConnectionRequestModel.find({
            $or: [
                {
                    toUserId: loggedInUser._id
                },
                {
                    fromUserId: loggedInUser._id
                }
            ],
        }).select("fromUserId toUserId");
        const hideUserFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        })
        const users = await User.find({
            $and: [{ _id: { $nin: Array.from(hideUserFromFeed) } },
            { _id: { $ne: loggedInUser._id } }
            ]
        }).select("firstName lastName").skip(skip).limit(limit)
        res.send(users)

    } catch (err) {
        res.status(400).send("Error!" + err.message);

    }
})

module.exports = userRouter;