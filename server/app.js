import "dotenv/config";
import express from "express";
import sequelize from "./db.js";

import { userRoute, portfolioRoute } from "./routes/index.js";

const app = express();
const port = 3001;

sequelize.sync();

app.use(express.json());

app.use("/user", userRoute);
app.use("/portfolio", portfolioRoute);

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
