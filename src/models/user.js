const mongoose = require("mongoose");     //Import mongoose
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")    // Import validator library to validate email,password,Url..., using predefined methods.
const userSchema = mongoose.Schema({ /* we define schema, It tells you, what all
    infomation about user, we are storing in our database*/

    // We pass all the parameter which defines user
    firstName: {
        type: String,
        required: true,         //Mandatory field
        minLength: 4,           //Minimum length should be 4
        maxLength: 50,          // maximum length should be 50
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,         //Mandatory field
        trim: true,             //It will remove white spaces
        unique: true,           // Email id will be unique
        lowercase: true,        // email id will be in lowercase
        validate(value)        //Use validate function to validate Email, defined in validator library
        {
            if (!validator.isEmail(value))   // isEmail is function to validate Email
            {
                throw new Error("Email Id is not valid:" + value)
            }
        }

    },
    password: {
        type: String,
        required: true,        //Mandatory field
        validate(value)      //Use validate function to validate Email, defined in validator library
        {
            if (!validator.isStrongPassword(value))       // isStrongPassword  function is used to make password strong
            {
                throw new Error("Please Enter Strong Password:" + value)
            }
        }
    },
    age: {
        type: Number,
        minLength: 18,     //minimum age should be 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value))      // Custom validation, it only includes if gender is male,female and other's only
            {
                throw new Error("Gender is not valid")
            }
        }
    },
    photoUrl:
    {
        type: String,
        default: "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png",  // set default url
        validate(value) {
            if (!validator.isURL(value))          //isURL function is used to validate url
            {
                throw new Error("Provide valid url:" + value)
            }
        }
    },
    about:
    {
        type: String,
        default: "I am full time software engineer and part time story teller"     // set default about bio
    },
    skills:
    {
        type: [String],          //It takes by default empty array to add skills set
    }

},
    {
        timestamps: true,        // Set created date and updated date
    })

// Create JWT Token

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "Rakesh@12kxjlx3", { expiresIn: "7d", })
    return token;
}

// Validate Password, comparing password which is inside database and provided by end user.

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const hashPassword = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, hashPassword);
    return isPasswordValid;

}
// Create Mongoose model
//Whenever we are referencing a model, name always start with capital latter.
const User = new mongoose.model("User", userSchema);
module.exports = User;