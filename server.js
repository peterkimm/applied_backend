// DEPENDENCIES
const express = require('express');
const app = express();
require('dotenv').config();
// configure database
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const admin = require('firebase-admin');


admin.initializeApp({
  credential: admin.credential.cert({
    "project_id": process.env.project_id,
    "private_key": process.env.private_key.replace(/\\n/g,"\n"),
    "client_email": process.env.client_email,
    "token_uri": process.env.token_uri
  }),
  databaseURL: process.env.MONGODB_URL
});


// database configuration
const { PORT, MONGODB_URL } = process.env;
mongoose.connect(MONGODB_URL);

// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
// authorization middleware
app.use(async (req, res, next) => {
    const token = req.get('Authorization');
    if(token) {
        try{
            const user = await admin.auth().verifyIdToken(token.replace('Bearer ', ''));
            req.user = user;
         } catch (error) {
             req.user = null;
         }
    } else {
        req.user = null;
    }
    next();
});
// checking authentication of req.user
function isAuthenticated(req, res, next) {
    if(!req.user) {
        return res.status(401).json({message: 'you must be logged in'});
    } else {
        return next();
    }
}

// job applications controller
const jobsController = require('./controllers/jobs');
app.use(isAuthenticated, jobsController);


// INDEX with updated dashboard view
app.get('/', (req, res) => {
    res.send('hello world')
});


// LISTENER

app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`)
})