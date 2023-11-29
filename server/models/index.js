import User from "./User.js";
import Portfolio from "./Portfolio.js";

User.hasMany(Portfolio);
Portfolio.belongsTo(User);

await User.sync({ alter: true });
await Portfolio.sync({ force: true });

export { User, Portfolio };
