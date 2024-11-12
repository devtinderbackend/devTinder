const express = require("express");
const app = express();
const dbConnect = require("./config/database")
const User = require("./models/user")    //imported user model

//Create an API to add user into a database
app.use(express.json())          //This is middleware, we will use for all API's to convert json object to javascript object for all route requests
app.post("/signup", async(req,res)=>
{
    //Below the hardcoded user object
    // const user =new User({
    //     firstName:"Prasad",
    //     lastName:"PrasadYadav",
    //     email:"prasad@gmail.com",
    //     password:"prasad@123",
    //     age:39,
    // })
    //Creating new Instance of user model
    const user =new User(req.body)           // Getting dynamic user object inside req.body
   await user.save();                        //saving user
   res.send("User added successfully")
})

dbConnect().then(() => {       //here first connect to database then listen to the server.once database connection is established then we do app.listen().
    console.log("DataBase is Connected Successfully!")
    app.listen(3000, () => {
        console.log("Server is successfully running on port number: 3000")
    })
}).catch(err => {                //Handling error
    console.error("Connection Not Established!")
})