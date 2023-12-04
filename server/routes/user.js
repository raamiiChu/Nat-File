import { Router } from "express";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const route = Router();

route.use((req, res, next) => {
    next();
});

route.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    const foundUser = await User.findOne({
        where: {
            email,
        },
    });

    if (foundUser) {
        return res.status(409).send("User exists");
    }

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
            await User.create({ email, password: hash });

            return res.status(307).redirect("/user/signin");
        });
    });
});

route.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    const foundUser = await User.findOne({
        where: {
            email,
        },
    });

    if (!foundUser) {
        return res.status(404).send("User no Found");
    }

    const { password: foundPassword } = foundUser;

    // Load hash from your password DB.
    bcrypt.compare(password, foundPassword, (err, isMatch) => {
        if (err) {
            return callback(err, isMatch);
        }

        if (isMatch) {
            // Correct

            const tokenObject = {
                email,
            };

            const access_expired = 3600;
            const token = jwt.sign(tokenObject, process.env.JWT_SECRET, {
                expiresIn: access_expired,
            });

            // token = "JWT " + token
            return res.status(200).send({
                token: "JWT " + token,
            });
        } else {
            // Not Correct
            return res.status(400).send("not correct");
        }
    });
});

export default route;
