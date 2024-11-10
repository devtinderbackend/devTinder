
const express = require("express");

const app = express();
// app.get("/user",(req,res)=>
// {
//     console.log(req.query)     //req.query ... query will give information of dynamic query parameter. example : localhost:3000/user?userid=101&password=testingpass
//     res.send({"firstName":"Harikesh", "lastName":"Yadav"})
// })

app.get("/user/:userid/:name/:password",(req,res)=>     //make it route dynamic
    {
        console.log(req.params)     // params will give information about dynamic route. example: localhost:3000/user/109/Harikesh/12345
        res.send({"firstName":"Harikesh", "lastName":"Yadav"})
    })

app.listen(3000, () =>         //   call back function is only called once my server is running only
{
    console.log("Server is successfully running on port number: 3000")
})