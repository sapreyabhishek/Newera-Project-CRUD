var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');

// create Live Classes table
router.get('/create-live-classes-table', (req, res) => {
    let sql = "CREATE TABLE live_classes(live_lecture_id INT AUTO_INCREMENT PRIMARY KEY, subject_id INT NOT NULL, live_lecture_name TEXT, live_lecture_Topic TEXT,  live_lecture_description TEXT, live_lecture_url TEXT NOT NULL, live_lecture_APPLICATION_ID TEXT NOT NULL, live_lecture_API_KEY TEXT NOT NULL, live_video_link TEXT, starting_time TIME, ending_time TIME, subscription tinyint default 0, hide tinyint default 0, priority int default 0, hacker_name TEXT, hacker_image TEXT, FOREIGN KEY (subject_id) REFERENCES subject(subject_id))"
    mysqlConnection.query(sql, (err, result) => {
      if(err)if(err) {
        console.log(err);
        res.status(500).send({ error: 'Error in creating live classes table in sql' })
      }
      console.log(result);
      res.send(result);
    })
 });
 

 // create live_classes_material table
router.get('/create-live-classes-material-table', (req, res) => {
  let sql = "CREATE TABLE live_classes_material(live_lecture_material_id INT AUTO_INCREMENT PRIMARY KEY, live_lecture_id INT NOT NULL, live_lecture_material_name TEXT, live_lecture_material_description TEXT, live_lecture_material_link TEXT NOT NULL, hide tinyint default 0, priority int default 0, FOREIGN KEY (live_lecture_id) REFERENCES live_classes(live_lecture_id))"
  mysqlConnection.query(sql, (err, result) => {
    if(err)if(err) {
      console.log(err);
      res.status(500).send({ error: 'Error in creating live classes material table in sql' })
    }
    console.log(result);
    res.send(result);
  })
});

 // insert live-classes in the live-classes table by making a post request
 router.post('/insert-live-classes', (req, res) => {
   var live_lecture_url  = req.body.live_lecture_url;
   var live_lecture_APPLICATION_ID  = req.body.live_lecture_APPLICATION_ID;
   var live_lecture_API_KEY  = req.body.live_lecture_API_KEY;
   var subject_id = req.body.subject_id;
   var live_lecture_name = req.body.live_lecture_name || null;
   var live_lecture_Topic = req.body.live_lecture_Topic || null;
   var live_lecture_description = req.body.live_lecture_description || null;
   var live_video_link = req.body.live_video_link || null;
   var starting_time = req.body.starting_time || null;
   var ending_time = req.body.ending_time || null;
   var subscription = req.body.subscription || 0;
   var priority     = req.body.priority || 0;
   var hide         = req.body.hide || 0;
   var hacker_name = req.body.hacker_name || null;
   var hacker_image = req.body.hacker_image || null;

   if(!live_lecture_url || !live_lecture_APPLICATION_ID || !live_lecture_API_KEY || !subject_id){
     console.log("Invalid insert, live lecture url, live lecture APPLICATION_ID, subject_id or live lecture API KEY cannot be empty");
     res.status(500).send({ error: 'Compulsary filed cannot be empty' })
   }
   else{
     var value    = [[subject_id, live_lecture_name, live_lecture_Topic, live_lecture_description, live_lecture_url, live_lecture_APPLICATION_ID, live_lecture_API_KEY, live_video_link, starting_time, ending_time, subscription, hide, priority, hacker_name, hacker_image]];
     let sql = "INSERT INTO live_classes (subject_id, live_lecture_name, live_lecture_Topic, live_lecture_description, live_lecture_url, live_lecture_APPLICATION_ID, live_lecture_API_KEY, live_video_link, starting_time, ending_time, subscription, hide, priority, hacker_name, hacker_image) VALUES ?"
     mysqlConnection.query(sql, [value] , (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send({ error: 'Error in inserting data into live classes table' })
        }
       console.log(result);
       res.send(result);
     })
   }
  });

 // insert material in the live classes material table by making a post request
 router.post('/insert-live-classes-material', (req, res) => {
  var live_lecture_id     = req.body.live_lecture_id;
  var live_lecture_material_name   = req.body.live_lecture_material_name || null;
  var live_lecture_material_description     = req.body.live_lecture_material_description || null;
  var live_lecture_material_link     = req.body.live_lecture_material_link;
  var priority     = req.body.priority || 0;
  var hide         = req.body.hide || 0;

  if(!live_lecture_id || !live_lecture_material_link){
    console.log("Invalid insert, user id or update id cannot be empty");
    res.status(500).send({ error: 'Compulsary filed cannot be empty' })
  }
  else{
    var value    = [[live_lecture_id, live_lecture_material_name, live_lecture_material_description, live_lecture_material_link, priority, hide]];
    let sql = "INSERT INTO live_classes_material (live_lecture_id, live_lecture_material_name, live_lecture_material_description, live_lecture_material_link, priority, hide) VALUES ?"
    mysqlConnection.query(sql, [value] , (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in inserting data into live classes material table' })
       }
      console.log(result);
      res.send(result);
    })
  }
 });
 
 // Fetch the entire table of the live classes table
