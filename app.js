var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize  = require('./config/database');

//models
require('./models/user');
require('./models/brand');
require('./models/product');

//models associations 
require('./models/associations');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoutes');
var brandRouter = require('./routes/brandRoutes');
var productRouter = require('./routes/productRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//SESSAO===================================================================================

const session = require('express-session');
const pgSession = require('express-pg-session')(session);
const { Pool } = require('pg');
require('dotenv').config();

const pgPool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

app.use(session({
  store: new pgSession({
    pool: pgPool,
    tableName: 'session',
  }),
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax'
  }
}));
//=======================================================================================


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/brand', brandRouter);
app.use('/product', productRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Sync database
(async () => {
  try {
    // Testar conexão primeiro
    await sequelize.authenticate();
    console.log('Conexão com a database realizada!');
    
    // Sincronizar modelos
    await sequelize.sync();
    console.log('Database sincronizada!');
  } catch (error) {
    console.error('Erro durante conexão da database:', error);
  }
})();

module.exports = app;
