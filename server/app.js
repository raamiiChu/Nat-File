import "dotenv/config";
import express from "express";

import cors from "cors";

import passport from "passport";
import "./config/passport.js";

import sequelize from "./db.js";

import {
    userRoute,
    portfolioRoute,
    imagesRoute,
    authRoute,
} from "./routes/index.js";

const app = express();
const port = 3001;
const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://ec2-52-192-99-138.ap-northeast-1.compute.amazonaws.com",
        "https://master.d5yayrbyrjfrd.amplifyapp.com",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
};

sequelize.sync();

app.use(express.json());
app.use(cors(corsOptions));

app.use("/user", userRoute);
app.use("/portfolio", portfolioRoute);
app.use("/images", imagesRoute);
app.use("/auth", passport.authenticate("jwt", { session: false }), authRoute);

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/healthcheck", (req, res) => {
    res.send("OK");
});

app.get("*", (req, res) => {
    res.send("404 page not found");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
