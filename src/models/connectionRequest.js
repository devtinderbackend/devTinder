// This connectionRequest will define the connection between two user's.

const { string } = require("is");
const mongoose = require("mongoose");
const connectionRequestSchema = mongoose.Schema({             //create schema
    fromUserId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    toUserId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status:
    {
        type: String,
        required: true,
        enum: {                                                       //create enum whenever you want restrict some values
            values: ["interested", "ignored", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        }
    }

},
    {
        timestamps: true,
    }
)

/*
  When doing search operation be mindfull, which indexing you are keeping.
  If you make email id is unique, mongodb automatic create index unique for true.
*/

//compound indexing to make our query very fast

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 })

// Check toUserId and fromUserId should not be matched

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("can't send request to yourself!")
    }
    next();
})

//creating model

const ConnectionRequestModel = new mongoose.model("ConnectionRequestModel", connectionRequestSchema)
module.exports = ConnectionRequestModel;