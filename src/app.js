const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

// ✅ Configure CORS properly
const corsOptions = {
    origin: "http://localhost:5173", // Allow frontend
    credentials: true, // Allow cookies and authorization headers
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Ensure PATCH is included
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions)); // ✅ Apply CORS Middleware

// ✅ Handle Preflight Requests Manually (OPTIONS method)
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Vary", "Origin");  // ✅ Helps with caching issues
    res.header("Access-Control-Max-Age", "600"); // ✅ Cache preflight response for 10 mins
    return res.sendStatus(204);
});

// ✅ Enable JSON and Cookie Parsing
app.use(express.json());
app.use(cookieParser());

// ✅ Import and use routers
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// ✅ Start Server
const dbConnect = require("./config/database");
dbConnect()
    .then(() => {
        console.log("Database Connected Successfully!");
        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    })
    .catch(err => {
        console.error("Database Connection Failed!", err);
    });
