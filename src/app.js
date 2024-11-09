/*
Create a git repository
1)git init -it will initialize github repository, then we need to create .gitignore file to root of the project.
It will ignore dependency changes

2)git add .   - all the file will be added
3)git commit - m "message" - all the code will be commit in our main branch

//suppose we want to push our code on github remote repository, need to visit github .com and create
new repository
4) Now we need to connect github repository (suppose created repo name is devTinder) to our local repository.
  we will push existing repo from command line:

  git remote add origin "path from the github"          // it will set origin url
  git branch -M origin main
  git push -u origin main    // push local main branch to origin main branch, it will push all your code
*/


//First we import express
//require is referencing express folder
//express is coming from node module
const express = require("express");

//creating express js application

const app = express();
app.get("/user",(req,res)=>
{
    res.send({"firstName":"Harikesh", "lastName":"Yadav"})
})

app.post("/user",(req,res)=>
{
    //saving data to database
    res.send("POST data saved successfully!")
})

app.delete("/user",(req,res)=>
{
    res.send("Delete data successfully!")
})

/*
Example of route handler:
(req, res) =
{
    res.send("Namastey Harikesh!")
}
*/

// app.use("/", (req, res) =>              // This is / route
// {
//     res.send("Namastey Harikesh!")
// })

// app.use("/hello/2", (req, res) => {       // This is  /hello/2 route
//     res.send("Hello Hello Hello 2")
// })

// app.use("/hello", (req, res) => {       // This is  /hello route
//     res.send("Hello Hello")
// })

// //This function is request handler, now server is responding to the incoming request

// app.use("/test", (req, res) =>     //my app is listening on port number 3000 but it will only handle the request which has  /test route, Then It will respond.

// {
//     res.send("Hello From The Express Server ")   //sending response back
// })

// Created a web server on port number 3000 and my app is listening on the server.


app.listen(3000, () =>         //   call back function is only called once my server is running only
{
    console.log("Server is successfully running on port number: 3000")
})