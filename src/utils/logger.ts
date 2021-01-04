import * as winston from "winston";

// error: 0, 
// warn: 1, 
// info: 2, 
// http: 3,
// verbose: 4, 
// debug: 5, 
// silly: 6 

const options: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === "production" ? "info" : "debug"
        }),
    ]
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}

export default function _logger(child_params: object) {return logger.child(child_params);};
