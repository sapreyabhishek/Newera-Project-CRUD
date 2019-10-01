const express = require('express');
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
const app = express();

var mysqlConnection = require('./connection')

app.use(methodOverride("_method"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));




// Create the database
app.get('/creatdb', (req,res) => {
    let sql = 'CREATE DATABASE nodemysql'
    mysqlConnection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database Created');
    })
})

var indexRoutes = require("./routes/question_bank");
var userRoutes  = require("./routes/user")

app.use("/", indexRoutes);
app.use("/user", userRoutes)

app.listen('3000', () => {
    console.log('Server started at port 3000');
})