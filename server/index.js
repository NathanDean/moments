import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
// import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

// Needs to be above the app.use statements setting routes
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods","OPTIONS, GET, POST, PATCH, DELETE");
    res.setHeader("Vary", "origin");

    next();
});

// app.use(cors());
// app.options('*', cors())

// Sets every route in postRoutes to begin with "/posts"
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
    res.send("App is running.");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => app.listen(
    PORT, () => console.log(`Server running on port ${PORT}`)
))
.catch(error => console.log(error.message));