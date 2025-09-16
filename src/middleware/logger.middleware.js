import winston from "winston";

const transports = [];

if (process.env.NODE_ENV === "production") {
  transports.push(new winston.transports.Console());
} else {
  transports.push(
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" })
  );
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports,
});

export default logger;
