var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection')

// create question bank table
router.get('/create-question-bank', (req, res) => {
    let sql = "CREATE TABLE question_bank(question_id INT AUTO_INCREMENT PRIMARY KEY, question TEXT NOT NULL, option1 VARCHAR(8000), option2 VARCHAR(8000), option3 VARCHAR(8000), option4 VARCHAR(8000), subject_id INT NOT NULL, topic_id INT NOT NULL, answer TEXT NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  FOREIGN KEY (subject_id) REFERENCES subject(subject_id), FOREIGN KEY (topic_id) REFERENCES topic(topic_id))"
    mysqlConnection.query(sql, (err, result) => {
    if(err){
      console.log(err);
      res.status(500).send({ error: 'Error in creating question bank table' })
    }
    res.send(result);
    })
 });


 // insert question in the question bank by making a post request
 router.post('/insert-question', (req, res) => {
  var option1  = req.body.option1 || null;
  var option2  = req.body.option2 || null;
  var option3  = req.body.option3 || null;
  var option4  = req.body.option4 || null;
  var subject_id  = req.body.subject_id;
  var topic_id    = req.body.topic_id;
  var answer   = req.body.answer;
  var question = req.body.question;
  if(!subject_id || !answer || !topic_id || !question){
    console.log("Invalid insert, question or answer or topic id or subject id field cannot be empty");
    res.status(500).send({ error: 'Compulsary field cannot be empty' })
  }
  else{
    var value = [[question, option1, option2, option3, option4, subject_id, topic_id, answer]];
    let sql = "INSERT INTO question_bank (question, option1, option2, option3, option4, subject_id, topic_id, answer) VALUES ?"
    mysqlConnection.query(sql, [value] , (err, result) => {
    if(err){
      console.log(err);
      res.status(500).send({ error: 'Error in inserting question into question bank table' })
    }
    res.send(result);
    })
  }
 })

// Fetch the entire table of the question bank except the answer
router.get('/fetch-questions', (req, res) => {
  let sql = "SELECT question, option1, option2, option3, option4, subject_id, topic_id FROM question_bank"
  mysqlConnection.query(sql , (err, result) => {
    if(err){
      console.log(err);
      res.status(500).send({ error: 'Error in fectching  all questions' })
    }
    res.send(result);
    })
})

// Fetch a particular question from the question bank
router.get('/fetch-one-question/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM question_bank WHERE question_id="  + mysql.escape(id);
  mysqlConnection.query(sql, function(err, row, fields) {
    if(err){
      console.log(err);
      res.status(500).send({ error: 'Error in fectching a particular questions' })
    }
    res.send(row);
  })
});

// Fetch all questions from the question bank with a particular topic
router.get('/fetch-questions-topic/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM question_bank WHERE topic_id="  + mysql.escape(id);
  mysqlConnection.query(sql, function(err, row, fields) {
    if(err){
      console.log(err);
      res.status(500).send({ error: 'Error in fectching all questions from a topic' })
    }
    res.send(row);
  })
});

// Fetch all questions from the question bank with a particular subject
router.get('/fetch-questions-subject/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM question_bank WHERE subject_id="  + mysql.escape(id);
  mysqlConnection.query(sql, function(err, row, fields) {
    if(err){
      console.log(err);
      res.status(500).send({ error: 'Error in fectching all questions from a subject' })
    }
    res.send(row);
  })
});

// update the question from the database
router.put('/update-question/:id', function(req, res) {
  if(req.body.question){
    let sql = "UPDATE question_bank SET question="+mysql.escape(req.body.question)+" WHERE question_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in updating a question into question bank table' })
        }
    })
  }

  if(req.body.option1){
    let sql = "UPDATE question_bank SET option1="+mysql.escape(req.body.option1)+" WHERE question_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in updating option1 of a question into question bank table' })
        }
    })
  }

  if(req.body.option2){
    let sql = "UPDATE question_bank SET option2="+mysql.escape(req.body.option2)+" WHERE question_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in updating option2 of a question into question bank table' })
        }
    })
  }

  if(req.body.option3){
    let sql = "UPDATE question_bank SET option3="+mysql.escape(req.body.option3)+" WHERE question_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in updating option3 of a question into question bank table' })
        }
    })
  }

  if(req.body.option4){
    let sql = "UPDATE question_bank SET option4="+mysql.escape(req.body.option4)+" WHERE question_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in updating option4 of a question into question bank table' })
        }
    })
  }

  if(req.body.answer){
    let sql = "UPDATE question_bank SET answer="+mysql.escape(req.body.answer)+" WHERE question_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in updating answer of a question into question bank table' })
        }
    })
  }

  if(req.body.subject_id){
    let sql = "UPDATE question_bank SET subject_id="+mysql.escape(req.body.subject_id)+" WHERE question_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in updating subject id of a question into question bank table' })
        }
    })
  }

  if(req.body.topic_id){
    let sql = "UPDATE question_bank SET topic_id="+mysql.escape(req.body.topic_id)+" WHERE question_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in updating topic id of a question into question bank table' })
        }
    })
  }

  res.send({'status': 'success'})
});

// delete a particular question from the database
router.delete('/delete-question/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = "DELETE FROM question_bank WHERE question_id=" + mysql.escape(id);
  mysqlConnection.query(sql, function(err, result) {
    if(err){
      console.log(err);
      res.status(500).send({ error: 'Error in deleting a  question' })
    }
    res.send(result);
  })
});

// delete all questions from the question bank of a particular topic
router.delete('/delete-questions-topic/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = "DELETE FROM question_bank WHERE topic_id=" + mysql.escape(id);
  mysqlConnection.query(sql, function(err, result) {
    if(err){
      console.log(err);
      res.status(500).send({ error: 'Error in deleting a  question' })
    }
    res.send(result);
  })
});

// delete all questions from the question bank of a particular subject
router.delete('/delete-questions-subject/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = "DELETE FROM question_bank WHERE subject_id=" + mysql.escape(id);
  mysqlConnection.query(sql, function(err, result) {
    if(err){
      console.log(err);
      res.status(500).send({ error: 'Error in deleting a  question' })
    }
    res.send(result);
  })
});

module.exports = router;