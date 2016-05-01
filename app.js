/**
 * Created by MoNeY_Pro on 2016/4/30.
 */
/**
 * Created by MoNeY_Pro on 2016/4/30.
 */
/**
 * Created by MoNeY_Pro on 2016/4/30.
 */

var shortURLPromise
    , short = require('./lib/short');

// connect to mongodb
short.connect('mongodb://localhost/short');

short.connection.on('error', function(error) {
    throw new Error(error);
});

// promise to generate a shortened URL.
var shortURLPromise = short.generate({
    URL : 'http://www.google.com/'
});

// gets back the short url document, and then retrieves it
shortURLPromise.then(function(mongodbDoc) {
    console.log('>> created short URL:');
    console.log(mongodbDoc);
    console.log('>> retrieving short URL: %s', mongodbDoc.hash);
    short.retrieve(mongodbDoc.hash).then(function(result) {
        console.log('>> retrieve result:');
        console.log(result);
        //process.exit(0);
    }, function(error) {
        if (error) {
            throw new Error(error);
        }
    });
}, function(error) {
    if (error) {
        throw new Error(error);
    }
});
var routes = require('./routes/index');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.listen(8081, function () {
    console.log('Express server listening on port');
});