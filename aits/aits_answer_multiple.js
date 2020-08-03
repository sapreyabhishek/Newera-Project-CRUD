var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');

// create AITS multiple choice answer table
router.get('/create-aits-multiple-choice-answer', (req, res) => {
  let sql = "CREATE TABLE aits_multiple_choice_answer(answer_id INT AUTO_INCREMENT PRIMARY KEY, question_id INT NOT NULL, user_id VARCHAR(128) NOT NULL, answer TEXT, answer_gain FLOAT default 0, FOREIGN KEY (question_id) REFERENCES aits_multiple_choice_questions(question_id), FOREIGN KEY (user_id) REFERENCES user(user_id))"
  mysqlConnection.query(sql, (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
      }
      else{
          res.status(200).send(result);
      }
  })
});

    // insert AITS multiple choice answer in the AITS multiple choice answer table by making a post request
 router.post('/insert-aits-multiple-choice-answer', (req, res) => {
  var question_id  	= req.body.question_id;
  var user_id		= req.body.user_id;
  var answer    	= req.body.answer || null;
  var answer_gain	= req.body.answer_gain || 0;

  if(!question_id){
    console.log("Invalid insert, question id cannot be empty");
    res.status(202).send({ error: 'Invalid insert, question id cannot be empty' });
  }
  else if(!user_id){
    console.log("Invalid insert, user_id cannot be empty");
    res.status(202).send({ error: 'Invalid insert, user_id cannot be empty' });
  }
  else{
    var value    = [[question_id, user_id, answer, answer_gain]];
    let sql = "INSERT INTO aits_multiple_choice_answer (question_id, user_id, answer, answer_gain) VALUES ?"
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

// Fetch the entire data of the AITS multiple choice answer table
router.get('/fetch-aits-multiple-choice-answer', (req, res) => {
  let sql = "SELECT * FROM aits_multiple_choice_answer"
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
}); 
 
 // Fetch a particular id from the AITS multiple choice answer table using its answer id
router.get('/fetch-aits-multiple-choice-answer/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM aits_multiple_choice_answer WHERE answer_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});
 
// Fetch a particular id from the AITS multiple choice answer table using its question id
router.get('/fetch-aits-multiple-answer-by-questionid/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM aits_multiple_choice_answer WHERE question_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
}); 

// Fetch a particular id from the AITS multiple choice answer table using its user id
router.get('/fetch-aits-multiple-answer-by-userid/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM aits_multiple_choice_answer WHERE user_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});


// update a AITS particular multiple choice answer from the AITS multiple choice answer table
router.post('/update-aits-multiple-choice-answer/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM aits_multiple_choice_answer WHERE answer_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        if(result.length !=0){
            var question_id   = req.body.question_id   || result[0].question_id;
            var user_id       = req.body.user_id       || result[0].user_id;
            var answer        = req.body.answer        || result[0].answer;
			var answer_gain	  = req.body.answer_gain   || result[0].answer_gain;
            let sql2 = "UPDATE aits_multiple_choice_answer SET question_id = ?, user_id = ?, answer = ?, answer_gain = ? WHERE answer_id= ?";
            mysqlConnection.query(sql2, [question_id, user_id, answer, answer_gain, id], (err2, result2) => {
                if(err2) {
                    res.status(202).send({ error: err2 })
                }
                else{
                    res.status(200).send({success : "Table was succesfully updated."});
                }
            });
        }
        else{
            res.status(400).send({error : "No answer with this answer id exits."});
        }
      }
    })
});

  
// delete a particular AITS multiple choice answer from the AITS multiple choice answer table
router.delete('/delete-aits-multiple-choice-answer/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = "DELETE FROM aits_multiple_choice_answer WHERE answer_id=" + mysql.escape(id);
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
