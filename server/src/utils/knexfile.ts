require("ts-node/register");

const path = require("path");
const config: {
  [key: string]: {
    client: string;
    connection: any;
    migrations: { directory: string };
  };
} = {
  development: {
    client: "pg",
    connection:
      process.env.USING_DOCKER === "true"
        ? process.env.DATABASE_URL
        : {
            host: "localhost",
            port: 5432,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
          },
    migrations: {
      directory: "../../migrations",
    },
  },
  test: {
    client: "pg",
    connection:
      process.env.USING_DOCKER === "true"
        ? process.env.TEST_DATABASE_URL
        : {
            host: "localhost",
            port: 5432,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
          },
    migrations: {
      directory: path.join(__dirname, "../../migrations"),
    },
  },
};
export default config;
