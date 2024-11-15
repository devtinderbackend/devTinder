const express = require("express");
const app = express();
const dbConnect = require("./config/database")
const User = require("./models/user")    //imported user model
const { validateSignUpData } = require("./utils/validations")
const bcrypt = require("bcrypt");  // Imported to encrypt and hash password before we have to install using  npm i bcrypt

//Create an API to add user into a database
app.use(express.json())          //This is middleware, we will use for all API's to convert json object to javascript object for all route requests
app.post("/signup", async (req, res) => {
    try {
        /*  Validating the data which is coming from user */

        validateSignUpData(req);// whatever request is coming, we will validate here

        /*Encrypting the password*/

        const { firstName, lastName, emailId, password } = req.body;  // Enjecting firstName,lastName,emailId,password from req body
        const passwordHash = await bcrypt.hash(password, 10)     // hashing password
        /* Creating new Instance of user model and saving user */

        const user = new User({
            firstName, lastName, emailId, password: passwordHash,           //expicitely add user's data which want to add in our databasde
        })
        await user.save();
        res.send("User added successfully")

    } catch (error) {
        res.status(400).send("Error!" + error.message)
    }
})

// Login API

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;               //Enjecting emailId and password from req body which will be enter by end user
        const user = await User.findOne({ emailId: emailId }); // find user by email
        if (!user) {
            throw new Error("Invalid Email!");               // if user not found then  throw error message
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);    // comparing password which is inside database and provided by end user
        if (isPasswordValid) {
            res.send("User Login Successfully!")     // if true then login
        }
        else {
            throw new Error("Invaild Password!")  // throwing error if login fail
        }
    } catch (error) {
        res.status(400).send("Error!:" + error.message)
    }
});

//Get user by email

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.find({ emailId: userEmail });
        if (!user) {
            res.send("user not fount!");
        }
        else {
            res.send(user);
        }
    }
    catch (err) {
        res.send("Something Went Wrong!" + err.message)
    }
}
)

//Feed API, Get/feed - Get all the user's from database

app.get("/feed", async (req, res) => {
    try {
        const user = await User.find({});
        if (!user) {
            res.status(400).send("User Not Found!")
        }
        else {
            res.send(user)
        }
    }
    catch (err) {
        res.status(400).send("Something Went Wrong!")
    }
})

// Delete User API

app.delete("/user", async (req, res) => {
    const userId = req.body._id;    //getting _id, which is provided by mongoose by default
    console.log(userId);
    try {
        const user = await User.findByIdAndDelete(userId)     // Delete user by userId
        res.send("User Deleted Successfully!")
    }
    catch (err) {
        res.status(400).send("Something went wrong !")
    }
})

//Update User API

// app.patch("/user", async (req, res) => {
//     const userId = req.body._id;      //getting user id, which is provided by mongoose by default
//     const data = req.body;            // user data, which is coming from end user to update
//     try {
//         const user = await User.findByIdAndUpdate({ _id: userId }, data,{runValidators:true})           // updating data, it will take userId and data, which we want to update, runs the validatons using runValidators when update method will be called.
//         res.send("User Updated Successfully!")

//     } catch (error) {
//         res.status(400).send("Date Updated Failed!"+ error.message)
//     }
// })

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;      //getting user id, which is coming from routes
    const data = req.body;            // user data, which is coming from end user to update, do'nt believe on body, always validate before adding into database
    try {
        // Only we want to allow upate skills,age,gender,about.

        const ALLOWED_UPDATES = ["skills", "age", "gender", "about"];

        // using Object.keys, we will loop keys then checks every keys to ALLOWED_UPDATES includes.

        const isAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );
        if (!isAllowed)       //If key is not matched whichever we want to update
        {
            throw new Error("upadate is not allowed")
        }
        if (data?.skills.length > 10)       //if skills fields length should not be more than 10
        {
            throw new Error("Can't add more than 10 skills")
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, { runValidators: true })           // updating data, it will take userId and data, which we want to update, runs the validatons using runValidators when update method will be called.
        res.send("User Updated Successfully!")

    } catch (error) {
        res.status(400).send("Updated Failed!" + error.message)
    }
})

dbConnect().then(() => {       //here first connect to database then listen to the server.once database connection is established then we do app.listen().
    console.log("DataBase is Connected Successfully!")
    app.listen(3000, () => {
        console.log("Server is successfully running on port number: 3000")
    })
}).catch(err => {                //Handling error
    console.error("Connection Not Established!")
})