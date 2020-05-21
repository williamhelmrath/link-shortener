const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DATABASE_HOST,
  }
);

sequelize
  .authenticate()
  .then((res) => {
    console.log("All good!");
  })
  .catch((error) => {
    console.error("couldn't reach auth!");
    console.error("exiting");
    process.exit(1);
  });

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

console.log("Link has been defined!");

sequelize
  .sync()
  .then((res) => {
    console.log("Successfully synced!");
  })
  .catch((error) => {
    console.error("Couldn't sync database");
    console.error("exiting");
    process.exit(1);
  });

// Link.create({ original_link: "youtube.com", shortened_link: "asdf" }).then(
//   (link) => {
//     console.log(("ID:", link.id));
//   }
// );

module.exports = {
  Link,
};
