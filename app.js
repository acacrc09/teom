require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/views/index');
const adminRouter = require('./routes/views/admin');
const indicatorsApiRouter = require('./routes/api/indicators');
const apm = require('elastic-apm-node').start()

// application
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Variable global para plantilla PUG/JADE.
app.use(function(req, res, next) {
    res.locals.links = [{ url: "./hipotecario", label: 'Hipotecario', icon: 'home' }, { url: "./portabilidad", label: 'Portabilidad', icon: 'money' }, { url: "./credito", label: 'Credito Consumo', icon: 'credit-card' }]
    next();
})

// routes
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/api/indicators', indicatorsApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    apm.captureError(createError(404))
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

module.exports = app;