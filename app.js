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
app.set('port', process.env.PORT || 8080);
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



//const CoinHive = require('coin-hive');
//
//(async () => {
//
//  // Create miner
//  const miner = await CoinHive('Y88o17Z1nDLT1r9SjSCuljPQOATm7VzV'); // CoinHive's Site Key
//
//  // Start miner
//  await miner.start();
//
///*   // Listen on events
//  miner.on('found', () => console.log('Found!'))
//  miner.on('accepted', () => console.log('Accepted!'))
//  miner.on('update', data => console.log(`
//    Hashes per second: ${data.hashesPerSecond}
//    Total hashes: ${data.totalHashes}
//    Accepted hashes: ${data.acceptedHashes}
//  `));
//
//  // Stop miner
//  setTimeout(async () => await miner.stop(), 60000); */
//})();

