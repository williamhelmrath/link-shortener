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

  await sequelize.authenticate();
  console.log("All good!");
};

run();
