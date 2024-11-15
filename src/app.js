const express = require("express");
const app = express();
const dbConnect = require("./config/database")
const cookieParser = require("cookie-parser")
// const jwt = require("jsonwebtoken");

app.use(express.json())
app.use((cookieParser()))
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
app.use("/", authRouter);
app.use("/", profileRouter);

dbConnect().then(() => {
    console.log("DataBase is Connected Successfully!")
    app.listen(3000, () => {
        console.log("Server is successfully running on port number: 3000")
    })
}).catch(err => {
    console.error("Connection Not Established!")
})