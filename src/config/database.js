/*
All the configuration file's will keep inside  config folder. Anything you want to configure in our app, use config folder
*/

// In this file we will write the logic to connect our database

const mongoose = require("mongoose")    // Connecting to database will using library mongoos
const dbConnect= async()=>              // Wrap inside async function and call
{
    await mongoose.connect("mongodb+srv://harry421:MswCsep0cxAE3uce@learningnodejs.8btvp.mongodb.net/devTinder")  // Call await, it will retun promise and tells that connection is established successfully, we will pass connection string as url.
}

module.exports = dbConnect;