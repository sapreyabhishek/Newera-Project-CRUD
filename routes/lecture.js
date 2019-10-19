var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection')


//Video Lecture Table CRUD

// create lecture table
router.get('/create-lecture-table', (req, res) => {
    let sql = "CREATE TABLE lecture(lecture_id INT AUTO_INCREMENT PRIMARY KEY, subject_id INT NOT NULL, topic_id INT NOT NULL, section TEXT, video_link TEXT, study_material TEXT, description TEXT, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (subject_id) REFERENCES subject(subject_id), FOREIGN KEY (topic_id) REFERENCES topic(topic_id))"
    mysqlConnection.query(sql, (err, result) => {
    if(err){
        console.log(err);
        res.status(500).send({ error: 'Error in creating lecture table' })
    }
    res.send(result);
    })
  });
  
  // insert lecture in the lecture table by making a post request
  router.post('/insert-lecture', (req, res) => {
    var subject_id  = req.body.subject_id ;
    var topic_id  = req.body.topic_id ;
    var section  = req.body.section || null;
    var video_link  = req.body.video_link || null;
    var study_material  = req.body.study_material;
    var description    = req.body.description || null;
    if(!subject_id || !topic_id){
      console.log("Invalid insert, subject id or topic id field cannot be empty");
      res.status(500).send({ error: 'Compulsary filed cannot be empty' })
    }
    else{
      var value    = [[subject_id, topic_id, section, video_link, study_material, description]];
      let sql = "INSERT INTO lecture (subject_id, topic_id, section, video_link, study_material, description) VALUES ?"
      mysqlConnection.query(sql, [value] , (err, result) => {
      if(err){
        console.log(err);
        res.status(500).send({ error: 'Error in inserting lecture into lecture table' })
      }
      res.send(result);
      })
    }
   });
  
  // Fetch the entire table of the lectures
  router.get('/fetch-lectures', (req, res) => {
    let sql = "SELECT * FROM lecture"
    mysqlConnection.query(sql , (err, result) => {
      if(err){
        console.log(err);
        res.status(500).send({ error: 'Error in fectching  all lectures' })
      }
      res.send(result);
      })
  })
  
  // Fetch a particular lecture from the lecture table
  router.get('/fetch-lecture/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM lecture WHERE lecture_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err){
        console.log(err);
        res.status(500).send({ error: 'Error in fectching a particular lecture' })
      }
      res.send(row);
    })
  });
  
  // Fetch all lectures from the lecture table with a particular topic
  router.get('/fetch-lecture-topic/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM lecture WHERE topic_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err){
        console.log(err);
        res.status(500).send({ error: 'Error in fectching all lecture from a topic' })
      }
      res.send(row);
    })
  });
  
  // Fetch all lectures from the lecture table with a particular subject
  router.get('/fetch-lecture-subject/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM lecture WHERE subject_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err){
        console.log(err);
        res.status(500).send({ error: 'Error in fectching all lecture from a topic' })
      }
      res.send(row);
    })
  });
  
  router.put('/update-lecture/:id', function(req, res) {
    if(req.body.subject_id){
      let sql = "UPDATE lecture SET subject_id="+mysql.escape(req.body.subject_id)+" WHERE lecture_id=" + mysql.escape(req.params.id);
      mysqlConnection.query(sql, (err, result) => {
          if(err){
              console.log(err);
              res.status(500).send({ error: 'Error in updating a lecture in a lecture table' })
          }
      })
    }
  
    if(req.body.topic_id){
      let sql = "UPDATE lecture SET topic_id="+mysql.escape(req.body.topic_id)+" WHERE lecture_id=" + mysql.escape(req.params.id);
      mysqlConnection.query(sql, (err, result) => {
          if(err){
              console.log(err);
              res.status(500).send({ error: 'Error in updating a lecture in a lecture table' })
          }
      })
    }
  
    if(req.body.section){
      let sql = "UPDATE lecture SET section="+mysql.escape(req.body.section)+" WHERE lecture_id=" + mysql.escape(req.params.id);
      mysqlConnection.query(sql, (err, result) => {
          if(err){
              console.log(err);
              res.status(500).send({ error: 'Error in updating section of a lecture in a lecture table' })
          }
      })
    }
  
    if(req.body.video_link){
      let sql = "UPDATE lecture SET video_link="+mysql.escape(req.body.video_link)+" WHERE lecture_id=" + mysql.escape(req.params.id);
      mysqlConnection.query(sql, (err, result) => {
          if(err){
              console.log(err);
              res.status(500).send({ error: 'Error in updating video link of a lecture in a lecture table' })
          }
      })
    }
  
    if(req.body.description){
      let sql = "UPDATE lecture SET description="+mysql.escape(req.body.description)+" WHERE lecture_id=" + mysql.escape(req.params.id);
      mysqlConnection.query(sql, (err, result) => {
          if(err){
              console.log(err);
              res.status(500).send({ error: 'Error in updating description of a lecture in a lecture table' })
          }
      })
    }
  
    if(req.body.study_material){
      let sql = "UPDATE lecture SET study_material="+mysql.escape(req.body.study_material)+" WHERE lecture_id=" + mysql.escape(req.params.id);
      mysqlConnection.query(sql, (err, result) => {
          if(err){
              console.log(err);
              res.status(500).send({ error: 'Error in updating study material of a lecture in a lecture table' })
          }
      })
    }

    res.send({'status': 'success'})
  });

  // delete a particular lecture from the lecture table
router.delete('/delete-lecture/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = "DELETE FROM lecture WHERE lecture_id=" + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        console.log(err);
        res.status(500).send({ error: 'Error in deleting a  question' })
      }
      res.send(result);
    })
  });
  
  // delete all lectures from the lecture table of a particular topic
  router.delete('/delete-lecture-topic/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = "DELETE FROM lecture WHERE topic_id=" + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        console.log(err);
        res.status(500).send({ error: 'Error in deleting a  lecture using topic id' })
      }
      res.send(result);
    })
  });
  
  // delete all lectures from the lecture table of a particular subject
  router.delete('/delete-lectures-subject/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = "DELETE FROM lecture WHERE subject_id=" + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        console.log(err);
        res.status(500).send({ error: 'Error in deleting a  lecture using subject id' })
      }
      res.send(result);
    })
  });
  
  
  module.exports = router;