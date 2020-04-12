var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');

// create update table
router.get('/create-update-table', (req, res) => {
    let sql = "CREATE TABLE _update(update_id INT AUTO_INCREMENT PRIMARY KEY, update_topic TEXT, update_description TEXT, update_video_link TEXT NOT NULL, update_image_link TEXT NOT NULL, hide tinyint default 0, priority int default 0)"
    mysqlConnection.query(sql, (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
 });
 

 // create Update response table
router.get('/create-update-response-table', (req, res) => {
  let sql = "CREATE TABLE update_response(update_response_id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(128) NOT NULL, update_id INT NOT NULL, message text, FOREIGN KEY (user_id) REFERENCES user(user_id), FOREIGN KEY (update_id) REFERENCES _update(update_id))"
  mysqlConnection.query(sql, (err, result) => {
    if(err){
      res.status(202).send({ error: err })
    }
    else{
      res.status(200).send(result);
    }
  })
});

 // insert update in the update table by making a post request
 router.post('/insert-update-table', (req, res) => {
   var update_video_link  = req.body.update_video_link;
   var update_image_link  = req.body.update_image_link;
   var update_topic  = req.body.update_topic || null;
   var update_description = req.body.update_description || null;
   var priority     = req.body.priority || 0;
   var hide         = req.body.hide || 0;

   if(!update_video_link || !update_image_link){
     console.log("Invalid insert, image link or video link cannot be empty");
     res.status(500).send({ error: 'Compulsary filed cannot be empty' })
   }
   else{
     var value    = [[update_topic, update_description, update_video_link, update_image_link, priority, hide]];
     let sql = "INSERT INTO _update (update_topic, update_description, update_video_link, update_image_link, hide, priority) VALUES ?"
     mysqlConnection.query(sql, [value] , (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
     })
   }
  });

 // insert Update response in the Update response table by making a post request
 router.post('/insert-update-response', (req, res) => {
  var user_id     = req.body.user_id;
  var update_id   = req.body.update_id;
  var message     = req.body.message || null;

  if(!update_id || !user_id){
    console.log("Invalid insert, user id or update id cannot be empty");
    res.status(500).send({ error: 'Compulsary filed cannot be empty' })
  }
  else{
    var value    = [[user_id, update_id, message]];
    let sql = "INSERT INTO update_response (user_id, update_id, message) VALUES ?"
    mysqlConnection.query(sql, [value] , (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
  }
 });
 
 // Fetch the entire table of the update table
router.get('/fetch-all-update-table', (req, res) => {
    let sql = "SELECT * FROM _update"
    mysqlConnection.query(sql , (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
  });
});

// Fetch the entire table of the update table where hide 0
router.get('/fetch-update-table', (req, res) => {
    let sql = "SELECT * FROM _update WHERE hide = 0 ORDER BY priority"
    mysqlConnection.query(sql , (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    });
  });
 
 // Fetch a particular id from the update table
router.get('/fetch-update-table/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM _update WHERE update_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

// Fetch the entire table of the update response
router.get('/fetch-update-response', (req, res) => {
  let sql = "SELECT * FROM update_response"
  mysqlConnection.query(sql , (err, result) => {
    if(err){
      res.status(202).send({ error: err })
    }
    else{
      res.status(200).send(result);
    }
  })
});

 // Fetch a particular id from the update response table
router.get('/fetch-update-response/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM update_response WHERE update_response_id="  + mysql.escape(id) ;
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

 // Fetch a particular id from the update response table by user id 
router.get('/fetch-update-response-by-userid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM update_response WHERE user_id="  + mysql.escape(id) ;
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

 // Fetch a particular id from the update response table by update id
router.get('/fetch-update-response-by-updateid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM update_response WHERE update_id="  + mysql.escape(id) ;
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

// update a particular update from the update table
router.put('/update-update-table/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM _update WHERE update_id = ?"
  mysqlConnection.query(sql, [id], function(err, result) {
    if(err) {
      res.status(500).send({ error: err })
    }
    else{
      if(result.length !=0){
          var update_topic       = req.body.update_topic       || result[0].update_topic;
          var update_description = req.body.update_description || result[0].update_description;
          var update_video_link  = req.body.update_video_link  || result[0].update_video_link;
          var priority           = req.body.priority           || result[0].priority;
          var hide               = req.body.hide               || result[0].hide;
          var update_image_link  = req.body.update_image_link  || result[0].update_image_link;

          let sql2 = "UPDATE _update SET update_topic = ?, update_description = ?, update_video_link = ?,update_image_link = ?, priority =?, hide = ? WHERE update_id = ?"
          mysqlConnection.query(sql2, [update_topic, update_description, update_video_link, update_image_link, priority, hide, id], (err2, result2) => {
              if(err2) {
                  res.status(202).send({ error: err2 })
              }
              else{
                  res.status(200).send({success : "Table was succesfully updated."});
              }
          });
      }
      else{
          res.status(400).send({error : "No update id exits."});
      }
    }
  }); 
});

// update a particular response from the update-response table
router.put('/update-update-response/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM update_response WHERE update_response_id = ?"
  mysqlConnection.query(sql, [id], function(err, result) {
    if(err) {
      res.status(500).send({ error: err })
    }
    else{
      if(result.length !=0){
          var user_id   = req.body.user_id   || result[0].user_id;
          var update_id = req.body.update_id || result[0].update_id;
          var message   = req.body.message   || result[0].message;

          let sql2 = "UPDATE update_response SET user_id = ?, update_id = ?, message = ? WHERE update_response_id = ?"
          mysqlConnection.query(sql2, [user_id, update_id, message, id], (err2, result2) => {
              if(err2) {
                  res.status(202).send({ error: err2 })
              }
              else{
                  res.status(200).send({success : "Table was succesfully updated."});
              }
          });
      }
      else{
          res.status(400).send({error : "No update response id exits."});
      }
    }
  }); 
});

// delete a particular update from the update table
router.delete('/delete-update-table/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = "DELETE FROM update_response WHERE update_id=" + mysql.escape(id);
  mysqlConnection.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: err })
    }
    else{
      var sql2 = "DELETE FROM _update WHERE update_id =" + mysql.escape(id);
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

// delete a particular response from the update-response table
router.delete('/delete-update-response/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = "DELETE FROM update_response WHERE update_response_id=" + mysql.escape(id);
  mysqlConnection.query(sql, function(err, result) {
    if(err){
      res.status(202).send({ error: err })
    }
    else{
      res.status(200).send(result);
    }
  });
});

  
module.exports = router;
