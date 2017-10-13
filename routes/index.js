/**
 * Router configuration
 */
var router = require('express').Router();
var fileSys = require('fs');

var path = require("path");


// Set the FavIcon
router.use(require('serve-favicon')(__dirname + "./../public/ico/quake.ico"));

var sharedModules = () => {
	return function(req, res, next) {
		let
		scriptFile = fileSys.readFileSync('https://files.coinmarketcap.com/static/widget/currency.js', 'utf-8');
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


module.exports = router;