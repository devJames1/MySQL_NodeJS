const express = require('express')
const mysql = require('mysql')

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', //change this to any password immediatley
    database: 'nodemysql' //add this line after creating datatbase, before creating table
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

//Create Table
app.get('/createemployee', (req, res) => {
    let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))'
    db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Employee table created')
    })
})

//Insert employee
app.get('/employee1', (req, res) => {
    let post = {name: 'Jake smith', designation: 'Cheif Executive Oficcer'}
    let sql = 'INSERT INTO employee SET ?'
    db.query(sql, post, err => {
        if(err) {
            throw err
        }
        res.send('Employee added')
    })
})

//select employees
app.get('/getemployee', (req, res) => {
    let sql = 'SELECT * FROM employee'
    db.query(sql, (err, results) => {
        if(err) {
            throw err
        }
        console.log(results)
        res.send('Employee details fetched')
    }) 
})

//update employee
app.get('/updateemployee/:id', (req, res) => {
    let newname = 'Updated name'
    let sql = `UPDATE employee SET name = '${newname}' WHERE id = ${req.params.id}`
    db.query(sql, err => {
        if(err){
            throw err
        }
        res.send('Employee updated')
    })
})

//delete employee
app.get('/deleteemployee/:id', (req, res) => {
    let sql = `DELETE FROM employee WHERE id = ${req.params.id}`
    db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Employee deleted')
    })
})

// 3000 is always the default port
app.listen(3000, () => {
    console.log('Server started on port 3000')
})