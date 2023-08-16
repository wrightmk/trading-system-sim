// This is for development only

const { Client } = require("pg");

const createDatabase = async () => {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "password",
  });

  await client.connect();
  await client.query(`CREATE DATABASE tradingsystemsim;`);
  await client.end();
};

const createDatabaseTest = async () => {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "password",
  });

  await client.connect();
  await client.query(`CREATE DATABASE tradingsystemsimtest;`);
  await client.end();
};

createDatabase();
createDatabaseTest();
