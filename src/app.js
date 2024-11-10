
const express = require("express");

const app = express();

app.use("/route",
    (req, res, next) =>                          //Route Handler 1
    {
        console.log("Route Handler 1");
        // res.send("Response1")
        next();                                  // next(); function notify next route handler
    },
    (req, res, next) =>                         //Route Handler 2
    {
        console.log("Route Handler 2");
        // res.send("Response2")
        next();                                 // next(); function notify next route handler
    },
    (req, res, next) =>                         //Route Handler 3
    {
        console.log("Route Handler 3");
        // res.send("Response3")
        next();                                // next(); function notify next route handler
    },
    (req, res, next) =>                         //Route Handler 4
    {
        console.log("Route Handler 4");
        // res.send("Respoonse4")
        next();                               // next(); function notify next route handler
    },
    (req, res, next) =>                         //Route Handler 5
    {
        console.log("Route Handler 5");
        res.send("Response5")                   // send response back
        // res.send("Response5")                // if i comment this then server does not return, it will go on infinite loop.
        next();                               //  next(); function will accept route hander which we do not have so it will throw an error means I am not hanling route like res.send("").
    }
)

app.listen(3000, () => {
    console.log("Server is successfully running on port number: 3000")
})