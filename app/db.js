const mysql = require('mysql2');
const caCertificate = Buffer.from(process.env.CA_CERT_BASE64, 'base64').toString('utf-8');
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
        ca: caCertificate
    }
});

module.exports = pool.promise();
