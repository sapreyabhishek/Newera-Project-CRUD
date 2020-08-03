var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');

 // create AITS integer type question table
 router.get('/create-aits-integer-type-question', (req, res) => {
    let sql = "CREATE TABLE aits_integer_type_question(question_id INT AUTO_INCREMENT PRIMARY KEY, subject_id INT NOT NULL, topic_id INT NOT NULL, question_image_url VARCHAR(256), options INT NOT NULL, correct_answer INT, total_marks FLOAT, question_description TEXT, solution_image_url VARCHAR(256), negative_mark FLOAT DEFAULT 0, partial_mark FLOAT DEFAULT 0, FOREIGN KEY (subject_id) REFERENCES aits_subject(subject_id), FOREIGN KEY (topic_id) REFERENCES aits_topic(topic_id))"
    mysqlConnection.query(sql, (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }else{
        res.status(200).send(result);
      }
    })
});

// insert AITS integer type questions in the AITS integer type questions table by making a post request
router.post('/insert-aits-integer-choice-question', (req, res) => {
    var subject_id  		= req.body.subject_id;
    var topic_id		    = req.body.topic_id;
    var question_image_url	= req.body.question_image_url   || null;
    var correct_answer    	= req.body.correct_answer       || null;
    var total_marks       	= req.body.total_marks          || null;
    var question_description= req.body.question_description || null;
    var solution_image_url  = req.body.solution_image_url   || null;
    var negative_mark  = req.body.negative_mark   || 0;
    var partial_mark  = req.body.partial_mark  || 0;
   
    if(!subject_id){
        console.log("Invalid insert subject_id cannot be empty");
        res.status(202).send({ error: 'Invalid insert subject_id cannot be empty' })
    }
    else if(!topic_id){
        console.log("Invalid insert question topic_id cannot be empty");
        res.status(202).send({ error: 'Invalid insert question topic_id cannot be empty' })
    }
    else{
      var value    = [[subject_id, topic_id, question_image_url, correct_answer, total_marks, question_description, solution_image_url, negative_mark, partial_mark]];
      let sql = "INSERT INTO aits_integer_type_question (subject_id, topic_id, question_image_url, correct_answer, total_marks, question_description, solution_image_url, negative_mark, partial_mark) VALUES ?"
      mysqlConnection.query(sql, [value] , (err, result) => {
         if(err) {
             res.status(202).send({ error: err })
         }
         else{
            res.status(200).send(result);
         }
      })
    }
});

// Fetch the entire data of the AITS integer type questions table
router.get('/fetch-aits-integer-type-questions', (req, res) => {
    let sql = "SELECT * FROM aits_integer_type_question"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
      });
});

// Fetch a particular id from the AITS integer type question table using its question id
router.get('/fetch-aits-integer-type-question-by-questionid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM aits_integer_type_question WHERE question_id="  + mysql.escape(id) ;
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    });
  });
  
  
// Fetch a particular id from the AITS integer question table using its subject_id
router.get('/fetch-aits-integer-type-question-by-subjectid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM aits_integer_type_question WHERE subject_id="  + mysql.escape(id) ;
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    });
});

// Fetch a particular id from the AITS integer type question table using its question topic_id
router.get('/fetch-aits-integer-type-question-by-topicid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM aits_integer_type_question WHERE topic_id="  + mysql.escape(id) ;
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    })
  });

// update a particular AITS integer type questions from the AITS integer type questions table
router.post('/update-aits-integer-type-question/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM aits_integer_type_question WHERE question_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        if(result.length !=0){
            var subject_id	         = req.body.subject_id       	 || result[0].subject_id;
            var topic_id		     = req.body.topic_id 			 || result[0].topic_id;
            var question_image_url   = req.body.question_image_url   || result[0].question_image_url;
            var correct_answer       = req.body.correct_answer       || result[0].correct_answer;
            var total_marks          = req.body.total_marks          || result[0].total_marks;
            var question_description = req.body.question_description || result[0].question_description;
            var solution_image_url   = req.body.solution_image_url   || result[0].solution_image_url;
            var negative_mark        = req.body.negative_mark        || result[0].negative_mark;
            var partial_mark         = req.body.partial_mark         || result[0].partial_mark;
            let sql2 = "UPDATE aits_integer_type_question SET subject_id = ?, topic_id = ?, question_image_url =?, correct_answer = ?, total_marks = ?, question_description = ?, solution_image_url = ?, negative_mark = ?, partial_mark = ? WHERE question_id= ?";
            mysqlConnection.query(sql2, [subject_id, topic_id, question_image_url, correct_answer, total_marks, question_description, solution_image_url, negative_mark, partial_mark, id], (err2, result2) => {
                if(err2) {
                    res.status(202).send({ error: err2 })
                }
                else{
                    res.status(200).send({success : "Table was succesfully updated."});
                }
            });
        }
        else{
            res.status(400).send({error : "No question with this questionid exits."});
        }
      }
    })
});
  
// delete a particular AITS integer type question from the AITS integer type question table
router.delete('/delete-aits-integer-type-question/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = "DELETE FROM aits_integer_type_question WHERE question_id=" + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
        if(err)  {
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send({'status': 'success'});
        }
    });
});

module.exports = router;
