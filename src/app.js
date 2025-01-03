const express = require("express");
const app = express();
const dbConnect = require("./config/database")
const cookieParser = require("cookie-parser")
const cros = require("cors")
app.use(cros({
    origin:"http://localhost:5173/login",
    credentials:true
}))
app.use(express.json())
app.use((cookieParser()))
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/",requestRouter);
app.use("/", userRouter);

dbConnect().then(() => {
    console.log("DataBase is Connected Successfully!")
    app.listen(3000, () => {
        console.log("Server is successfully running on port number: 3000")
    })
}).catch(err => {
    console.error("Connection Not Established!")
})