var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');

//create AITS subject table
router.get('/create-aits-subject-table', (req, res) => {
    let sql = "CREATE TABLE aits_subject(subject_id INT AUTO_INCREMENT PRIMARY KEY, subject_name VARCHAR(256) NOT NULL, description TEXT, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, hide tinyint DEFAULT 0, priority tinyint DEFAULT 0)"
	mysqlConnection.query(sql, (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
 });

//create AITS topic table
router.get('/create-aits-topic-table', (req, res) => {
    let sql = "CREATE TABLE aits_topic(topic_id INT AUTO_INCREMENT PRIMARY KEY, subject_id INT NOT NULL, topic_name VARCHAR(256) NOT NULL, description TEXT, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, hide tinyint DEFAULT 0, priority tinyint DEFAULT 0, FOREIGN KEY (subject_id) REFERENCES aits_subject(subject_id))"
    mysqlConnection.query(sql, (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
 });

// insert AITS in the AITS subject table by post request
router.post('/insert-aits-subject', (req, res) => {
   var subject_name  = req.body.subject_name;
   var description  = req.body.description || null;
   var priority     = req.body.priority || 0;
   var hide         = req.body.hide || 0;
   if(!subject_name){
     console.log("Invalid insert, subject name cannot be empty");
     res.status(500).send({ error: 'Compulsary filed cannot be empty' })
   }
   else{
     var value    = [[subject_name, description, priority, hide]];
     let sql = "INSERT INTO aits_subject (subject_name, description, priority, hide) VALUES ?"
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

// insert AITS in the AITS topic table by post request
router.post('/insert-aits-topic', (req, res) => {
    var topic_name  = req.body.topic_name;
	var subject_id	= req.body.subject_id;
    var description  = req.body.description || null;
    var priority     = req.body.priority || 0;
    var hide         = req.body.hide || 0;
    if(!topic_name || !subject_id){
      console.log("Invalid insert, subject name and subject id cannot be empty");
      res.status(500).send({ error: 'Compulsary filed cannot be empty' })
    }
    else{
      var value    = [[topic_name, subject_id, description, priority, hide]];
      let sql = "INSERT INTO aits_topic (topic_name, subject_id, description, priority, hide) VALUES ?"
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

// Fetch the all data of the aits subject
router.get('/fetch-all-aits-subjects', (req, res) => {
    let sql = "SELECT * FROM aits_subject"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
        res.status(200).send(result);
      }
      })
});

// Fetch the data of the aits subject where hide 0
router.get('/fetch-aits-subjects', (req, res) => {
    let sql = "SELECT * FROM aits_subject WHERE hide = 0 ORDER BY priority"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
        res.status(200).send(result);
      }
      })
});

// Fetch a particular id from the AITS subject
router.get('/fetch-aits-subject/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM aits_subject WHERE subject_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
  mysqlConnection.query(sql, function(err, row, fields) {
    if(err) {
      res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(row);
      }
  })
});

// Fetch the all data of the aits topic
router.get('/fetch-all-aits-topics', (req, res) => {
    let sql = "SELECT * FROM aits_topic"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
        res.status(200).send(result);
      }
      })
});

// Fetch the data of the aits topic where hide 0
router.get('/fetch-aits-topics', (req, res) => {
    let sql = "SELECT * FROM aits_topic WHERE hide = 0 ORDER BY priority"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            res.status(202).send({ error: err })
        }
        else{
        res.status(200).send(result);
      }
      })
});

// Fetch a particular id from the AITS topic
router.get('/fetch-aits-topic/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM aits_topic WHERE topic_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
  mysqlConnection.query(sql, function(err, row, fields) {
    if(err) {
      res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(row);
      }
  })
});

// Fetch a particular id from the AITS topic by subject id
router.get('/fetch-aits-topic-by-subjectid/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM aits_topic WHERE subject_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
  mysqlConnection.query(sql, function(err, row, fields) {
    if(err) {
      res.status(202).send({ error: err })
    }
    else{
        res.status(200).send(row);
      }
  })
});
  
// update a particular AITS subject from the AITS subject table
router.put('/update-aits-subject/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM aits_subject WHERE subject_id = ?"
  mysqlConnection.query(sql, [id], function(err, result) {
    if(err) {
      res.status(500).send({ error: err })
    }
    else{
      if(result.length !=0){
          var subject_name = req.body.subject_name  || result[0].subject_name;
          var description  = req.body.description 	|| result[0].description;
          var priority     = req.body.priority      || result[0].priority;
          var hide         = req.body.hide          || result[0].hide;

          let sql2 = "UPDATE aits_subject SET subject_name = ?, description = ?, priority =?, hide = ? WHERE subject_id = ?"
          mysqlConnection.query(sql2, [subject_name, description, priority, hide, id], (err2, result2) => {
              if(err2) {
                  res.status(202).send({ error: err2 })
              }
              else{
                  res.status(200).send({success : "Table was succesfully updated."});
              }
          });
      }
      else{
          res.status(400).send({error : "No AITS subject id exits."});
      }
    }
  }); 
});

// update a particular AITS topic from the AITS topic table
router.put('/update-aits-topic/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM aits_topic WHERE topic_id = ?"
  mysqlConnection.query(sql, [id], function(err, result) {
    if(err) {
      res.status(500).send({ error: err })
    }
    else{
      if(result.length !=0){
          var topic_name  = req.body.topic_name  || result[0].topic_name;
		  var subject_id  = req.body.subject_id  || result[0].subject_id;
          var description = req.body.description || result[0].description;
          var priority    = req.body.priority 	 || result[0].priority;
          var hide        = req.body.hide        || result[0].hide;

          let sql2 = "UPDATE aits_topic SET topic_name = ?, subject_id = ?, description = ?, priority =?, hide = ? WHERE topic_id = ?"
          mysqlConnection.query(sql2, [topic_name, subject_id, description, priority, hide, id], (err2, result2) => {
              if(err2) {
                  res.status(202).send({ error: err2 })
              }
              else{
                  res.status(200).send({success : "Table was succesfully updated."});
              }
          });
      }
      else{
          res.status(400).send({error : "No AITS topic id exits."});
      }
    }
  }); 
});

// delete a particular AITS subject from the AITS subject table
router.delete('/delete-aits-subject/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = "DELETE FROM aits_topic WHERE subject_id=" + mysql.escape(id);
  mysqlConnection.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: err })
    }
    else{
      var sql2 = "DELETE FROM aits_subject WHERE subject_id =" + mysql.escape(id);
      mysqlConnection.query(sql2, function(err2, result2) {
        if(err2){
          res.status(202).send({ error: err2 })
        }
        else{
          res.status(200).send(result2);
        }
      })
    }
  });
});

// delete a particular AITS topic from the AITS topic table
router.delete('/delete-aits-topic/:id', function(req, res, next) {
  var id = req.params.id;
  var sql3 = "DELETE FROM aits_topic WHERE topic_id=" + mysql.escape(id);
  mysqlConnection.query(sql3, function(err, result) {
    if(err){
      res.status(202).send({ error: err })
    }
    else{
      res.status(200).send(result);
    }
  });
});

module.exports = router;
