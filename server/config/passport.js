import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/User.js";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
        const { email } = jwt_payload;

        try {
            let foundUser = await User.findOne({
                where: { email },
            });

            // check if user exists
            if (foundUser) {
                const { email } = foundUser;
                return done(null, { email });
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(err, false);
        }
    })
);
