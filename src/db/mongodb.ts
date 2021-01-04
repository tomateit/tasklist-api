import * as mongoose from "mongoose";
import _logger from "../utils/logger";

const logger = _logger({"source": "mongodb_connection"})

export async function mongodbConnect() {
    //---------MONGO DB SETUP -------
    const DATABASE_URI: string | undefined = process.env.DATABASE_URI;

    if(!DATABASE_URI) {
        throw new Error("NO MONGODB CONNECTION PROVIDED")
    }
    const MONGODB_CONNECTION_STRING = DATABASE_URI;

    mongoose.connection.on("connecting", () => {
        logger.debug("Connecting to db...")
    })

    mongoose.connection.on("connected", () => {
        logger.debug("Successfully connected to db.")
    })

    mongoose.connection.on("error", (error) => {
        logger.error("DB connection failure:", error)
    })

    await mongoose.connect(MONGODB_CONNECTION_STRING, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    logger.debug("Listing collections: ", mongoose.connection.modelNames())
}


