const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    serviceName: process.env.SERVICE_NAME,
    dbUrl: process.env.MONGO_URL,
};
