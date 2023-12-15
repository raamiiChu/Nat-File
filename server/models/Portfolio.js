import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Portfolio = sequelize.define("Portfolio", {
    publicId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    images: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    layouts: {
        type: DataTypes.JSON,
        allowNull: true,
    },
});

await Portfolio.sync();

export default Portfolio;
