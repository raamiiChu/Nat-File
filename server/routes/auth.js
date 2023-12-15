import { Router } from "express";

const route = Router();

route.use((req, res, next) => {
    next();
});

route.get("/", (req, res) => {
    res.send("ok");
});

export default route;
