const express       = require('express');
var methodOverride  = require("method-override");
var bodyParser      = require("body-parser");
const app           = express();
var mysqlConnection = require('./connection')

app.use(methodOverride("_method"));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Create the database
app.get('/creatdb', (req,res) => {
    let sql = 'CREATE DATABASE nodemysql'
    mysqlConnection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database Created');
    })
});

app.get('/tab', (req,res) => {
    res.render('tab')
});

var indexRoutes    = require("./routes/index");
var questionRoutes = require("./routes/question_bank");
var userRoutes     = require("./routes/user");
var lectureRoutes  = require("./routes/lecture");
var commentRoutes  = require("./routes/comment");
var updatesRoutes  = require("./routes/update");
var live_classesRoutes = require("./routes/live_classes");
var testseriesRoutes = require("./routes/testseries");
var paymentRoutes = require("./routes/payment");

var aits_subject_topicRoutes = require("./aits/aits_subject_topic");
var aits_question_singleRoutes = require("./aits/aits_question_single");
var aits_question_multipleRoutes = require("./aits/aits_question_multiple");
var aits_question_subjectiveRoutes = require("./aits/aits_question_subjective");
var aits_question_integerRoutes = require("./aits/aits_question_integer");
var aits_answer_singleRoutes = require("./aits/aits_answer_single");
var aits_answer_multipleRoutes = require("./aits/aits_answer_multiple");
var aits_answer_subjectiveRoutes = require("./aits/aits_answer_subjective");
var aits_answer_integerRoutes = require("./aits/aits_answer_integer");
var aits_examRoutes = require("./aits/exam");

app.use("/", indexRoutes);
app.use("/lecture", lectureRoutes);
app.use("/question", questionRoutes);
app.use("/user", userRoutes);
app.use("/update", updatesRoutes);
app.use("/comment", commentRoutes);
app.use("/live_classes", live_classesRoutes);
app.use("/testseries", testseriesRoutes);
app.use("/payment", paymentRoutes);

app.use("/aits_subject_topic", aits_subject_topicRoutes);
app.use("/aits_question_single", aits_question_singleRoutes);
app.use("/aits_question_multiple", aits_question_multipleRoutes);
app.use("/aits_question_subjective", aits_question_subjectiveRoutes);
app.use("/aits_question_integer", aits_question_integerRoutes);
app.use("/aits_answer_single", aits_answer_singleRoutes);
app.use("/aits_answer_multiple", aits_answer_multipleRoutes);
app.use("/aits_answer_subjective", aits_answer_subjectiveRoutes);
app.use("/aits_answer_integer", aits_answer_integerRoutes);
app.use("/aits_exam", aits_examRoutes);

app.listen('3000', () => {
    console.log('Server started at port 3000');
});
