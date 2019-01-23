const prod = process.argv.indexOf("-p") !== -1;
const env = process.env.NODE_ENV || (prod ? "production" : false) || "development"

module.exports = require(`./config/${env}.config`)