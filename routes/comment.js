var express         = require("express");
var router          = express.Router();
const mysql         = require('mysql');
var mysqlConnection = require('../connection');

// Create comment table
router.get('/create-comment-table', (req, res) => {
    let sql = "CREATE TABLE comment(comment_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, topic_id INT NOT NULL, comment TEXT, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (topic_id) REFERENCES topic(topic_id), FOREIGN KEY (user_id) REFERENCES user(user_id))"
    mysqlConnection.query(sql, (err, result) => {
    if(err){
        console.log(err);
        res.status(500).send({ error: 'Error in creating comment table' })
    }
    res.send(result);
    })
 });

// insert comment in the comment table by making a post request
router.post('/insert-comment', (req, res) => {
    var user_id  = req.body.user_id;
    var topic_id  = req.body.topic_id;
    var comment  = req.body.comment || null;
    if(!user_id || !topic_id){
      console.log("Invalid insert, user id or topic id field cannot be empty");
      res.status(500).send({ error: 'Compulsary field cannot be empty' })
    }
    else{
      var value = [[user_id, topic_id, comment]];
      let sql = "INSERT INTO comment (user_id, topic_id, comment) VALUES ?"
      mysqlConnection.query(sql, [value] , (err, result) => {
      if(err){
        console.log(err);
        res.status(500).send({ error: 'Error in inserting comment into comment table' })
      }
      res.send(result);
      })
    }
   });

// Fetch the entire table of the comment
router.get('/fetch-comments', (req, res) => {
    let sql = "SELECT * FROM comment"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in fetching data from comment table' })
        }
        res.send(result);
      })
  });

// Fetch a particular id from the comment table
router.get('/fetch-comment/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM comment WHERE comment_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch a particular comment' })
      }
      res.send(row)
    })
});

// Fetch set of comments from the comment table using user id
router.get('/fetch-comment-by-userid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM comment WHERE user_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch set of comments from a particular user' })
      }
      res.send(row)
    })
});

// Fetch set of comments from the comment table using topic id
router.get('/fetch-comment-by-topicid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM comment WHERE topic_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch set of comments from a particular topic' })
      }
      res.send(row)
    })
});

// update a particular comment from the comment table
router.put('/update-comment/:id', function(req, res) {
    if(req.body.comment){
      let sql = "UPDATE comment SET comment=" + mysql.escape(req.body.comment) + " WHERE comment_id=" + mysql.escape(req.params.id);
      mysqlConnection.query(sql, (err, result) => {
         if(err) {
             console.log(err);
             res.status(500).send({ error: 'Error in updating comment into comment table' })
         }
      })
    }
    res.send({success: 'Updating the course table is successful'});
   });

 module.exports = router;