var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');

router.get('/create-user-table', (req, res) => {
    let sql = "CREATE TABLE user(id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(128) NOT NULL, first_name VARCHAR(128) NOT NULL, last_name VARCHAR(128), city VARCHAR(64), state VARCHAR(64), country VARCHAR(64), address VARCHAR(1000), standard VARCHAR(256), subsrciption_type VARCHAR(128) DEFAULT" + 'noraml' +", created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)"
    mysqlConnection.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send(result);
    })
 });

router.post('/add-user', (req, res) => {
    console.log(req.body)
    const { username, first_name, last_name, city, state, country, standard, subscription_type } = req.body;
    if(!username || !first_name || !last_name){
        console.log("Invalid insert, username or firstname or topic filed cannot be empty");
        res.status(500).send({ error: 'Cumpolsary filed cannot be empty' })
    }
    else{
        var value    = [[question, option1, option2, option3, option4, subject, topic, answer]];
        let sql = "INSERT INTO question_bank (question, option1, option2, option3, option4, subject, topic, answer) VALUES ?"
        mysqlConnection.query(sql, [value] , (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result);
        })
    }
})


module.exports = router;