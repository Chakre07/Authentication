const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "users",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
});

module.exports = knex;
