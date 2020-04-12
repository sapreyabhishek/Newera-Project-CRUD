var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');

// create update table
router.get('/create-update-table', (req, res) => {
    let sql = "CREATE TABLE _update(update_id INT AUTO_INCREMENT PRIMARY KEY, update_topic TEXT, update_description TEXT, update_video_link TEXT NOT NULL, update_image_link TEXT NOT NULL, hide tinyint default 0, priority int default 0)"
    mysqlConnection.query(sql, (err, result) => {
      if(err)if(err) {
        console.log(err);
        res.status(500).send({ error: 'Error in creating update table in sql' })
      }
      console.log(result);
      res.send(result);
    })
 });
 

 // create Update response table
router.get('/create-update-response-table', (req, res) => {
  let sql = "CREATE TABLE update_response(update_response_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, update_id INT NOT NULL, message text, FOREIGN KEY (user_id) REFERENCES user(user_id), FOREIGN KEY (update_id) REFERENCES _update(update_id))"
  mysqlConnection.query(sql, (err, result) => {
    if(err)if(err) {
      console.log(err);
      res.status(500).send({ error: 'Error in creating update response table in sql' })
    }
    console.log(result);
    res.send(result);
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
        if(err) {
            console.log(err);
            res.status(500).send({ error: 'Error in inserting data into update table' })
        }
       console.log(result);
       res.send(result);
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
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in inserting data into update response table' })
       }
      console.log(result);
      res.send(result);
    })
  }
 });
 
 // Fetch the entire table of the update table
router.get('/fetch-all-update-table', (req, res) => {
    let sql = "SELECT * FROM _update"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in fetching all data from update table' })
        }
        res.send(result);
      })
  });

// Fetch the entire table of the update table where hide 0
router.get('/fetch-update-table', (req, res) => {
    let sql = "SELECT * FROM _update WHERE hide = 0 ORDER BY priority"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in fetching data from update table' })
        }
        res.send(result);
      })
  });
 
 // Fetch a particular id from the update table
router.get('/fetch-update-table/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM _update WHERE update_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch a particular update id value' })
      }
      res.send(row)
    })
});

// Fetch the entire table of the update response
router.get('/fetch-update-response', (req, res) => {
  let sql = "SELECT * FROM update_response"
  mysqlConnection.query(sql , (err, result) => {
      if(err){
          console.log(err);
          res.status(500).send({ error: 'Error in fetching data from update-response table' })
      }
      res.send(result);
    })
});

 // Fetch a particular id from the update response table
router.get('/fetch-update-response/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM update_response WHERE update_response_id="  + mysql.escape(id) ;
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch a particular update response' })
      }
      res.send(row)
    })
});

 // Fetch a particular id from the update response table by user id 
router.get('/fetch-update-response-by-userid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM update_response WHERE user_id="  + mysql.escape(id) ;
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch a particular update response by user id' })
      }
      res.send(row)
    })
});

 // Fetch a particular id from the update response table by update id
router.get('/fetch-update-response-by-updateid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM update_response WHERE update_id="  + mysql.escape(id) ;
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch a particular update response by update id' })
      }
      res.send(row)
    })
});

// update a particular update from the update table
router.put('/update-update-table/:id', function(req, res) {
   if(req.body.update_topic){
     let sql = "UPDATE _update SET update_topic=" + mysql.escape(req.body.update_topic) + " WHERE update_id=" + mysql.escape(req.params.id);
     mysqlConnection.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send({ error: 'Error in updating topic into update table' })
        }
     })
   }
   if(req.body.update_description){
    let sql = "UPDATE _update SET update_description=" + mysql.escape(req.body.update_description) + " WHERE update_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating description into update table' })
       }
    })
   }
   
   if(req.body.update_video_link){
    let sql = "UPDATE _update SET update_video_link=" + mysql.escape(req.body.update_video_link) + " WHERE update_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating video link into update table' })
       }
    })
   }

   if(req.body.update_image_link){
    let sql = "UPDATE _update SET update_image_link=" + mysql.escape(req.body.update_image_link) + " WHERE update_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating image link into update table' })
       }
    })
   }

   if(req.body.priority){
    let sql = "UPDATE _update SET priority=" + mysql.escape(req.body.priority) + " WHERE update_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating priority into update table' })
       }
    })
   }

   if(req.body.hide){
    let sql = "UPDATE _update SET hide=" + mysql.escape(req.body.hide) + " WHERE update_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating hide into update table' })
       }
    })
   }
   res.send({success: 'Updating the update table is successful'});
  });

// update a particular response from the update-response table
router.put('/update-update-response/:id', function(req, res) {
  if(req.body.user_id){
    let sql = "UPDATE update_response SET user_id=" + mysql.escape(req.body.user_id) + " WHERE update_response_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating user id into update response table' })
       }
    })
  }

  if(req.body.update_id){
    let sql = "UPDATE update_response SET update_id=" + mysql.escape(req.body.update_id) + " WHERE update_response_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating update id into update response table' })
       }
    })
  }
  
  if(req.body.message){
    let sql = "UPDATE update_response SET message=" + mysql.escape(req.body.message) + " WHERE update_response_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating message into update response table' })
       }
    })
  }
  
  res.send({success: 'Updating the update response table is successful'});
 });

// delete a particular update from the update table
router.delete('/delete-update-table/:id', function(req, res, next) {
  var id = req.params.id;
  var sql1 = "DELETE FROM update_response WHERE update_id=" + mysql.escape(id);
  mysqlConnection.query(sql1, function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Error in deleting all update response from a particular update id' })
    }
            else{
              var sql3 = "DELETE FROM _update WHERE update_id =" + mysql.escape(id);
              mysqlConnection.query(sql3, function(err4, result) {
                if(err4)  {
                  console.log(err);
                  res.status(500).send({ error: 'Error in deleting a update from update table' })
                }
                res.send({'status': 'success'})
              })
            }
          });
        });

// delete a particular response from the update-response table
router.delete('/delete-update-response/:id', function(req, res, next) {
  var id = req.params.id;
  var sql3 = "DELETE FROM update_response WHERE update_response_id=" + mysql.escape(id);
  mysqlConnection.query(sql3, function(err, result) {
    if(err)  {
      console.log(err);
      res.status(500).send({ error: 'Error in deleting a response from update response table' })
    }
    else{
      res.send({'status': 'success'});
    }
  });
});

  
module.exports = router;
