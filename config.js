const mysql = require('mysql')

const dbConn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'medical'
})

dbConn.connect(function(err){
    if (err) throw error;
    console.log('Database connected')
})

module.exports = dbConn