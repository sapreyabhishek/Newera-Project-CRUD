var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');

// create test series table
router.get('/create-test-series-table', (req, res) => {
    let sql = "CREATE TABLE test_series(test_series_id INT AUTO_INCREMENT PRIMARY KEY, test_series_name TEXT NOT NULL, test_series_description TEXT, test_series_status TINYINT, hide tinyint default 0, priority int default 0)"
    mysqlConnection.query(sql, (err, result) => {
      if(err)if(err) {
        console.log(err);
        res.status(500).send({ error: 'Error in creating test series table in sql' })
      }
      console.log(result);
      res.send(result);
    })
 });

 // insert test-series in the test series table by making a post request
 router.post('/insert-test-series', (req, res) => {
   var test_series_name  = req.body.test_series_name;
   var test_series_description = req.body.test_series_description || null;
   var test_series_status = req.body.test_series_status || null;
   var hide         = req.body.hide || 0;
   var priority     = req.body.priority || 0;

   if(!test_series_name){
     console.log("Invalid insert, test series name cannot be empty");
     res.status(500).send({ error: 'Compulsary filed cannot be empty' })
   }
   else{
     var value    = [[test_series_name, test_series_description, test_series_status, hide, priority]];
     let sql = "INSERT INTO test_series (test_series_name, test_series_description, test_series_status, hide, priority) VALUES ?"
     mysqlConnection.query(sql, [value] , (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send({ error: 'Error in inserting data into test series table' })
        }
       console.log(result);
       res.send(result);
     })
   }
  });
 
 // Fetch the entire table of the test series table
router.get('/fetch-all-test-series', (req, res) => {
    let sql = "SELECT * FROM test_series"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in fetching all data from test series table' })
        }
        res.send(result);
      })
  });

// Fetch the entire table of the test series table where hide 0
router.get('/fetch-test-series', (req, res) => {
    let sql = "SELECT * FROM test_series WHERE hide = 0 ORDER BY priority"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in fetching data from test series table where hide 0' })
        }
        res.send(result);
      })
  });
 
 // Fetch a particular id from the test series table
router.get('/fetch-test-series/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM test_series WHERE test_series_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch a particular test series' })
      }
      res.send(row)
    })
});

// update a particular test series from the test series table
router.put('/update-test-series/:id', function(req, res) {
   if(req.body.test_series_name){
     let sql = "UPDATE test_series SET test_series_name=" + mysql.escape(req.body.test_series_name) + " WHERE test_series_id=" + mysql.escape(req.params.id);
     mysqlConnection.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send({ error: 'Error in updating test series name into test series table' })
        }
     })
   }
   if(req.body.test_series_description){
    let sql = "UPDATE test_series SET test_series_description=" + mysql.escape(req.body.test_series_description) + " WHERE test_series_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating test series description into test series table' })
       }
    })
   }
   
   if(req.body.test_series_status){
    let sql = "UPDATE test_series SET test_series_status=" + mysql.escape(req.body.test_series_status) + " WHERE test_series_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating test series status into test series table' })
       }
    })
   }

   if(req.body.priority){
    let sql = "UPDATE test_series SET priority=" + mysql.escape(req.body.priority) + " WHERE test_series_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating priority into test series table' })
       }
    })
   }

   if(req.body.hide){
    let sql = "UPDATE test_series SET hide=" + mysql.escape(req.body.hide) + " WHERE test_series_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating hide into test series table' })
       }
    })
   }
   
   res.send({success: 'Updating the test series table is successful'});
  });

// delete a particular test series from the test series table
router.delete('/delete-test-series/:id', function(req, res, next) {
  var id = req.params.id;
  var sql3 = "DELETE FROM test_series WHERE test_series_id=" + mysql.escape(id);
  mysqlConnection.query(sql3, function(err, result) {
    if(err)  {
      console.log(err);
      res.status(500).send({ error: 'Error in deleting a test-series from live test series' })
    }
    else{
      res.send({'status': 'success'});
    }
  });
});

module.exports = router;