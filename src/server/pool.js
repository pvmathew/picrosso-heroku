const { Pool } = require("pg");

const pool = new Pool({
  user: "pavinmathew",
  database: "picrosso",
});

module.exports = pool;
