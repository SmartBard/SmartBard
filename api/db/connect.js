require('dotenv').config()
const {Client} = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: process.env.PASSWORD,
    database: 'test'
})

client.connect();

client.query(`SELECT * FROM person`, (err, res) => {
    if(!err){
        console.log(res.rows);
    } else {
        console.log(err.message)
    }
})