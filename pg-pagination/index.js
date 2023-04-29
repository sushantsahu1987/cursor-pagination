require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cursor_controller = require("./pagination/cursor");
const offset_controller = require("./pagination/offset");

const main = async () => {
  const app = express();
  const { PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASSWORD } = process.env;
  const pool = new Pool({
    user: PG_USER,
    host: PG_HOST,
    database: PG_DB,
    password: PG_PASSWORD,
    port: PG_PORT,
  });

  app.get("/api/cursor/:page", cursor_controller(pool));

  app.get("/api/offset/:page", offset_controller(pool));

  app.listen(3001, () => {
    console.log("listening on server 3001");
  });
};

main();
