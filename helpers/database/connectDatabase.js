const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env"});

console.log(process.env.HOST, process.env.USER, process.env.PASSWORD, process.env.DATABASE);
const connection = mysql.createConnection({
        
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database : process.env.DATABASE
});

connection.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Database connected");
        }
});


module.exports = connection;
