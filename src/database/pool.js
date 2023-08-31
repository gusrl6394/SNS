const mysql = require('mysql2/promise')

const config = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'sns',
    dateStrings: 'date',
    connectionLimit: 10
})

const pool = async() => {
    return await config.getConnection(async (conn) => conn);
}

module.exports = pool