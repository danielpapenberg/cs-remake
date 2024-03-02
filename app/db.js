const mysql = require('mysql2');
const fs = require('fs');
const caPath = process.env.CA_CERT_PATH;

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 50,
    queueLimit: 0,
    ssl: {
        ca: fs.readFileSync(caPath)
    }
});

module.exports = pool.promise();
