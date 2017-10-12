/**
 * Module dependencies.
 */
var express = require('express'); //
var path = require('path'); //

var logger = require('morgan'); //
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

/**
 * ====================================================================================
 * Application Config
 * ====================================================================================
 */
var app = express();
// Chargement du logger avant toute choses.
app.use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
// Config for all environments
app.set('port', process.env.PORT || 3000);
app.set('views', './views');
app.set('view engine', 'ejs');
// app.use(require('serve-favicon')(__dirname + "/public/ico/command.ico"));

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
	extended : false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' === app.get('env')) {
	app.use(errorHandler());
}

app.use(require('./routes'));

var serverAdmin = require('./server').createServeur();
console.log("Start serveur");
serverAdmin.start(app);

