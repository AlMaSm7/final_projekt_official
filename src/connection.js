
module.exports = function() {
    const mysql = require('mysql')
    this.connect = function () {

        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            port: 8086,
            password: "videoshare_dababy"
        })

        if (err) {
            return console.error('error: ' + err.message)
        }

        console.log('Connected to the MySQL server.')
    }
}
