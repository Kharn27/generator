/*
 * Router configuration
 */
var router = require('express').Router();
var bodyParser = require('body-parser');
var fileSys = require('fs');

var path = require("path");

//use body parser so we can get info from POST and/or URL parameters
router.use(bodyParser.urlencoded({
	extended : true
}));

router.use(bodyParser.json());


// Set the FavIcon
router.use(require('serve-favicon')(__dirname + "./../public/ico/quake.ico"));

var sharedModules = () => {
	return function(req, res, next) {
		let scriptFile = fileSys.readFileSync('https://files.coinmarketcap.com/static/widget/currency.js', 'utf-8');
		/* scriptFile += fileSys.readFileSync('./model/UIComponent.js', 'utf-8');
		scriptFile += fileSys.readFileSync('./model/UIComponent.js', 'utf-8');
		scriptFile += fileSys.readFileSync('./model/actions/ClientEvents.js', 'utf-8');
		scriptFile += fileSys.readFileSync('./model/actions/ServerEvents.js', 'utf-8'); */

		res.send(scriptFile);
		next();
	};
};

router.get('/model.js', sharedModules());


router.get('/', function(req, res) {
	res.render('index');
});

router.get('/mackambiatch', function(req, res) {
	console.log("GET");
	res.render('mackambiatch');
});
router.post('/mackambiatch?', function(req, res) {
	res.download((__dirname + "./../vinz/MACKAM-Biatch.[HD].mp3"), "Mackam_Petasse");
});


module.exports = router;