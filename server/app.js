import "dotenv/config";
import express from "express";

import cors from "cors";

import sequelize from "./db.js";

import { userRoute, portfolioRoute, imagesRoute } from "./routes/index.js";

const app = express();
const port = 3001;
const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
};

sequelize.sync();

app.use(express.json());
app.use(cors(corsOptions));

app.use("/user", userRoute);
app.use("/portfolio", portfolioRoute);
app.use("/images", imagesRoute);

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
