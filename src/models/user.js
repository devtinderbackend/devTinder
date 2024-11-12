const mongoose = require("mongoose");
const  userSchema = mongoose.Schema({ /* we define schema, It tells you, what all
    infomation about user, we are storing in our database*/

    // We pass all the parameter which defines user
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    age:{
        type:Number,
    }

})

// Create Mongoose model
//Whenever we are referencing a model, name always start with capital latter.
const User = mongoose.model("User",userSchema);
module.exports = User;