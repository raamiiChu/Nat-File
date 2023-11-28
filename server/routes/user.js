import { Router } from "express";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

const route = Router();

route.use((req, res, next) => {
    next();
});

route.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    res.send({ name, email, password });

    // hash a password
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            next(err);
        }

        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                next(err);
            }

            // Store your password
            await User.create({ name, email, password: hash });
        });
    });
});

route.post("/signin", async (req, res) => {
    const { name, email, password } = req.body;

    const foundUser = await User.findOne({
        where: {
            name,
            email,
        },
    });

    if (!foundUser) {
        return res.status(404).send("User no Found");
    }

    const foundPassword = foundUser.password;

    // Load hash from your password DB.
    bcrypt.compare(password, foundPassword, (err, isMatch) => {
        if (err) {
            return callback(err, isMatch);
        }

        if (isMatch) {
            // Correct
            return res.status(200).send("correct");
        } else {
            // Not Correct
            return res.status(400).send("not correct");
        }
    });
});

export default route;
