require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const app = express();
const port = process.env.PORT || 5000; // Correct the port assignment

app.use(session({
  secret: 'your-secret-key', // Change this to your own secret key
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://rupanjalichaurasiya21b:KsQq54nvupOrrmqL@cluster0.0m2obae.mongodb.net/', // Provide your MongoDB connection string
    // You might need to add additional configuration options here
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));

app.get('*', function (req, res) {
  res.status(404).send('404 not found');
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
