const express = require("express");
const app = express();
const dbConnect = require("./config/database")
const User = require("./models/user")    //imported user model

//Create an API to add user into a database
app.use(express.json())          //This is middleware, we will use for all API's to convert json object to javascript object for all route requests
app.post("/signup", async (req, res) => {
    //Below the hardcoded user object
    // const user =new User({
    //     firstName:"Prasad",
    //     lastName:"PrasadYadav",
    //     email:"prasad@gmail.com",
    //     password:"prasad@123",
    //     age:39,
    // })
    //Creating new Instance of user model
    const user = new User(req.body)           // Getting dynamic user object inside req.body
    await user.save();                        //saving user
    res.send("User added successfully")
})

//Get user by email

app.get("/user", async (req, res) => {
    const userEmail = req.body.email;
    try {
        const user = await User.find({ email: userEmail });
        if (!user) {
            res.send("user not fount!");
        }
        else {
            res.send(user);
        }
    }
    catch (err) {
        res.send("Something Went Wrong!")
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

app.patch("/user", async (req, res) => {
    const userId = req.body._id;      //getting user id, which is provided by mongoose by default
    const data = req.body;            // user data, which is coming from end user to update
    try {
        const user = await User.findByIdAndUpdate({ _id: userId }, data)           // updating data, it will take userId and data, which we want to update
        res.send("User Updated Successfully!")

    } catch (error) {
        res.status(400).send("Something went wrong !")
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