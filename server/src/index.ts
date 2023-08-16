require("dotenv").config({ path: "../.env" });

import app from "./app";

let SERVER_HOST: string;
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || 3001;

if (process.env.USING_DOCKER === "true" && process.env.REACT_APP_SERVER_URL) {
  SERVER_HOST = process.env.REACT_APP_SERVER_URL;
} else {
  SERVER_HOST = "localhost";
}

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`);
});
