const express = require("express");
const app = express();

// Generally we should handle errors on try, catch  block

app.get("/getAllData",(req,res)=>
{
    try {
        // Logic for database and get data
    throw new Error("unexpected error occure!");
    res.send("get all user data");

    } catch (err) {
     res.status(500).send("Some error contact to Admin")
    }
});

//Some other feature to handle error like below, we should use, if error is not handled in try , catch. It should be handled in last of your application.

app.use("/",(err,req,res,next)=>
    {
        if(err)
        {
            res.status(500).send("Something went wrong!");
        }
    })

app.listen(3000, () => {
    console.log("Server is successfully running on port number: 3000")
})