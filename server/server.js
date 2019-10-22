const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();
const port = process.env.PORT || 8000;

// DB Config
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

var store = new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions'
});

// Catch errors
store.on('error', function (error) {
    console.log(error);
});

server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use(
    session({
        secret: 'secretProject',
        store: store,
        cookie: {
            path: '/',
            // Boilerplate options, see:
            // * https://www.npmjs.com/package/express-session#resave
            // * https://www.npmjs.com/package/express-session#saveuninitialized
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        },
        resave: true,
        saveUninitialized: true
    })
);

require('./config/passport');

server.use(passport.initialize());
server.use(passport.session());
// Cors 
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
//Routes
server.use('/', cors(corsOptions), require('./routes/index'));
server.use('/auth',  cors(corsOptions), require('./routes/auth'));
server.use('/users', require('./routes/users'));
server.use('/items', require('./routes/items'));

server.listen(port, () => console.log(`Example app listening on port ${port}!`));
