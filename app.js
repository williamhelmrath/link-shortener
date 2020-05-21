require("dotenv").config();
const { Sequelize } = require("sequelize");
const express = require("express");
const app = express();
const path = require("path");

app.post("/shorten/:url", (req, res) => {
  const { url } = req.params;
  console.log(`shortening ${url}`);
});

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

app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on port ${process.env.PORT || 8080}`);
});

run();
