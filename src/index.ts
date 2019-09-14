import dontenv = require("dotenv");

import AppServer from "./server/app";

dontenv.config();

const port: string | undefined = process.env.PORT;
console.log(port);

const s = new AppServer();
s.app.listen(port, () => {
  console.log("listening...");
});
