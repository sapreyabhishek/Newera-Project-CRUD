 var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');
 
 // create exam table
router.get('/create-exam-table', (req, res) => {
    let sql = "CREATE TABLE exam(exam_id INT AUTO_INCREMENT PRIMARY KEY, test_series_id INT NOT NULL, exam_name TEXT NOT NULL, exam_deadline_start DATE, exam_deadline_end DATE, exam_description TEXT, exam_details_image_url VARCHAR(256), total_marks_of_exam FLOAT, subscription tinyint(1), hide tinyint(1) default 0, priority INT default 0, FOREIGN KEY (test_series_id) REFERENCES test_series(test_series_id))"
    mysqlConnection.query(sql, (err, result) => {
        if(err) {
            res.status(202).send({ error: err })
        }
        else{
            res.status(200).send(result);
        }
    })
});

 // insert exam details in the exam table by making a post request
 router.post('/insert-exam', (req, res) => {
  var exam_name  				= req.body.exam_name;
  var test_series_id			= req.body.test_series_id;
  var exam_deadline_start		= req.body.exam_deadline_start || null;
  var exam_deadline_end    		= req.body.exam_deadline_end || null;
  var exam_description       	= req.body.exam_description || null;
  var exam_details_image_url  	= req.body.exam_details_image_url || null;
  var total_marks_of_exam    	= req.body.total_marks_of_exam || null;
  var subscription				= req.body.subscription || null;
  var hide 						= req.body.hide || 0;
  var priority 					= req.body.priority || 0;

  if(!exam_name){
    console.log("Invalid insert, exam name cannot be empty");
    res.status(202).send({ error: 'Compulsary field cannot be empty' })
  }
  else if(!test_series_id){
    console.log("Invalid insert, test_series_id cannot be empty");
    res.status(202).send({ error: 'Invalid insert, test_series_id cannot be empty' });
  }
  else{
    var value    = [[test_series_id, exam_name, exam_deadline_start, exam_deadline_end, exam_description, exam_details_image_url, total_marks_of_exam, subscription, hide, priority]];
    let sql = "INSERT INTO exam (test_series_id, exam_name, exam_deadline_start, exam_deadline_end, exam_description, exam_details_image_url, total_marks_of_exam, subscription, hide, priority) VALUES ?"
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
 
 // Fetch the entire data of the exam table
router.get('/fetch-exam', (req, res) => {
  let sql = "SELECT * FROM exam"
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  })
});

// Fetch a particular id from the exam table using its exam id
router.get('/fetch-exam/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM exam WHERE exam_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  });
});

// Fetch a particular id from the exam table using its test_series_id
router.get('/fetch-exam-by-testseriesid/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM exam WHERE test_series_id="  + mysql.escape(id) ;
  mysqlConnection.query(sql , (err, result) => {
    if(err) {
        res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(result);
    }
  });
});

  // update a particular exam from the exam table
router.put('/update-exam/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM exam WHERE exam_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(202).send({ error: err })
      }
      else{
        if(result.length !=0){
			var test_series_id    	   = req.body.test_series_id   		 || result[0].test_series_id;
            var exam_name              = req.body.exam_name              || result[0].exam_name;
            var exam_deadline_start    = req.body.exam_deadline_start    || result[0].exam_deadline_start;
            var exam_deadline_end      = req.body.exam_deadline_end      || result[0].exam_deadline_end;
            var exam_description       = req.body.exam_description       || result[0].exam_description;
            var exam_details_image_url = req.body.exam_details_image_url || result[0].exam_details_image_url;
            var total_marks_of_exam    = req.body.total_marks_of_exam    || result[0].total_marks_of_exam;
			var subscription    	   = req.body.subscription   		 || result[0].subscription;
			var hide    			   = req.body.hide    				 || result[0].hide;
			var priority   			   = req.body.priority    			 || result[0].priority;
            let sql2 = "UPDATE exam SET test_series_id = ?, exam_name = ?, exam_deadline_start =?, exam_deadline_end =?, exam_description =?, exam_details_image_url =?, total_marks_of_exam = ?, subscription = ?, hide = ?, priority = ? WHERE exam_id= ?";
            mysqlConnection.query(sql2, [test_series_id, exam_name, exam_deadline_start, exam_deadline_end, exam_description, exam_details_image_url, total_marks_of_exam, subscription, hide, priority, id], (err2, result2) => {
                if(err2) {
                    res.status(202).send({ error: err2 })
                }
                else{
                    res.status(200).send({success : "Table was succesfully updated."});
                }
            });
        }
        else{
            res.status(400).send({error : "No exam question type with this id exits."});
        }
      }
    })
});

// delete a particular exam from the exam table
router.delete('/delete-exam/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = "DELETE FROM exam WHERE exam_id=" + mysql.escape(id);
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