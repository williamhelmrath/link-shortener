require("dotenv").config();
const { Sequelize } = require("sequelize");
const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.post("/shorten/", (req, res) => {
  const { url } = req.body;
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
  const Link = sequelize.define("link", {
    original_link: {
      type: Sequelize.STRING,
      defaultValue: "hackcville.com",
      allowNull: false,
    },
    shortened_link: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  sequelize.sync();
  return sequelize;
};

run((sequelize) => {});

app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on port ${process.env.PORT || 8080}`);
});
