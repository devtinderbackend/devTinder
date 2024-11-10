const express = require("express");
const app = express();
const {adminAuth, userAuth}= require("./middlewares/auth") // Imported adminAuth and userAuth from auth.js file in middlewares folder

app.use("/admin", adminAuth)       // we are using adminAuth for authentication as middleware to getallData

app.get("/user",userAuth,(req,res,next)=>    //we are using userAuth for Authentication as middleware for  user Login
{
    console.log("User login Authenticated!")
res.send("User Login Is Done")
next();
})

app.get("/admin/getAllData", (req,res,next)=>
{
    console.log("Admin Authenticated!")
    res.send("Sent all data");
    next();
})

app.delete("/admin/deleteUser",(req,res,next)=>
{
    console.log("Deleted user is authenticated!")
res.send("Delete user")
next();
})

app.listen(3000, () => {
    console.log("Server is successfully running on port number: 3000")
})