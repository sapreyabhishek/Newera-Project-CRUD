var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');

// create course table
router.get('/create-course-table', (req, res) => {
    let sql = "CREATE TABLE course(course_id INT AUTO_INCREMENT PRIMARY KEY, course_name VARCHAR(256) NOT NULL, description TEXT, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)"
    mysqlConnection.query(sql, (err, result) => {
      if(err)if(err) {
        console.log(err);
        res.status(500).send({ error: 'Error in creating table in sql' })
      }
      console.log(result);
      res.send(result);
    })
 });

 // create subcourse table
router.get('/create-subcourse-table', (req, res) => {
  let sql = "CREATE TABLE subcourse(subcourse_id INT AUTO_INCREMENT PRIMARY KEY, course_id INT, subcourse_name TEXT NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (course_id) REFERENCES course(course_id))"
  mysqlConnection.query(sql, (err, result) => {
    if(err)if(err) {
      console.log(err);
      res.status(500).send({ error: 'Error in creating subcourse table in sql' })
    }
    console.log(result);
    res.send(result);
  })
});

router.get('/create-subject-table', (req, res) => {
    let sql = "CREATE TABLE subject(subject_id INT AUTO_INCREMENT PRIMARY KEY, course_id INT NOT NULL, subject_name VARCHAR(256) NOT NULL, description TEXT, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (course_id) REFERENCES course(course_id))"
    mysqlConnection.query(sql, (err, result) => {
      if(err)if(err) {
        console.log(err);
        res.status(500).send({ error: 'Error in creating table in sql' })
      }
      console.log(result);
      res.send(result);
    })
});

router.get('/create-topic-table', (req, res) => {
    let sql = "CREATE TABLE topic(topic_id INT AUTO_INCREMENT PRIMARY KEY, topic_name VARCHAR(256) NOT NULL, description TEXT, course_id INT NOT NULL, subject_id INT NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (course_id) REFERENCES course(course_id),  FOREIGN KEY (subject_id) REFERENCES subject(subject_id))"
    mysqlConnection.query(sql, (err, result) => {
      if(err) {
        console.log(err);
        res.status(500).send({ error: 'Error in creating table in sql' })
      }
      console.log(result);
      res.send(result);
    })
});

//Alter Tables
// alter topic table hide and priority
router.get('/alter-topic-table', (req, res) => {
  let sql = "ALTER TABLE topic ADD hide BOOLEAN NOT NULL DEFAULT FALSE, ADD priority INT AFTER subject_id"
  mysqlConnection.query(sql, (err, result) => {
    if(err){
        console.log(err);
        res.status(500).send({ error: 'Error in altering topic table' })
    }
    res.send(result);
    })
});

// alter subcourse table hide and priority
router.get('/alter-subcourse-table', (req, res) => {
  let sql = "ALTER TABLE subcourse ADD hide BOOLEAN NOT NULL DEFAULT FALSE, ADD priority INT AFTER subcourse_name"
  mysqlConnection.query(sql, (err, result) => {
    if(err){
        console.log(err);
        res.status(500).send({ error: 'Error in altering subcourse table' })
    }
    res.send(result);
    })
});

// alter subject table hide and priority
router.get('/alter-subject-table', (req, res) => {
  let sql = "ALTER TABLE subject ADD hide BOOLEAN NOT NULL DEFAULT FALSE, ADD priority INT AFTER description"
  mysqlConnection.query(sql, (err, result) => {
    if(err){
        console.log(err);
        res.status(500).send({ error: 'Error in altering subject table' })
    }
    res.send(result);
    })
});



