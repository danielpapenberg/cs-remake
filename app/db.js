const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,      // Your MySQL host
    user: process.env.MYSQL_USER,      // Your MySQL username
    password: process.env.MYSQL_PASSWORD,  // Your MySQL password
    database: process.env.MYSQL_DATABASE,  // Your MySQL database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Export the pool promise for use in other files
module.exports = pool.promise();
