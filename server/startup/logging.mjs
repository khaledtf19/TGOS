import "express-async-errors";
import winston from "winston";
const connectionString = process.env.ATLAS_URI;

module.exports = function () {
  new winston.ExceptionHandler(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(new winston.transports.File({ filename: "error.log" }));
};
