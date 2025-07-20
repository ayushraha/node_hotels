//import express js
const express = require('express')
const app = express()

//use to connect database
const connectDB = require('./db');
connectDB();

//for converting string data to json object and store into request body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//configure dotenv
require('dotenv').config();

const passport = require('./auth');

//middleware function for logging
const logRequest = (req,res,next) =>{
  //console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
  next();//move to the next phase
}

app.use(logRequest); 

//initalize passport
app.use(passport.initialize());



const localAuthMiddleware = passport.authenticate('local',{session : false});

app.get('/',(req,res) => {
  res.send('Welcome to our Hotel');
})



const MenuItem = require('./models/MenuItem');
//import the router file for person
const personRoutes = require('./routes/personRoutes');

app.use('/person',localAuthMiddleware,personRoutes);

//import the router file for menuitems
const menuRoutes = require('./routes/menuRoutes');
app.use('/menu',menuRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
  console.log('listening on port 3000');
})





