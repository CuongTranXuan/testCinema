require('dotenv').config({silent :true}); //process.env



const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./helpers/errorhandler.js');
const jwt = require('./helpers/jwt.js');

const mongoose = require('mongoose');
const dbConfig = require('./config/config.json');
//setting middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


// use JWT auth to secure the api
app.use(jwt());


mongoose.connect(dbConfig.connectionString, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// global error handler
app.use(errorHandler);

//include router

let films = require('./route/films.js');
let admin = require('./route/admin.js');
let user = require('./route/user.js');
app.use('/films',films);
app.use('/admin',admin);
app.use('/user',user);




app.listen(process.env.port, () => {
 console.log("Server running on port ",process.env.port);
});