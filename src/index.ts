import dontenv = require("dotenv");

import APIServer from "./app";

dontenv.config();

const port: string | undefined = process.env.PORT;

const API = new APIServer();

API.app.listen(port, () => {
  console.log(`listening at port ${port}...`);
});
