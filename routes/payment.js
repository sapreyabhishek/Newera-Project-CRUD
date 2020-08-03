var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var mysqlConnection = require('../connection');

// create course subscription table
router.get('/create-course-subscription-table', (req, res) => {
    let sql = "CREATE TABLE course_subscription(course_subscription_id INT AUTO_INCREMENT PRIMARY KEY, subcourse_id INT NOT NULL UNIQUE, price FLOAT, course_subscription_details TEXT, course_subscription_description TEXT, course_subscription_starting_time TIME, course_subscription_ending_time TIME, discounted_price FLOAT, subscription_time FLOAT, FOREIGN KEY (subcourse_id) REFERENCES subcourse(subcourse_id))"
    mysqlConnection.query(sql, (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
 });
 
 // create coupon table
router.get('/create-coupon-table', (req, res) => {
    let sql = "CREATE TABLE coupon(coupon_id INT AUTO_INCREMENT PRIMARY KEY, coupon_code TEXT, course_subscription_id INT NOT NULL, discounted_percentage FLOAT, max_discount FLOAT, applicable tinyint, renew_time FLOAT, applicable_times INT, FOREIGN KEY (course_subscription_id) REFERENCES course_subscription(course_subscription_id))"
    mysqlConnection.query(sql, (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
 });
 
  // create coupon used table
router.get('/create-coupon-used-table', (req, res) => {
    let sql = "CREATE TABLE coupon_used(coupon_used_id INT AUTO_INCREMENT PRIMARY KEY, coupon_id INT NOT NULL, course_subscription_id INT NOT NULL, user_id INT NOT NULL, applied_time TIME, renew_time TIME, FOREIGN KEY (course_subscription_id) REFERENCES course_subscription(course_subscription_id), FOREIGN KEY (user_id) REFERENCES user(user_id), FOREIGN KEY (coupon_id) REFERENCES coupon(coupon_id))"
    mysqlConnection.query(sql, (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
 });
 
   // create subscription user table
router.get('/create-course-subscription-user-table', (req, res) => {
    let sql = "CREATE TABLE course_subscription_user(course_subscription_user_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, course_subscription_id INT NOT NULL, coupon_id INT, actual_price FLOAT, paid_amount FLOAT, duration_till TIME, transaction_id TEXT, transaction_method TEXT, FOREIGN KEY (course_subscription_id) REFERENCES course_subscription(course_subscription_id), FOREIGN KEY (user_id) REFERENCES user(user_id), FOREIGN KEY (coupon_id) REFERENCES coupon(coupon_id))"
    mysqlConnection.query(sql, (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
 });

 // insert course subscription in the course subscription table by making a post request
 router.post('/insert-course-subscription', (req, res) => {
   var subcourse_id  						= req.body.subcourse_id;
   var price						  	 	= req.body.price 							|| null;
   var course_subscription_details 			= req.body.course_subscription_details 		|| null;
   var course_subscription_description      = req.body.course_subscription_description 	|| null;
   var course_subscription_starting_time    = req.body.course_subscription_starting_time|| null;
   var course_subscription_ending_time     	= req.body.course_subscription_ending_time 	|| null;
   var discounted_price     				= req.body.discounted_price 				|| null;
   var subscription_time     				= req.body.subscription_time 				|| null;

   if(!subcourse_id){
     console.log("Invalid insert, subcourse id cannot be empty");
     res.status(500).send({ error: 'Compulsary filed cannot be empty' })
   }
   else{
     var value    = [[subcourse_id, price, course_subscription_details, course_subscription_description, course_subscription_starting_time, course_subscription_ending_time, discounted_price, subscription_time]];
     let sql = "INSERT INTO course_subscription (subcourse_id, price, course_subscription_details, course_subscription_description, course_subscription_starting_time, course_subscription_ending_time, discounted_price, subscription_time) VALUES ?"
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
  
 // insert coupon in the coupon table by making a post request
 router.post('/insert-coupon', (req, res) => {
   var course_subscription_id  	= req.body.course_subscription_id;
   var coupon_code				= req.body.coupon_code 				|| null;
   var discounted_percentage 	= req.body.discounted_percentage 	|| null;
   var max_discount      		= req.body.max_discount 			|| null;
   var applicable    			= req.body.applicable				|| null;
   var renew_time     			= req.body.renew_time 				|| null;
   var applicable_times     	= req.body.applicable_times 		|| null;

   if(!course_subscription_id){
     console.log("Invalid insert, course subscription id cannot be empty");
     res.status(500).send({ error: 'Compulsary filed cannot be empty' })
   }
   else{
     var value    = [[course_subscription_id, coupon_code, discounted_percentage, max_discount, applicable, renew_time, applicable_times]];
     let sql = "INSERT INTO coupon (course_subscription_id, coupon_code, discounted_percentage, max_discount, applicable, renew_time, applicable_times) VALUES ?"
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
  
  // insert coupon used in the coupon used table by making a post request
 router.post('/insert-coupon-used', (req, res) => {
   var course_subscription_id  	= req.body.course_subscription_id;
   var coupon_id		 	 	= req.body.coupon_id ;
   var user_id 					= req.body.user_id;
   var applied_time      		= req.body.applied_time 	|| null;
   var renew_time     			= req.body.renew_time 		|| null;
	
   if(!course_subscription_id || !coupon_id || !user_id){
     console.log("Invalid insert, course subscription id or coupon id or user id cannot be empty");
     res.status(500).send({ error: 'Compulsary filed cannot be empty' })
   }
   else{
     var value    = [[course_subscription_id, coupon_id, user_id, applied_time, renew_time]];
     let sql = "INSERT INTO coupon_used (course_subscription_id, coupon_id, user_id, applied_time, renew_time) VALUES ?"
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
  
  // insert subscription user in the subscription user table by making a post request
 router.post('/insert-subscription-user', (req, res) => {
   var course_subscription_id  	= req.body.course_subscription_id;
   var coupon_id		 	 	= req.body.coupon_id 			|| null;
   var user_id 					= req.body.user_id;
   var actual_price      		= req.body.actual_price 		|| null;
   var paid_amount     			= req.body.paid_amount 			|| null;
   var duration_till     		= req.body.duration_till 		|| null;
   var transaction_id     		= req.body.transaction_id 		|| null;
   var transaction_method     	= req.body.transaction_method 	|| null;
	
   if(!course_subscription_id || !user_id){
     console.log("Invalid insert, course subscription id or user id cannot be empty");
     res.status(500).send({ error: 'Compulsary filed cannot be empty' })
   }
   else{
     var value    = [[course_subscription_id, coupon_id, user_id, actual_price, paid_amount, duration_till, transaction_id, transaction_method]];
     let sql = "INSERT INTO course_subscription_user (course_subscription_id, coupon_id, user_id, actual_price, paid_amount, duration_till, transaction_id, transaction_method) VALUES ?"
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
 
 // Fetch the course subscription table of the course subscription table
router.get('/fetch-course-subscription', (req, res) => {
    let sql = "SELECT * FROM course_subscription"
    mysqlConnection.query(sql , (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
  });
 
 // Fetch a particular id from the course subscription table
router.get('/fetch-course-subscription/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM course_subscription WHERE course_subscription_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

 // Fetch a particular id from the course subscription table by subcourse id
router.get('/fetch-course-subscription-by-subcourse/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM course_subscription WHERE subcourse_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

// Fetch the coupon table of the coupon table
router.get('/fetch-coupon', (req, res) => {
    let sql = "SELECT * FROM coupon"
    mysqlConnection.query(sql , (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
  });
 
 // Fetch a particular id from the coupon table
router.get('/fetch-coupon/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM coupon WHERE coupon_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

 // Fetch a particular id from the coupon table by course subscription id
router.get('/fetch-coupon-by-course-subscription/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM coupon WHERE course_subscription_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

// Fetch the coupon used of the coupon used table
router.get('/fetch-coupon-used', (req, res) => {
    let sql = "SELECT * FROM coupon_used"
    mysqlConnection.query(sql , (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
  });
 
 // Fetch a particular id from the coupon used table
router.get('/fetch-coupon-used/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM coupon_used WHERE coupon_used_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

 // Fetch a particular id from the coupon used by coupon id
router.get('/fetch-coupon-used-by-couponid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM coupon_used WHERE coupon_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

 // Fetch a particular id from the coupon used by course subscription id
router.get('/fetch-coupon-used-by-course-subscription/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM coupon_used WHERE course_subscription_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

 // Fetch a particular id from the coupon used by user id
router.get('/fetch-coupon-used-by-userid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM coupon_used WHERE user_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

// Fetch the subscription user of the subscription user table
router.get('/fetch-course-subscription-user', (req, res) => {
    let sql = "SELECT * FROM course_subscription_user"
    mysqlConnection.query(sql , (err, result) => {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
  });
 
 // Fetch a particular id from the subscription user table
router.get('/fetch-course-subscription-user/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM course_subscription_user WHERE course_subscription_user_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

 // Fetch a particular id from the subscription user by coupon id
router.get('/fetch-subscription-user-by-couponid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM course_subscription_user WHERE coupon_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

 // Fetch a particular id from the subscription user by course subscription id
router.get('/fetch-subscription-user-by-course-subscription/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM course_subscription_user WHERE course_subscription_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

 // Fetch a particular id from the subscription user by user id
router.get('/fetch-subscription-user-by-userid/:id', function(req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM course_subscription_user WHERE user_id="  + mysql.escape(id);
    mysqlConnection.query(sql, function(err, result) {
      if(err){
        res.status(202).send({ error: err })
      }
      else{
        res.status(200).send(result);
      }
    })
});

// update a particular course subscription from the course subscription table
router.put('/update-course-subscription/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM course_subscription WHERE course_subscription_id = ?"
  mysqlConnection.query(sql, [id], function(err, result) {
    if(err) {
      res.status(500).send({ error: err })
    }
    else{
      if(result.length !=0){
          var subcourse_id        				 = req.body.subcourse_id        				|| result[0].subcourse_id;
          var price 							 = req.body.price 								|| result[0].price;
          var course_subscription_details      	 = req.body.course_subscription_details      	|| result[0].course_subscription_details;
          var course_subscription_description    = req.body.course_subscription_description     || result[0].course_subscription_description;
          var course_subscription_starting_time  = req.body.course_subscription_starting_time   || result[0].course_subscription_starting_time;
		  var course_subscription_ending_time    = req.body.course_subscription_ending_time     || result[0].course_subscription_ending_time;
		  var discounted_price                   = req.body.discounted_price                    || result[0].discounted_price;
		  var subscription_time                  = req.body.subscription_time                   || result[0].subscription_time;

          let sql2 = "UPDATE course_subscription SET subcourse_id = ?, price = ?, course_subscription_details = ?, course_subscription_description =?, course_subscription_starting_time = ?, course_subscription_ending_time = ?, discounted_price = ?, subscription_time = ? WHERE course_subscription_id = ?"
          mysqlConnection.query(sql2, [subcourse_id, price, course_subscription_details, course_subscription_description, course_subscription_starting_time, course_subscription_ending_time, discounted_price, subscription_time, id], (err2, result2) => {
              if(err2) {
                  res.status(202).send({ error: err2 })
              }
              else{
                  res.status(200).send({success : "Table was succesfully updated."});
              }
          });
      }
      else{
          res.status(400).send({error : "No course subscription id exits."});
      }
    }
  }); 
});

// update a particular coupon from the coupon table
router.put('/update-coupon/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM coupon WHERE coupon_id = ?"
  mysqlConnection.query(sql, [id], function(err, result) {
    if(err) {
      res.status(500).send({ error: err })
    }
    else{
      if(result.length !=0){
          var coupon_code        	 = req.body.coupon_code        		|| result[0].coupon_code;
          var course_subscription_id = req.body.course_subscription_id 	|| result[0].course_subscription_id;
          var discounted_percentage  = req.body.discounted_percentage   || result[0].discounted_percentage;
          var max_discount   		 = req.body.max_discount     		|| result[0].max_discount;
          var applicable 			 = req.body.applicable   			|| result[0].applicable;
		  var renew_time  		 	 = req.body.renew_time     			|| result[0].renew_time;
		  var applicable_times  	 = req.body.applicable_times     	|| result[0].applicable_times;

          let sql2 = "UPDATE coupon SET coupon_code = ?, course_subscription_id = ?, discounted_percentage = ?, max_discount = ?, applicable = ?, renew_time = ?, applicable_times = ? WHERE coupon_id = ?"
          mysqlConnection.query(sql2, [coupon_code, course_subscription_id, discounted_percentage, max_discount, applicable, renew_time, applicable_times, id], (err2, result2) => {
              if(err2) {
                  res.status(202).send({ error: err2 })
              }
              else{
                  res.status(200).send({success : "Table was succesfully updated."});
              }
          });
      }
      else{
          res.status(400).send({error : "No coupon id exits."});
      }
    }
  }); 
});


// update a particular coupon used from the coupon used table
router.put('/update-coupon-used/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM coupon_used WHERE coupon_used_id = ?"
  mysqlConnection.query(sql, [id], function(err, result) {
    if(err) {
      res.status(500).send({ error: err })
    }
    else{
      if(result.length !=0){
          var coupon_id        	 	 = req.body.coupon_id        		|| result[0].coupon_id;
          var course_subscription_id = req.body.course_subscription_id 	|| result[0].course_subscription_id;
          var user_id  			   	 = req.body.user_id   				|| result[0].user_id;
          var applied_time   		 = req.body.applied_time     		|| result[0].applied_time;
		  var renew_time  		 	 = req.body.renew_time     			|| result[0].renew_time;

          let sql2 = "UPDATE coupon_used SET coupon_id = ?, course_subscription_id = ?, user_id = ?, applied_time = ?, renew_time = ? WHERE coupon_used_id = ?"
          mysqlConnection.query(sql2, [coupon_id, course_subscription_id, user_id, applied_time, renew_time, id], (err2, result2) => {
              if(err2) {
                  res.status(202).send({ error: err2 })
              }
              else{
                  res.status(200).send({success : "Table was succesfully updated."});
              }
          });
      }
      else{
          res.status(400).send({error : "No coupon used id exits."});
      }
    }
  }); 
});

// update a particular subscription user from the subscription user table
router.put('/update-course-subscription-user/:id', function(req, res) {
  var id = req.params.id;
  var sql = "SELECT * FROM course_subscription_user WHERE course_subscription_user_id = ?"
  mysqlConnection.query(sql, [id], function(err, result) {
    if(err) {
      res.status(500).send({ error: err })
    }
    else{
      if(result.length !=0){
          var coupon_id        	 	 = req.body.coupon_id        		|| result[0].coupon_id;
          var course_subscription_id = req.body.course_subscription_id 	|| result[0].course_subscription_id;
          var user_id  			   	 = req.body.user_id   				|| result[0].user_id;
          var actual_price   		 = req.body.actual_price     		|| result[0].actual_price;
		  var paid_amount  		 	 = req.body.paid_amount     		|| result[0].paid_amount;
		  var duration_till  		 = req.body.duration_till     		|| result[0].duration_till;
		  var transaction_id  		 = req.body.transaction_id     		|| result[0].transaction_id;
		  var transaction_method  	 = req.body.transaction_method     	|| result[0].transaction_method;

          let sql2 = "UPDATE course_subscription_user SET coupon_id = ?, course_subscription_id = ?, user_id = ?, actual_price = ?, paid_amount = ?, duration_till = ?, transaction_id = ?, transaction_method = ? WHERE course_subscription_user_id = ?"
          mysqlConnection.query(sql2, [coupon_id, course_subscription_id, user_id, actual_price, paid_amount, duration_till, transaction_id, transaction_method, id], (err2, result2) => {
              if(err2) {
                  res.status(202).send({ error: err2 })
              }
              else{
                  res.status(200).send({success : "Table was succesfully updated."});
              }
          });
      }
      else{
          res.status(400).send({error : "No course subscription user id exits."});
      }
    }
  }); 
});

// delete a particular course subscription from the course subscription table
router.delete('/delete-course-subscription/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = "DELETE FROM course_subscription_user WHERE course_subscription_id=" + mysql.escape(id);
  mysqlConnection.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: err })
    }
    else{
      var sql2 = "DELETE FROM coupon_used WHERE course_subscription_id =" + mysql.escape(id);
      mysqlConnection.query(sql2, function(err2, result2) {
        if(err2){
          res.status(202).send({ error: err2 })
        }
        else{
          var sql3 = "DELETE FROM coupon WHERE course_subscription_id =" + mysql.escape(id);
		  mysqlConnection.query(sql3, function(err3, result3) {
			  if(err3){
				  res.status(202).send({ error: err3 })
			  }
			  else{
				  var sql4 = "DELETE FROM course_subscription WHERE course_subscription_id =" + mysql.escape(id);
				  mysqlConnection.query(sql4, function(err4, result4) {
					  if(err4){
						  res.status(202).send({ error: err4 })
					  }
					  else{
						  res.status(200).send(result4);
					  }
				  });
			  }
		  });
        }
      })
    }
  });
});

// delete a particular coupon from the coupon table
router.delete('/delete-coupon/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = "DELETE FROM course_subscription_user WHERE coupon_id=" + mysql.escape(id);
  mysqlConnection.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: err })
    }
    else{
      var sql2 = "DELETE FROM coupon_used WHERE coupon_id =" + mysql.escape(id);
      mysqlConnection.query(sql2, function(err2, result2) {
        if(err2){
          res.status(202).send({ error: err2 })
        }
        else{
          var sql3 = "DELETE FROM coupon WHERE coupon_id =" + mysql.escape(id);
		  mysqlConnection.query(sql3, function(err3, result3) {
			  if(err3){
				  res.status(202).send({ error: err3 })
			  }
			  else{
				  res.status(200).send(result3);
			  }
		  });
        }
      })
    }
  });
});

// delete a particular coupon used from the coupon used table
router.delete('/delete-coupon-used/:id', function(req, res, next) {
  var id = req.params.id;
  var sql3 = "DELETE FROM coupon_used WHERE coupon_used_id=" + mysql.escape(id);
  mysqlConnection.query(sql3, function(err, result) {
    if(err){
      res.status(202).send({ error: err })
    }
    else{
      res.status(200).send(result);
    }
  });
});

// delete a particular subscription user from the subscription user table
router.delete('/delete-course-subscription-user/:id', function(req, res, next) {
  var id = req.params.id;
  var sql3 = "DELETE FROM course_subscription_user WHERE course_subscription_user_id=" + mysql.escape(id);
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