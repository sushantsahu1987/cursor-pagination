require("dotenv").config();
const { faker } = require("@faker-js/faker");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const { Pool } = require("pg");
const format = require("pg-format");

const { PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASSWORD } = process.env;
const pool = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DB,
  password: PG_PASSWORD,
  port: PG_PORT,
});

const create = async () => {
  // Define the SQL query to create a new table
  const createTableQuery = `
  CREATE TABLE user_accounts (
    id TEXT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    sex TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    job_title TEXT NOT NULL
  )
`;

  try {
    await pool.query(createTableQuery);
    console.log("Table user_accounts created successfully");
  } catch (error) {
    console.log("Error while creating user_accounts table", error);
  } finally {
    pool.end();
  }
};

const generate = async () => {
  const n = 1_000_000;
  // const n = 5000;
  const user_accounts = [];
  _.times(n, () => {
    const id = uuidv4();
    const first_name = faker.name.firstName();
    const last_name = faker.name.lastName();
    const sex = faker.name.sex();
    const email = faker.internet.email();
    const phone = faker.phone.number();
    const address = faker.address.streetAddress();
    const city = faker.address.city();
    const state = faker.address.state();
    const country = faker.address.country();
    const job_title = faker.name.jobTitle();
    user_accounts.push({
      id,
      first_name,
      last_name,
      sex,
      email,
      phone,
      address,
      city,
      state,
      country,
      job_title,
    });
  });
  console.log(`${user_accounts.length} records generated`);
  return user_accounts;
};

const write = async (user_accounts) => {

  const chunks = _.chunk(user_accounts, 2000);

  for (let chunk of chunks) {
    console.log("Inserting chunk of 2000 rows", chunk.length);
    const query = format(
      "INSERT INTO user_accounts (id, first_name, last_name, sex, email, phone, address, city, state, country, job_title) VALUES %L",
      chunk.map((row) => [
        row.id,
        row.first_name,
        row.last_name,
        row.sex,
        row.email,
        row.phone,
        row.address,
        row.city,
        row.state,
        row.country,
        row.job_title,
      ])
    );
    try {
      const result = await pool.query(query);
      console.log("Inserted rows:", result.rowCount);
    } catch (error) {
      console.log("Error while inserting rows", error);
    }
  }
  pool.end();
};

const init = async () => {
  // await create();
  const user_accounts = await generate();
  await write(user_accounts);
};

module.exports = init;
