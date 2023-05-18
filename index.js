const express = require('express')
const mysql = require('mysql')

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '' //change this toany password immediatley
})

//connect to MySQL
db.connect(err => {
    if(err) {
        throw err
    }
    console.log('MySQL Connected')
})

const app = express()

//Create Database

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql'
    db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Database Created')
    })
})