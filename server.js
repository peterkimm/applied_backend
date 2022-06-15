// DEPENDENCIES
const express = require('express');
const app = express();
require('dotenv').config();
// configure database
const mongoose = require('mongoose');
// configure express sessions
const session = require('express-session');
// configure method override
const methodOverride = require('method-override');

// database configuration
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
// configure express sessions
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }));
    // configure method override
    app.use(methodOverride('_method'));


// Routes / Controllers
const userController = require('./controllers/users');
app.use('/users', userController);
// sessions controller
const sessionsController = require('./controllers/sessions');
app.use('/sessions', sessionsController);


// INDEX with updated dashboard view
app.get('/', (req, res) => {
	if (req.session.currentUser) {
		res.render('dashboard.ejs', {
			currentUser: req.session.currentUser
		});
	} else {
		res.render('index.ejs', {
			currentUser: req.session.currentUser
		});
	}
});

// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`)
})