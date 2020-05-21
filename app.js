require("dotenv").config();
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const express = require("express");
const app = express();
const { Link } = require("./sequelize");

// run();
app.post("/shorten/", (req, res) => {
  const { url } = req.body;
  console.log(`shortening ${url}`);
});

app.get("/:hash", async (req, res) => {
  const { hash } = req.params;
  console.log(hash);
  Link.findAll({
    where: {
      shortened_link: hash,
      original_link: {
        [Op.not]: null,
      },
    },
  }).then((links) => {
    console.log(links);
  });
});

let PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
