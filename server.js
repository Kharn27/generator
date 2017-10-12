/**
 * http://usejsdoc.org/
 * 
 * Code regroupant la configuration du serveur
 */
var os = require('os');
var io = null;

// Singleton Holder (final)
var instance = null;

class Server {
	
	constructor() {
		this.server = null;
		 
	};

	 start(nodeApp){
		 this.server = require('http').createServer(nodeApp);
		 
		 //this.klientSsh.connectK();
		 this.server.listen(nodeApp.get('port'), () => {
			console.log('Osak Admin is Now started on [http://' + os.hostname() + ':' + nodeApp.get('port') + '] ');
		});
	};

}

module.exports.createServeur = () => {
	if (instance === null) {
		instance = new Server();
	}
	return instance;
}
