import { Router } from "express";

const route = Router();

route.use((req, res, next) => {
    next();
});

route.get("/", (req, res) => {
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.send("ok");
});

export default route;
