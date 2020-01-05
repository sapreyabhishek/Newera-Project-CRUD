var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');

router.get('/create-user-table', (req, res) => {
    let sql = "CREATE TABLE user(user_id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(128) NOT NULL, email VARCHAR(512) NOT NULL, first_name VARCHAR(128), last_name VARCHAR(128), city VARCHAR(64), state VARCHAR(64), country VARCHAR(64), address VARCHAR(1000), standard VARCHAR(256), subscription_type VARCHAR(128) , created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)"
    mysqlConnection.query(sql, (err, result) => {
    if(err){
        console.log(err);
        res.status(500).send({ error: 'Error in creating user table' })
    }
    res.send(result);
    })
 });

router.post('/add-user', (req, res) => {
    var username = req.body.username;
    var first_name= req.body.first_name;
    var email = req.body.email;
    var last_name = req.body.last_name || null;
    var city = req.body.city || null;
    var state = req.body.state || null;
    var country = req.body.country || null;
    var address = req.body.address;
    var standard = req.body.standard || null;
    var subscription_type =req.body.subscription_type || null;

    if(!username || !first_name){
        console.log("Invalid insert, username or firstname cannot be empty");
        res.status(500).send({ error: 'Compulsary filed cannot be empty' })
    }
    else{
        var value    = [[username, email, first_name, last_name, city, state, country, address, standard, subscription_type]];
        let sql = "INSERT INTO user(username, email, first_name, last_name, city, state, country, address, standard, subscription_type) VALUES ?"
        mysqlConnection.query(sql, [value] , (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in inserting  user into user table' })
        }
        res.send(result);
        })
    }
});

// Fetch a particular user from the user table using user id
router.get('/fetch-user/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM user WHERE user_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch a particular user' })
      }
      res.send(row)
    })
});

// Fetch the entire table of the users
router.get('/fetch-users', (req, res) => {
    let sql = "SELECT * FROM user"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in fetching all users from table' })
        }
        res.send(result);
    })
});

// update a particular user from the user table
router.put('/update-user/:id', function(req, res) {

    if(req.body.username){
        let sql = "UPDATE user SET username="+mysql.escape(req.body.username)+" WHERE user_id=" + mysql.escape(req.params.id);
        mysqlConnection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({ error: 'Error in updating username into user table' })
            }
        })
    }
    if(req.body.email){
        let sql = "UPDATE user SET email="+mysql.escape(req.body.email)+" WHERE user_id=" + mysql.escape(req.params.id);
        mysqlConnection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({ error: 'Error in updating email into user table' })
            }
        })
    }
    if(req.body.first_name){
        let sql = "UPDATE user SET first_name="+mysql.escape(req.body.first_name)+" WHERE user_id=" + mysql.escape(req.params.id);
        mysqlConnection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({ error: 'Error in updating first name into user table' })
            }
        })
    }

    if(req.body.last_name){
        let sql = "UPDATE user SET last_name="+mysql.escape(req.body.last_name)+" WHERE user_id=" + mysql.escape(req.params.id);
        mysqlConnection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({ error: 'Error in updating last name into user table' })
            }
        })
    }

    if(req.body.city){
        let sql = "UPDATE user SET city="+mysql.escape(req.body.city)+" WHERE user_id=" + mysql.escape(req.params.id);
        mysqlConnection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({ error: 'Error in updating city into user table' })
            }
        })
    }

    if(req.body.state){
        let sql = "UPDATE user SET state="+mysql.escape(req.body.state)+" WHERE user_id=" + mysql.escape(req.params.id);
        mysqlConnection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({ error: 'Error in updating state into user table' })
            }
        })
    }

    if(req.body.country){
        let sql = "UPDATE user SET country="+mysql.escape(req.body.country)+" WHERE user_id=" + mysql.escape(req.params.id);
        mysqlConnection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({ error: 'Error in updating country into user table' })
            }
        })
    }

    if(req.body.address){
        let sql = "UPDATE user SET address="+mysql.escape(req.body.address)+" WHERE user_id=" + mysql.escape(req.params.id);
        mysqlConnection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({ error: 'Error in updating address into user table' })
            }
        })
    }

    if(req.body.standard){
        let sql = "UPDATE user SET standard="+mysql.escape(req.body.standard)+" WHERE user_id=" + mysql.escape(req.params.id);
        mysqlConnection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({ error: 'Error in updating standard into user table' })
            }
        })
    }

    if(req.body.subscription_type){
        let sql = "UPDATE user SET subscription_type="+mysql.escape(req.body.subscription_type)+" WHERE user_id=" + mysql.escape(req.params.id);
        mysqlConnection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({ error: 'Error in updating subscription_type into user table' })
            }
        })
    }

    res.send({'status': 'success'})
  });

// delete a particular user from the user table
router.delete('/delete-user/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = "DELETE FROM user WHERE user_id=" + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err)  {
        console.log(err);
        res.status(500).send({ error: 'Error in deleting a user from user table' })
    }
      res.send({'status': 'success'})
    })
  });



module.exports = router;