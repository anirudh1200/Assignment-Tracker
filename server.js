const express           = require('express'),
      mongoose          = require('mongoose'),
      bodyParser        = require('body-parser'),
      logger            =  require('morgan'),
      SubmissionRoutes  = require('./routes/api/SubmissionRoutes'),
      app               = express();

//bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(logger('dev'));

//connecting to database
mongoose.connect("mongodb://localhost/submissionApp", { useNewUrlParser:true })
    .then(() => console.log("Database connected"))
    .catch(() => console.log("Database error"));

//for all routes /api/submissions/
app.use("/api/submissions", SubmissionRoutes);

app.listen(5000, () => console.log("Server started at port 5000"));
