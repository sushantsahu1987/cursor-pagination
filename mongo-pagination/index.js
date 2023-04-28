const { faker } = require("@faker-js/faker");
const _ = require("lodash");
const n = 1_000_000;
const user_accounts = [];
_.times(n, () => {
  const first_name = faker.name.firstName();
  const last_name = faker.name.lastName();
  const sex = faker.name.sex();
  const email = faker.internet.email();
  const phone = faker.phone.phoneNumber();
  const address = faker.address.streetAddress();
  const city = faker.address.city();
  const state = faker.address.state();
  const country = faker.address.country();
  const job_title = faker.name.jobTitle();
  user_accounts.push({
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
console.log(user_accounts.length);
