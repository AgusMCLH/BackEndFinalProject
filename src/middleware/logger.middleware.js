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
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports,
});

export { logger };

export const loggerMiddleware = (req, res, next) => {
  req.logger = logger;
  if (req.method !== "GET") {
    logger.info(
      `${req.method} - ${req.url} - [${req.ip}] - ${new Date().toLocaleString()}`
    );
  }
  next();
};
