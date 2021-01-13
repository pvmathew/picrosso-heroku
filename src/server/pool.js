const { Pool } = require("pg");

const pool = new Pool({
  user: "pavinmathew",
  host: process.env.DATABASE_URL,
  database: "postgresql-colorful-58485",
});

module.exports = pool;
