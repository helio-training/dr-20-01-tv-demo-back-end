var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var tvShowsRouter = require('./routes/tvShows');

var app = express();

app.use(logger('dev'));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    
    next()
})

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tv-shows', tvShowsRouter);

app.get('/health', (req, res) => {
    res.send({
        status: 'healthy',
        message: 'all systems nominal'
    })
})

module.exports = app;