// alter course table hide and priority
router.get('/alter-course-table', (req, res) => {
  let sql = "ALTER TABLE course ADD hide BOOLEAN NOT NULL DEFAULT FALSE, ADD priority INT AFTER description"
  mysqlConnection.query(sql, (err, result) => {
    if(err){
        console.log(err);
        res.status(500).send({ error: 'Error in altering course table' })
    }
    res.send(result);
    })
});



 // insert course in the course table by making a post request
 router.post('/insert-course', (req, res) => {
   var course_name  = req.body.course_name;
   var description  = req.body.description || null;
   var priority     = req.body.priority || null;
   var hide         = req.body.hide || 0;

   if(!course_name){
     console.log("Invalid insert, course name cannot be empty");
     res.status(500).send({ error: 'Compulsary filed cannot be empty' })
   }
   else{
     var value    = [[course_name, description, priority, hide]];
     let sql = "INSERT INTO course (course_name, description, priority, hide) VALUES ?"
     mysqlConnection.query(sql, [value] , (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send({ error: 'Error in inserting data into table' })
        }
       console.log(result);
       res.send(result);
     })
   }
  });

   // insert course in the course table by making a post request
 router.post('/insert-subcourse', (req, res) => {
  var subcourse_name  = req.body.subcourse_name;
  var course_id  = req.body.course_id;
  var priority     = req.body.priority || null;
  var hide         = req.body.hide || 0;

  if(!course_id){
    console.log("Invalid insert, course_id cannot be empty");
    res.status(500).send({ error: 'Compulsary filed cannot be empty' })
  }
  else{
    var value    = [[course_id, subcourse_name, priority, hide]];
    let sql = "INSERT INTO subcourse (course_id, subcourse_name, priority, hide) VALUES ?"
    mysqlConnection.query(sql, [value] , (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in inserting data into table' })
       }
      console.log(result);
      res.send(result);
    })
  }
 });

// insert subject in the subject table by post request
router.post('/insert-subject', (req, res) => {
   var subject_name  = req.body.subject_name;
   var course_id = req.body.course_id;
   var description  = req.body.description || null;
   var priority     = req.body.priority || null;
   var hide         = req.body.hide || 0;
   if(!subject_name || !course_id){
     console.log("Invalid insert, subject name or course id cannot be empty");
     res.status(500).send({ error: 'Compulsary filed cannot be empty' })
   }
   else{
     var value    = [[subject_name, course_id, description, priority, hide]];
     let sql = "INSERT INTO subject (subject_name, course_id, description, priority, hide) VALUES ?"
     mysqlConnection.query(sql, [value] , (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send({ error: 'Error in inserting data into table' })
        }
       console.log(result);
       res.send(result);
     })
   }
  });

// insert subject in the subject table by post request
router.post('/insert-topic', (req, res) => {
    var topic_name  = req.body.topic_name;
    var course_id = req.body.course_id;
    var subject_id = req.body.subject_id;
    var description  = req.body.description || null;
    var priority     = req.body.priority || null;
    var hide         = req.body.hide || 0;
    if(!topic_name || !course_id || !subject_id){
      console.log("Invalid insert, subject name or course id or subject id cannot be empty");
      res.status(500).send({ error: 'Compulsary filed cannot be empty' })
    }
    else{
      var value    = [[topic_name, course_id, subject_id, description, priority, hide]];
      let sql = "INSERT INTO topic (topic_name, course_id, subject_id, description, priority, hide) VALUES ?"
      mysqlConnection.query(sql, [value] , (err, result) => {
         if(err) {
             console.log(err);
             res.status(500).send({ error: 'Error in inserting data into table' })
         }
        console.log(result);
        res.send(result);
      })
    }
});

// Fetch the entire table of the courses
router.get('/fetch-courses', (req, res) => {
    let sql = "SELECT * FROM course WHERE hide = 0 ORDER BY priority"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in fetching data from table' })
        }
        res.send(result);
      })
  });

// Fetch the entire table of the subcourses
router.get('/fetch-subcourses', (req, res) => {
  let sql = "SELECT * FROM subcourse WHERE hide = 0 ORDER BY priority"
  mysqlConnection.query(sql , (err, result) => {
      if(err){
          console.log(err);
          res.status(500).send({ error: 'Error in fetching data from table' })
      }
      res.send(result);
    })
});
router.get('/fetch-subject-by-subcourseid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM subject WHERE subcourse_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch a particular subject' })
      }
      res.send(row)
    })
});

