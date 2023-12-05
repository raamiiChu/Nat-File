import User from "./User.js";
import Portfolio from "./Portfolio.js";

User.hasMany(Portfolio);
Portfolio.belongsTo(User);

await User.sync({ alter: true });
await Portfolio.sync({ alter: true });

export { User, Portfolio };