router.get('/fetch-all-live-classes', (req, res) => {
    let sql = "SELECT * FROM live_classes"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in fetching all data from live classes table' })
        }
        res.send(result);
      })
  });

// Fetch the entire table of the live-classes table where hide 0
router.get('/fetch-live-classes', (req, res) => {
    let sql = "SELECT * FROM live_classes WHERE hide = 0 ORDER BY priority"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in fetching data from live classes table' })
        }
        res.send(result);
      })
  });
 
 // Fetch a particular id from the live classes table
router.get('/fetch-live-classes/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM live_classes WHERE live_lecture_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch a particular live lecture' })
      }
      res.send(row)
    })
});

// Fetch a particular id from the live classes table by subject id
router.get('/fetch-live-classes-by-subjectid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM live_classes WHERE subject_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch a particular live lecture by subject id' })
      }
      res.send(row)
    })
});

// Fetch the entire table of the live classes material table
router.get('/fetch-all-live-classes-material', (req, res) => {
    let sql = "SELECT * FROM live_classes_material"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in fetching all data from live classes material table' })
        }
        res.send(result);
      })
  });

// Fetch the entire table of the live-classes table where hide 0
router.get('/fetch-live-classes-material', (req, res) => {
    let sql = "SELECT * FROM live_classes_material WHERE hide = 0 ORDER BY priority"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in fetching data from live classes material table' })
        }
        res.send(result);
      })
  });
 
 // Fetch a particular id from the live classes material table
router.get('/fetch-live-classes-material/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM live_classes_material WHERE live_lecture_material_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch a particular live lecture material' })
      }
      res.send(row)
    })
});

// Fetch a particular id from the live classes material table by live lecture id
router.get('/fetch-live-classes-material-by-livelectureid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM live_classes_material WHERE live_lecture_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch a particular live lecture material by live lecture id' })
      }
      res.send(row)
    })
});


// update a particular Live Classes from the Live Classes table
router.put('/update-live-classes/:id', function(req, res) {
   if(req.body.subject_id){
     let sql = "UPDATE live_classes SET subject_id=" + mysql.escape(req.body.subject_id) + " WHERE live_lecture_id=" + mysql.escape(req.params.id);
     mysqlConnection.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send({ error: 'Error in updating subject id into live classes table' })
        }
     })
   }
   if(req.body.live_lecture_name){
    let sql = "UPDATE live_classes SET live_lecture_name=" + mysql.escape(req.body.live_lecture_name) + " WHERE live_lecture_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating lecture name into live classes table' })
       }
    })
   }
   
   if(req.body.live_lecture_Topic){
    let sql = "UPDATE live_classes SET live_lecture_Topic=" + mysql.escape(req.body.live_lecture_Topic) + " WHERE live_lecture_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating lecture Topic into live classes table' })
       }
    })
   }
   
   if(req.body.live_lecture_description){
    let sql = "UPDATE live_classes SET live_lecture_description=" + mysql.escape(req.body.live_lecture_description) + " WHERE live_lecture_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating lecture description into live classes table' })
       }
    })
   }
   
   if(req.body.live_lecture_url){
    let sql = "UPDATE live_classes SET live_lecture_url=" + mysql.escape(req.body.live_lecture_url) + " WHERE live_lecture_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating lecture url into live classes table' })
       }
    })
   }
   
   if(req.body.live_lecture_APPLICATION_ID){
    let sql = "UPDATE live_classes SET live_lecture_APPLICATION_ID=" + mysql.escape(req.body.live_lecture_APPLICATION_ID) + " WHERE live_lecture_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating lecture APPLICATION ID into live classes table' })
       }
    })
   }
   
   if(req.body.live_lecture_API_KEY){
    let sql = "UPDATE live_classes SET live_lecture_API_KEY=" + mysql.escape(req.body.live_lecture_API_KEY) + " WHERE live_lecture_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating lecture API KEY into live classes table' })
       }
    })
   }
   
   if(req.body.live_video_link){
    let sql = "UPDATE live_classes SET live_video_link=" + mysql.escape(req.body.live_video_link) + " WHERE live_lecture_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating live video link  into live classes table' })
       }
    })
   }
   
   if(req.body.starting_time){
    let sql = "UPDATE live_classes SET starting_time=" + mysql.escape(req.body.starting_time) + " WHERE live_lecture_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating starting time into live classes table' })
       }
    })
   }
   
   if(req.body.ending_time){
    let sql = "UPDATE live_classes SET ending_time=" + mysql.escape(req.body.ending_time) + " WHERE live_lecture_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating ending time into live classes table' })
       }
    })
   }
   
   if(req.body.subscription){
    let sql = "UPDATE live_classes SET subscription=" + mysql.escape(req.body.subscription) + " WHERE live_lecture_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating subscription into live classes table' })
       }
    })
   }

   if(req.body.priority){
    let sql = "UPDATE live_classes SET priority=" + mysql.escape(req.body.priority) + " WHERE live_lecture_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating priority into live classes table' })
       }
    })
   }

   if(req.body.hide){
    let sql = "UPDATE live_classes SET hide=" + mysql.escape(req.body.hide) + " WHERE live_lecture_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating hide into live classes table' })
       }
    })
   }
   
   if(req.body.hacker_name){
    let sql = "UPDATE live_classes SET hacker_name=" + mysql.escape(req.body.hacker_name) + " WHERE live_lecture_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating hacker name into live classes table' })
       }
    })
   }
   
   if(req.body.hacker_image){
    let sql = "UPDATE live_classes SET hacker_image=" + mysql.escape(req.body.hacker_image) + " WHERE live_lecture_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating hacker image into live classes table' })
       }
    })
   }
   
   res.send({success: 'Updating the live classes table is successful'});
  });

