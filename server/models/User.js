import sequelize from "../db.js";

import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default User;
