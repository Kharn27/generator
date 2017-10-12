// 		// Connexion à socket.io
// 		var socket = io.connect(window.location.host);
var socket = io.connect();
// var socket = io.connect("http://10.0.0.26:3000");
var terminalContainer = document.getElementById('terminal-container');
var term = new Terminal({
	cursorBlink : true
});
term.open(terminalContainer);
term.fit();

socket.on('connect', function() {
	term.write('\r\n*** Connected to backend***\r\n');

	// Browser -> Backend
	term.on('data', function(data) {
		socket.emit('data', data);
	});

	// Backend -> Browser
	socket.on('data', function(data) {
		term.write(data);
	});

	socket.on('disconnect', function() {
		term.write('\r\n*** Disconnected from backend***\r\n');
	});
});

socket.on('message', function(message) {
	$("#zoneInfos").append(new InfoDiv(message));
});

socket.on(ServerEvents.type.serverInfos, function(message) {
	var serverInfo = ServerInfos.newJSONServerEnv(message);
	concentratorMonitor.setStatus(serverInfo.isKOnline);
	mqttMonitor.setStatus(serverInfo.isMqttOnline);
	updateUsersOnLine(serverInfo.userCount);
});


socket.on(ServerEvents.type.resultProxyCmd, function(data) {
	let
	reportPanel = "";
	let resultProxyCmd = JSON.parse(data);
	if (resultProxyCmd.commandStatus === 0) {
		reportPanel = new SuccessReport(resultProxyCmd.results);
	} else if (resultProxyCmd.commandStatus === resultProxyCmd.results.length) {
		reportPanel = new ErrorReport(resultProxyCmd.results);
	} else {
		reportPanel = new WarnReport(resultProxyCmd.results);
	}
	$("#zoneInfos").append(reportPanel);
});

socket.on(ServerEvents.type.refreshMetersList, function(data) {
	updateMeterList(MeterModel.newJSONMetersList(data));
});

$(function() {

	// initialisation des tooltip-div, sinon ils sont affichés comme tooltip
	// natif
	$('[data-toggle="tooltip"]').tooltip({
		// Autorise le HTML dans le tooltip
		html : true
	});
	// initialisation des popover, sinon ils sont affichés comme tooltip natif
	$('[data-toggle="popover"]').popover({
		// Autorise le HTML dans le popover
		html : true
	});

	$('#poke').click(function() {
		socket.emit('message', 'Salut serveur, ça va ?');
	});

	$('#poke2').click(function() {
		var w = window.open('/sshConnect', "popupWindow", "width=600, height=400, scrollbars=yes");
	});

});