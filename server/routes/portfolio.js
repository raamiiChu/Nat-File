import { Router } from "express";
import { User, Portfolio } from "../models/index.js";
import { v4 as uuidv4 } from "uuid";

const route = Router();

route.use((req, res, next) => {
    next();
});

// save portfolio by portfolio id
route.post("/save", async (req, res) => {
    try {
        const { id, images, layouts } = req.body;

        await Portfolio.update({ images, layouts }, { where: { id } });
        return res.status(200).send("update");
    } catch (error) {
        return res.status(500).send("Save Failed");
    }
});

// load portfolio by portfolio id
route.post("/load", async (req, res) => {
    let { id, email } = req.body;

    try {
        // if no id given, create a new portfolio
        if (!id) {
            const foundUser = await User.findOne({ where: { email } });
            const newPortfolio = await Portfolio.create({
                publicId: uuidv4(),
                images: [],
                layouts: {
                    lg: [],
                    md: [],
                    sm: [],
                },
            });
            await newPortfolio.setUser(foundUser);

            return res.status(200).send(newPortfolio);
        } else {
            const rawData = await User.findOne({
                where: { email },
                attributes: ["email"],
                include: [{ model: Portfolio, where: { id } }],
            });

            return res.status(200).send(rawData.Portfolios[0]);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send("something wrong");
    }
});

// get all portfolio by user id
route.get("/loadAll/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const rawData = await User.findOne({
            where: { id },
            attributes: ["email"],
            include: [{ model: Portfolio }],
        });

        return res.status(200).send(rawData);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// get portfolio by public id
route.get("/share/:publicId", async (req, res) => {
    const { publicId } = req.params;
    try {
        const rawData = await Portfolio.findOne({
            where: { publicId },
        });

        if (!rawData) {
            return res.status(404).send("No Found");
        }

        return res.status(200).send(rawData);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// delete portfolio by portfolio id
route.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await Portfolio.destroy({ where: { id } });
        return res.status(200).send("Delete");
    } catch (error) {
        return res.status(500).send("Failed");
    }
});

export default route;