// update a particular material from the live classes material table
router.put('/update-live-classes-material/:id', function(req, res) {
  
  if(req.body.live_lecture_id){
    let sql = "UPDATE live_classes_material SET live_lecture_id=" + mysql.escape(req.body.live_lecture_id) + " WHERE live_lecture_material_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating live lecture id into live classes material table' })
       }
    })
   }
   
   if(req.body.live_lecture_material_name){
    let sql = "UPDATE live_classes_material SET live_lecture_material_name=" + mysql.escape(req.body.live_lecture_material_name) + " WHERE live_lecture_material_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating material name into live classes material table' })
       }
    })
   }
   
   if(req.body.live_lecture_material_description){
    let sql = "UPDATE live_classes_material SET live_lecture_material_description=" + mysql.escape(req.body.live_lecture_material_description) + " WHERE live_lecture_material_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating material description into live classes material table' })
       }
    })
   }
   
   if(req.body.live_lecture_material_link){
    let sql = "UPDATE live_classes_material SET live_lecture_material_link=" + mysql.escape(req.body.live_lecture_material_link) + " WHERE live_lecture_material_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating material link into live classes material table' })
       }
    })
   }
  
  if(req.body.priority){
    let sql = "UPDATE live_classes_material SET priority=" + mysql.escape(req.body.priority) + " WHERE live_lecture_material_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating priority into live classes material table' })
       }
    })
   }

   if(req.body.hide){
    let sql = "UPDATE live_classes_material SET hide=" + mysql.escape(req.body.hide) + " WHERE live_lecture_material_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating hide into live classes material table' })
       }
    })
   }
  
  res.send({success: 'Updating the live classes material table is successful'});
 });

// delete a particular Live Classes from the Live Classes table
router.delete('/delete-live-classes/:id', function(req, res, next) {
  var id = req.params.id;
  var sql1 = "DELETE FROM live_classes_material WHERE live_lecture_id=" + mysql.escape(id);
  mysqlConnection.query(sql1, function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Error in deleting all live classes material from a particular live lecture id from live lecture table' })
    }
            else{
              var sql3 = "DELETE FROM live_classes WHERE live_lecture_id =" + mysql.escape(id);
              mysqlConnection.query(sql3, function(err4, result) {
                if(err4)  {
                  console.log(err);
                  res.status(500).send({ error: 'Error in deleting a lecture from live classes table' })
                }
                res.send({'status': 'success'})
              })
            }
          });
        });

// delete a particular class material from the live classes material table
router.delete('/delete-live-classes-material/:id', function(req, res, next) {
  var id = req.params.id;
  var sql3 = "DELETE FROM live_classes_material WHERE live_lecture_material_id=" + mysql.escape(id);
  mysqlConnection.query(sql3, function(err, result) {
    if(err)  {
      console.log(err);
      res.status(500).send({ error: 'Error in deleting a class material from live classes material table' })
    }
    else{
      res.send({'status': 'success'});
    }
  });
});

  
module.exports = router;