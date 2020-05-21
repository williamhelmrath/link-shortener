require("dotenv").config();
const { Sequelize } = require("sequelize");

const run = async () => {
  const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: "postgres",
      host: process.env.DATABASE_HOST,
    }
  );
  try {
    await sequelize.authenticate();
    console.log("All good!");
  } catch {
    console.error("couldn't reach auth!");
    console.error("exiting");
    process.exit(1);
  }
};

run();
