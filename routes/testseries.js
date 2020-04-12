var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');

// create test series table
router.get('/create-test-series-table', (req, res) => {
    let sql = "CREATE TABLE test_series(test_series_id INT AUTO_INCREMENT PRIMARY KEY, test_series_name TEXT NOT NULL, test_series_description TEXT, test_series_status TINYINT, hide tinyint default 0, priority int default 0)"
    mysqlConnection.query(sql, (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
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
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
     })
   }
  });
 
 // Fetch the entire table of the test series table
router.get('/fetch-all-test-series', (req, res) => {
    let sql = "SELECT * FROM test_series"
    mysqlConnection.query(sql , (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
  });

// Fetch the entire table of the test series table where hide 0
router.get('/fetch-test-series', (req, res) => {
    let sql = "SELECT * FROM test_series WHERE hide = 0 ORDER BY priority"
    mysqlConnection.query(sql , (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
  });
 
 // Fetch a particular id from the test series table
router.get('/fetch-test-series/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM test_series WHERE test_series_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

// update a particular test series from the test series table
router.put('/update-test-series/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM test_series WHERE test_series_id = ?"
  mysqlConnection.query(sql, [id], function(err, result) {
    if(err) {
      res.status(500).send({ error: err })
    }
    else{
      if(result.length !=0){
          var test_series_name        = req.body.test_series_name        || result[0].test_series_name;
          var test_series_description = req.body.test_series_description || result[0].test_series_description;
          var test_series_status      = req.body.test_series_status      || result[0].test_series_status;
          var priority                = req.body.priority                || result[0].priority;
          var hide                    = req.body.hide                    || result[0].hide;

          let sql2 = "UPDATE test_series SET test_series_name = ?, test_series_description = ?, test_series_status = ?, priority =?, hide = ? WHERE test_series_id = ?"
          mysqlConnection.query(sql2, [test_series_name, test_series_description, test_series_status, priority, hide, id], (err2, result2) => {
              if(err2) {
                  res.status(202).send({ error: err2 })
              }
              else{
                  res.status(200).send({success : "Table was succesfully updated."});
              }
          });
      }
      else{
          res.status(400).send({error : "No test series id exits."});
      }
    }
  }); 
});

// delete a particular test series from the test series table
router.delete('/delete-test-series/:id', function(req, res, next) {
  var id = req.params.id;
  var sql3 = "DELETE FROM test_series WHERE test_series_id=" + mysql.escape(id);
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