// Fetch the entire table of the subject
router.get('/fetch-subjects', (req, res) => {
    let sql = "SELECT * FROM subject WHERE hide = 0 ORDER BY priority"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in fetching data from table' })
        }
        res.send(result);
      })
});

// Fetch the entire table of the topics
router.get('/fetch-topics', (req, res) => {
    let sql = "SELECT * FROM topic WHERE hide = 0 ORDER BY priority"
    mysqlConnection.query(sql , (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({ error: 'Error in fetching data from table' })
        }
        res.send(result);
    })
});


// Fetch a particular id from the courses
router.get('/fetch-course/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM course WHERE course_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch a particular course' })
      }
      res.send(row)
    })
});

// Fetch a particular id from the subcourses
router.get('/fetch-subcourse/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM subcourse WHERE course_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
  mysqlConnection.query(sql, function(err, row, fields) {
    if(err) {
      res.status(500).send({ error: 'Cannot fetch a particular subcourse' })
    }
    res.send(row)
  })
});

// Fetch a particular id from the subcourses
router.get('/fetch-subcourse-subcourseid/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM subcourse WHERE subcourse_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
  mysqlConnection.query(sql, function(err, row, fields) {
    if(err) {
      res.status(500).send({ error: 'Cannot fetch a particular subcourse' })
    }
    res.send(row)
  })
});

// Fetch a particular id from the subject table using course id
router.get('/fetch-subject-by-courseid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM subject WHERE course_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch a particular subject' })
      }
      res.send(row)
    })
});

// Fetch a particular id from the subject table using subject id
router.get('/fetch-subject-by-subjectid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM subject WHERE subject_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch a particular subject' })
      }
      res.send(row)
    })
});

// Fetch a particular id from the topic table using course id
router.get('/fetch-topic-by-courseid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM topic WHERE course_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch a particular topic' })
      }
      res.send(row)
    })
});

// Fetch a particular id from the topic table using subject id
router.get('/fetch-topic-by-subjectid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM topic WHERE subject_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch a particular topic' })
      }
      res.send(row)
    })
});

// Fetch a particular id from the topic table using topic id
router.get('/fetch-topic-by-topicid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM topic WHERE topic_id="  + mysql.escape(id) + " AND hide = 0 ORDER BY priority";
    mysqlConnection.query(sql, function(err, row, fields) {
      if(err) {
        res.status(500).send({ error: 'Cannot fetch a particular topic' })
      }
      res.send(row)
    })
});

// update a particular course from the course table
router.put('/update-course/:id', function(req, res) {
   if(req.body.course_name){
     let sql = "UPDATE course SET course_name=" + mysql.escape(req.body.course_name) + " WHERE course_id=" + mysql.escape(req.params.id);
     mysqlConnection.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send({ error: 'Error in updating course name into course table' })
        }
     })
   }
   if(req.body.description){
    let sql = "UPDATE course SET description=" + mysql.escape(req.body.description) + " WHERE course_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating description into course table' })
       }
    })
   }

   if(req.body.priority){
    let sql = "UPDATE course SET priority=" + mysql.escape(req.body.priority) + " WHERE course_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating priority into course table' })
       }
    })
   }

   if(req.body.hide){
    let sql = "UPDATE course SET hide=" + mysql.escape(req.body.hide) + " WHERE course_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating hide into course table' })
       }
    })
   }
   res.send({success: 'Updating the course table is successful'});
  });

// update a particular subcourse from the subcourse table
router.put('/update-subcourse/:id', function(req, res) {
  
  if(req.body.subcourse_name){
    let sql = "UPDATE subcourse SET subcourse_name=" + mysql.escape(req.body.subcourse_name) + " WHERE subcourse_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating course name into subcourse table' })
       }
    })
  }

  if(req.body.priority){
   let sql = "UPDATE subcourse SET priority=" + mysql.escape(req.body.priority) + " WHERE subcourse_id=" + mysql.escape(req.params.id);
   mysqlConnection.query(sql, (err, result) => {
      if(err) {
          console.log(err);
          res.status(500).send({ error: 'Error in updating priority into subcourse table' })
      }
   })
  }

  if(req.body.hide){
   let sql = "UPDATE subcourse SET hide=" + mysql.escape(req.body.hide) + " WHERE subcourse_id=" + mysql.escape(req.params.id);
   mysqlConnection.query(sql, (err, result) => {
      if(err) {
          console.log(err);
          res.status(500).send({ error: 'Error in updating hide into subcourse table' })
      }
   })
  }
  res.send({success: 'Updating the course table is successful'});
 });

  // update a particular subject from the subject table
