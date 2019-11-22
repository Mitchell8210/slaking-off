const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    user: 'root',
    password: '',
    database: 'merry-go-round',
    host: 'localhost'

})

module.exports = pool