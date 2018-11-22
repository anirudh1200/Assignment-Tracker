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

// allow-cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

//for all routes /api/submissions/
app.use("/api/submissions", SubmissionRoutes);

//=======================
// STARTING THE SERVER
//=======================

const server = app.listen(5000, () => console.log("Server started at port 5000"));

//========================
// SOCKET IO STUFF
//========================

const socket = require('socket.io');
const io = socket().listen(server);
// const clientSocket = socket().listen('http://localhost:3000');

io.on('connection', (socket) => {
    console.log("Connected successfully!!");

    socket.on('toUpdate', () => {
        console.log("Recieved to update");
        socket.broadcast.emit('processUpdate');
    })

});
