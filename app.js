require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');


require('./configs/passport');


mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


const app = express();

app.set('trust proxy', 1)

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app
.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialed: true,
  resave: true,
  cookie: {
    sameSite: 'none', // true,
    secure: true, // false,
    httpOnly: false, // true,
    maxAge: 60000
  },
  rolling: true
}));

app.use(passport.initialize());
app.use(passport.session());

app
  .use(
    cors({
      credentials: true,
      origin: [process.env.CLIENT_HOSTNAME]
    })
  )


const index = require('./routes/index');
app.use('/', index);

const shopRoutes = require('./routes/shop-routes');
app.use('/api', shopRoutes);

const userRoutes = require('./routes/user-routes');
app.use('/api', userRoutes);

const productRoutes = require('./routes/product-routes');
app.use('/api', productRoutes);

const authRoutes = require('./routes/auth-routes');
app.use('/api', authRoutes);


module.exports = app;
