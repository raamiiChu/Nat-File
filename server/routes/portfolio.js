import { Router } from "express";
import { User, Portfolio } from "../models/index.js";
const route = Router();

route.use((req, res, next) => {
    next();
});

route.post("/save", async (req, res) => {
    const { email, images, layouts } = req.body;

    const foundUser = await User.findOne({ where: { email } });

    let rawData = await User.findOne({
        where: { id: 1 },
        attributes: ["name", "email"],
        include: [{ model: Portfolio, attributes: ["images", "layouts"] }],
    });

    if (rawData.Portfolios.length === 0) {
        const newPortfolio = await Portfolio.create({ images, layouts });
        await newPortfolio.setUser(foundUser);
        return res.status(200).send("create");
    } else {
        await Portfolio.update({ images, layouts }, { where: { id: 1 } });
        return res.status(200).send("update");
    }
});

route.get("/load", async (req, res) => {
    try {
        let rawData = await User.findOne({
            where: { id: 1 },
            attributes: ["name", "email"],
            include: [{ model: Portfolio, attributes: ["images", "layouts"] }],
        });

        return res.status(200).send(rawData);
    } catch (error) {
        console.log(error);
        return res.status(400).send("something wrong");
    }
});

export default route;
