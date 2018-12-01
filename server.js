const express           = require('express'),
      mongoose          = require('mongoose'),
      bodyParser        = require('body-parser'),
      logger            = require('morgan'),
      path              = require('path'),
      SubmissionRoutes  = require('./routes/api/SubmissionRoutes'),
      app               = express();

//bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(logger('dev'));

//connecting to database
var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/submissionApp';
mongoose.connect(uristring, { useNewUrlParser:true })
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

// Serve static assets if in production
if(process.env.NODE_ENV == 'production'){
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


//=======================
// STARTING THE SERVER
//=======================

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log("Server started at port ", port));

//========================
// SOCKET IO STUFF
//========================

const socket = require('socket.io');
const io = socket().listen(server);
// const clientSocket = socket().listen('http://localhost:3000');

io.on('connection', (socket) => {
    console.log("Connected successfully!!", socket.id, io.engine.clientsCount);

    socket.on('toUpdate', () => {
        console.log("Recieved to update");
        socket.broadcast.emit('processUpdate');
    })

    socket.on('disconnect', () => {
        console.log("Disconnected Successfully", socket.id);
    })
});