router.put('/update-subject/:id', function(req, res) {
   if(req.body.subject_name){
    let sql = "UPDATE subject SET subject_name=" + mysql.escape(req.body.subject_name) + " WHERE subject_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating subject name into subject table' })
       }
    })
  }

  if(req.body.course_id){
    let sql = "UPDATE subject SET course_id=" + mysql.escape(req.body.course_id) + " WHERE subject_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating course id into subject table' })
       }
    })
  }

  if(req.body.description){
   let sql = "UPDATE subject SET description=" + mysql.escape(req.body.description) + " WHERE subject_id=" + mysql.escape(req.params.id);
   mysqlConnection.query(sql, (err, result) => {
      if(err) {
          console.log(err);
          res.status(500).send({ error: 'Error in updating description into subject table' })
      }
   })
  }

  if(req.body.priority){
    let sql = "UPDATE subject SET priority=" + mysql.escape(req.body.priority) + " WHERE subject_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating priority into subject table' })
       }
    })
   }

   if(req.body.hide){
    let sql = "UPDATE subject SET hide=" + mysql.escape(req.body.hide) + " WHERE subject_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
       if(err) {
           console.log(err);
           res.status(500).send({ error: 'Error in updating hide into subject table' })
       }
    })
   }

  res.send({success: 'Updating the subject table is successful'});
  });

// update a particular topic from the subject table
router.put('/update-topic/:id', function(req, res) {
  if(req.body.topic_name){
    let sql = "UPDATE topic SET topic_name=" + mysql.escape(req.body.topic_name) + " WHERE topic_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send({ error: 'Error in updating topic name into topic table' })
        }
    })
  }

  if(req.body.subject_id){
    let sql = "UPDATE topic SET subject_id=" + mysql.escape(req.body.subject_id) + " WHERE topic_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send({ error: 'Error in updating topic name into topic table' })
        }
    })
  }

  if(req.body.course_id){
    let sql = "UPDATE topic SET course_id=" + mysql.escape(req.body.course_id) + " WHERE topic_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send({ error: 'Error in updating course id into subject table' })
        }
    })
  }

  if(req.body.description){
    let sql = "UPDATE topic SET description=" + mysql.escape(req.body.description) + " WHERE topic_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
      if(err) {
          console.log(err);
          res.status(500).send({ error: 'Error in updating description into subject table' })
      }
    })
  }

  if(req.body.priority){
    let sql = "UPDATE topic SET priority=" + mysql.escape(req.body.priority) + " WHERE topic_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
      if(err) {
          console.log(err);
          res.status(500).send({ error: 'Error in updating priority into subject table' })
      }
    })
  }

  if(req.body.hide){
    let sql = "UPDATE topic SET hide=" + mysql.escape(req.body.hide) + " WHERE topic_id=" + mysql.escape(req.params.id);
    mysqlConnection.query(sql, (err, result) => {
      if(err) {
          console.log(err);
          res.status(500).send({ error: 'Error in updating hide into subject table' })
      }
    })
  }

  res.send({success: 'Updating the topic table is successful'});
  });

