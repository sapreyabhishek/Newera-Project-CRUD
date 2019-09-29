var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection')

// create question bank table
router.get('/create-question-bank-table', (req, res) => {
    let sql = "CREATE TABLE question_bank(id INT AUTO_INCREMENT PRIMARY KEY, question TEXT NOT NULL, option1 VARCHAR(8000), option2 VARCHAR(8000), option3 VARCHAR(8000), option4 VARCHAR(8000), subject VARCHAR(100) NOT NULL, topic VARCHAR(1000), answer TEXT NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)"
    mysqlConnection.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send(result);
    })
 });


 // insert question in the question bank by making a post request
 router.post('/insert-question-in-question-bank', (req, res) => {
   console.log(req.body)
  var option1  = req.body.option1 || null;
  var option2  = req.body.option2 || null;
  var option3  = req.body.option3 || null;
  var option4  = req.body.option4 || null;
  var subject  = req.body.subject;
  var topic    = req.body.topic || null;
  var answer   = req.body.answer;
  var question = req.body.question;
  if(!subject || !answer || !question){
    console.log("Invalid insert, question or answer or topic filed cannot be empty");
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

// Fetch the entire table of the question bank except the answer
router.get('/fetch-questions', (req, res) => {
  let sql = "SELECT question, option1, option2, option3, option4, subject, topic FROM question_bank"
  mysqlConnection.query(sql , (err, result) => {
      if(err) throw err;
      res.json(result);
    })
})

// Fetch a particular question from the question bank
router.get('/fetch-one-question/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM question_bank WHERE id="  + mysql.escape(id);
  mysqlConnection.query(sql, function(err, row, fields) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    console.log(fields)
    res.json(row)
  })
});

// update the question from the database
router.put('/update-question/:id', function(req, res) {
  var question = req.body.question;
  var option1  = req.body.option1;
  var option2  = req.body.option2;
  var option3  = req.body.option3;
  var option4  = req.body.option4;
  var subject  = req.body.subject;
  var topic    = req.body.topic;
  var answer   = req.body.answer;
  console.log(req.params.id)
  if(!subject || !answer || !question){
    console.log("Invalid update, question or answer or topic filed cannot be empty");
    res.status(500).send({ error: 'Compulsary filed cannot be empty' })
  }
  else{
    let sql = "UPDATE question_bank SET question="+mysql.escape(question)+", option1="+mysql.escape(option1)+", option2="+mysql.escape(option2)+", option3="+mysql.escape(option3)+", option4="+mysql.escape(option4)+", subject="+mysql.escape(subject)+", topic="+mysql.escape(topic)+", answer="+mysql.escape(answer)+" WHERE id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.json(result);
    })
  }
});

// delete a particular question from the database
router.delete('/delete-question/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = "DELETE FROM question_bank WHERE id=" + mysql.escape(id);
  mysqlConnection.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({'status': 'success'})
  })
})


module.exports = router;