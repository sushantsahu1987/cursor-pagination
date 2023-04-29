require("dotenv").config();
const { faker } = require("@faker-js/faker");
const _ = require("lodash");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const generate = async () => {
  const n = 1_000_000;
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
  const url = process.env.MONGO_URL;
  const client = new MongoClient(url);
  const dbName = process.env.DB_NAME;
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("user_accounts");
  console.log(`process to write ${user_accounts.length} records started`);
  const result = await collection.insertMany(user_accounts);
  console.log("records inserted : ", result.insertedCount);
  // const user_accounts_result = await collection.find({}).toArray();
  // console.log(user_accounts_result.length);
};

const main = async () => {
  const user_accounts = await generate();
  await write(user_accounts);
};