// delete a particular course from the course table
router.delete('/delete-course/:id', function(req, res, next) {
  var id = req.params.id;
  var sql1 = "DELETE FROM topic WHERE course_id=" + mysql.escape(id);
  mysqlConnection.query(sql1, function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Error in deleting all topics from a particular course' })
    }
    else{
      var sql2 = "DELETE FROM subject WHERE course_id=" + mysql.escape(id);
      mysqlConnection.query(sql2, function(err2, result) {
        if(err2) {
          res.status(500).send({ error: 'Error in deleting all subject from a particular course' })
        }
        else{
          var sql4 = "DELETE FROM subcourse WHERE course_id=" + mysql.escape(id);
          mysqlConnection.query(sql4, function(err3, result) {
            if(err3)  {
              res.status(500).send({ error: 'Error in deleting all subcourses of a particular course' })
            }
            else{
              var sql3 = "DELETE FROM course WHERE course_id=" + mysql.escape(id);
              mysqlConnection.query(sql3, function(err4, result) {
                if(err4)  {
                  console.log(err);
                  res.status(500).send({ error: 'Error in deleting a course from course table' })
                }
                res.send({'status': 'success'})
              })
            }
          });
        }
      });
    }
  }); 
});

// delete a particular subcourse from the subcourse table
router.delete('/delete-subcourse/:id', function(req, res, next) {
  var id = req.params.id;
  var sql3 = "DELETE FROM subcourse WHERE subcourse_id=" + mysql.escape(id);
  mysqlConnection.query(sql3, function(err, result) {
    if(err)  {
      console.log(err);
      res.status(500).send({ error: 'Error in deleting a subcourse from subcourse table' })
    }
    else{
      res.send({'status': 'success'});
    }
  });
});

// delete a particular subject from the subject table
router.delete('/delete-subject/:id', function(req, res, next) {
  var id = req.params.id;

  var sql1 = "DELETE FROM topic WHERE subject_id=" + mysql.escape(id);
  mysqlConnection.query(sql1, function(err, result) {
    if(err)  {
      console.log(err);
      res.status(500).send({ error: 'Error in deleting all topics from topic table under current subject' })
    }
    else{
      var sql2 = "DELETE FROM subject WHERE subject_id=" + mysql.escape(id);
      mysqlConnection.query(sql2, function(err, result) {
        if(err)  {
          console.log(err);
          res.status(500).send({ error: 'Error in deleting a subject from subject table' })
        }
        else{
          res.send({'status': 'success'})
        }
        
      })
    }
  });
  
});

// delete a particular topic from the topic table
router.delete('/delete-topic/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = "DELETE FROM topic WHERE topic_id=" + mysql.escape(id);
  mysqlConnection.query(sql, function(err, result) {
    if(err)  {
      console.log(err);
      res.status(500).send({ error: 'Error in deleting a topic from topic table' })
    }
    else{
      res.send({'status': 'success'})
    }
    
  })
});
  






// New Updates 


// alter subject table subcourse
router.get('/alter-subject-table-2', (req, res) => {
  let sql = "ALTER TABLE subject ADD subcourse_id INT AFTER course_id"
  mysqlConnection.query(sql, (err, result) => {
    if(err){
        res.status(500).send({ error: err })
    }
    else{
      let sql2 = "ALTER TABLE subject ADD FOREIGN KEY (subcourse_id) REFERENCES subcourse(subcourse_id)"
      mysqlConnection.query(sql2, (err2, result2) => {
        if(err2){
            res.status(500).send({ error: err2 })
        }
        res.send(result2);
      })
    }
  })
});

// Fetch the entire table of the courses WITHOUT HIDE
router.get('/fetch-courses-without-hide', (req, res) => {
  let sql = "SELECT * FROM course ORDER BY priority"
  mysqlConnection.query(sql , (err, result) => {
      if(err){
          console.log(err);
          res.status(500).send({ error: 'Error in fetching data from table' })
      }
      res.send(result);
    })
});

// Fetch a particular id from the subcourses WITHOUT HIDE
router.get('/fetch-subcourse-by-courseid-without-hide/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM subcourse WHERE course_id="  + mysql.escape(id) + " ORDER BY priority";
  mysqlConnection.query(sql, function(err, row, fields) {
    if(err) {
      res.status(500).send({ error: 'Cannot fetch a particular subcourse' })
    }
    res.send(row)
  })
});

