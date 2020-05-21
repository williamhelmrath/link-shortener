require("dotenv").config();
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const express = require("express");
const app = express();
const { Link } = require("./sequelize");
const crypto = require("crypto");
const path = require("path");
const normalizeUrl = require("normalize-url");
app.use(express.json());

app.post("/shorten/", (req, res) => {
  const url = normalizeUrl(req.body.url, { forceHttps: true });
  console.log(`shortening ${url}`);
  const hash = crypto.createHash("sha1");
  hash.update(url);
  let shortened = hash.digest("base64").substring(0, 10);
  console.log(shortened);
  Link.create({ original_link: url, shortened_link: shortened })
    .then((newLink) => {
      res.status(200);
      res.json(newLink);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.json(err);
    });
});
app.get("/info/:hash", (req, res) => {
  const { hash } = req.params;
  Link.findAll({
    where: {
      shortened_link: hash,
      original_link: {
        [Op.not]: null,
      },
    },
  }).then((links) => {
    if (links.length !== 0) {
      console.log(links);
      res.status(200);
      res.contentType("json");
      res.send(links);
    } else {
      res.status(404);
      res.send("no link info");
    }
  });
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
    if (links.length !== 0) {
      let original_link = links[0].dataValues.original_link;
      console.log(original_link);
      res.redirect(original_link);
    } else {
      res.status(404).send("Sorry, that link does not exist");
    }
  });
});
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

let PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  setInterval(() => {
    console.log("cleaning entries");
    Link.destroy({
      where: {
        updatedAt: {
          [Op.lt]: Date.now() - 604800000,
        },
      },
    }).then(() => {
      console.log("cleared");
    });
  }, 604800000); //week in ms 604800000
});
