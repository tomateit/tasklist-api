import dontenv = require("dotenv");
import _logger from "./utils/logger";

const logger = _logger({"source": "index"})

import APIServer from "./app";

dontenv.config();

const port: string | undefined = process.env.PORT;

const API = new APIServer();

API.app.listen(port, () => {
  logger.info(`listening at port ${port}...`);
});