// Fetch a particular id from the subject table using sub course id WITHOUT HIDE
router.get('/fetch-subject-by-subcourseid-without-hide/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM subject WHERE subcourse_id="  + mysql.escape(id) + " ORDER BY priority";
  mysqlConnection.query(sql, function(err, row, fields) {
    if(err) {
      res.status(500).send({ error: 'Cannot fetch a particular subject' })
    }
    res.send(row)
  })
});

// Fetch a particular id from the topic table using subject id WITHOUT HIDE
router.get('/fetch-topic-by-subjectid-without-hide/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM topic WHERE subject_id="  + mysql.escape(id) + " ORDER BY priority";
  mysqlConnection.query(sql, function(err, row, fields) {
    if(err) {
      res.status(500).send({ error: 'Cannot fetch a particular topic' })
    }
    res.send(row)
  })
});

// fetch count of videos in a course of all courses respectively.
router.get('/fetch-courses-video-count', function(req, res) {
  var sql = "SELECT course_id, count(*) AS count FROM lecture GROUP BY course_id"
  mysqlConnection.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: err })
    }
    else{
      var sql2 = "SELECT * from course AND hide = 0 ORDER BY priority"
      mysqlConnection.query(sql2, function(err2, result2) {
        if(err2){
          res.status(500).send({ error : err2});
        }
        else{
          var ans = [];
          result2.forEach(x => {
            var flag = 0;
            result.forEach(y => {
              if(x.course_id == y.course_id){
                ans.push({course_id : x.course_id, course_name : x.course_name, description : x.description, video_count : y.count });
                flag = 1;
              }
            });
            if(flag == 0){
              ans.push({course_id : x.course_id , course_name : x.course_name, description : x.description, video_count : 0});
            }
          });
          res.send(ans)
        }
      });
    }
    
  });
});

// fetch count of videos in a sub-course of a particular subcourse id.
router.get('/fetch-subcourses-video-count-by-courseid/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT subcourse_id, count(*) AS count FROM lecture WHERE course_id = ? GROUP BY subcourse_id "
  mysqlConnection.query(sql, [id], function(err, result) {
    if(err) {
      res.status(500).send({ error: err })
    }
    else{
      var sql2 = "SELECT * from subcourse where course_id = ? AND hide = 0 ORDER BY priority"
      mysqlConnection.query(sql2, [id], function(err2, result2) {
        if(err2){
          res.status(500).send({ error : err2});
        }
        else{
          var ans = [];
          result2.forEach(x => {
            var flag = 0;
            result.forEach(y => {
              if(x.subcourse_id == y.subcourse_id){
                ans.push({subcourse_id : x.subcourse_id, subcourse_name : x.subcourse_name, video_count : y.count });
                flag = 1;
              }
            });
            if(flag == 0){
              ans.push({subcourse_id : x.subcourse_id, subcourse_name : x.subcourse_name, video_count : 0});
            }
          });
          res.send(ans)
        }
      });
    }
  });
});

// fetch count of videos in a sub-course of a particular subcourse id.
router.get('/fetch-subject-video-count-by-subcourseid/:user_id/:subcourse_id', function(req, res) {
  var subcourse_id = req.params.subcourse_id;
  var user_id      = req.params.user_id;
  var sql = "SELECT * FROM (SELECT * FROM subject WHERE subcourse_id = ? ) AS s LEFT JOIN (SELECT subject_id, count(*) AS completed_lecture FROM lecture AS l INNER JOIN (SELECT * FROM lecture_status WHERE user_id = ? AND completed_lecture = 1) AS ls ON l.lecture_id = ls.lecture_id GROUP BY subject_id) AS l ON l.subject_id = s.subject_id LEFT JOIN (SELECT subject_id, count(*) AS count FROM lecture WHERE subcourse_id = ? GROUP BY subject_id) AS e ON e.subject_id = s.subject_id WHERE hide = 0 ORDER BY priority" 
  mysqlConnection.query(sql, [subcourse_id, user_id, subcourse_id], function(err, result) {
    if(err) {
      res.status(500).send({ error: err })
    }
    else{
      res.status(200).send(result)
    }
  });
});





module.exports = router;
