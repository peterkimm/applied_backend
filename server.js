// DEPENDENCIES
const express = require('express');
const app = express();
require('dotenv').config();
// configure database
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');


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

// job applications controller
const jobsController = require('./controllers/jobs');
app.use('/', jobsController);


// INDEX with updated dashboard view
app.get('/', (req, res) => {
    res.send('hello world')
});

// LISTENER

app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`)
})