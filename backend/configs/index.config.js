require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8080,
    SECRET: process.env.SECRET,
    BASE_URL: process.env.BASE_URL || 'http://localhost:8080',
}
