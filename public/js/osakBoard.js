/**
 * http://usejsdoc.org/
 */
// Créer le bandeau d'affichage des erreurs.
function getCloseAnchor(typeToDismiss) {
	var type = typeof typeToDismiss === 'string' ? typeToDismiss : "alert";
	var closeAnchor = document.createElement("button");
	closeAnchor.setAttribute("class", "close");
	closeAnchor.setAttribute("aria-label", "Close");
	closeAnchor.setAttribute("data-dismiss", type);
	var innerSpan = document.createElement("span");
	innerSpan.setAttribute("aria-hidden", "true");
	innerSpan.innerHTML = "&times;";
	closeAnchor.appendChild(innerSpan);
	return closeAnchor;
}

var ReportDiv = function(alertType) {
	var reportDiv = document.createElement("DIV");
	if (typeof alertType !== "string") {
		alertType = "alert-info";
	}
	reportDiv.setAttribute("class", "alert " + alertType + " fade in out container-fluid");
	reportDiv.appendChild(getCloseAnchor());
	return reportDiv;
};

var InfoDiv = function(innerHtml) {
	var text = document.createTextNode(innerHtml);
	// var infoDiv = document.createElement("DIV");
	// infoDiv.setAttribute("class", "alert alert-info col-xs-10 col-sm-5");
	// infoDiv.appendChild(getCloseAnchor());
	var infoDiv = new ReportDiv("alert-info");
	infoDiv.appendChild(text);
	return infoDiv;
};

var SuccessReport = function(innerHtml) {
	var infoDiv = new ReportDiv("alert-success");
	if (typeof innerHtml === 'array') {
		for (let i =0 ; i < innerHtml.length; i++) {
			infoDiv.appendChild(document.createTextNode(innerHtml[i]));
			infoDiv.appendChild(document.createElement('br'));
		} 
	} else {
		infoDiv.appendChild(document.createTextNode(innerHtml));
	}
	return infoDiv;
};

var WarnReport = function(innerHtml) {
	var infoDiv = new ReportDiv("alert-warning");
	if (typeof innerHtml === 'array') {
		for (let i =0 ; i < innerHtml.length; i++) {
			infoDiv.appendChild(document.createTextNode(innerHtml[i]));
			infoDiv.appendChild(document.createElement('br'));
		} 
	} else {
		infoDiv.appendChild(document.createTextNode(innerHtml));
	}
	return infoDiv;
};

var ErrorReport = function(innerHtml) {
	var infoDiv = new ReportDiv("alert-danger");
	if (typeof innerHtml === 'array') {
		for (let i =0 ; i < innerHtml.length; i++) {
			infoDiv.appendChild(document.createTextNode(innerHtml[i]));
			infoDiv.appendChild(document.createElement('br'));
		} 
	} else {
		infoDiv.appendChild(document.createTextNode(innerHtml));
	}
	return infoDiv;
};

//var proxyMonitor = UIComponent.createBadgeMonitor("proxyStatus", "Proxy CPL");
//var mqttMonitor = UIComponent.createBadgeMonitor("mqttStatus", "Broker MQTT");
//var concentratorMonitor = UIComponent.createBadgeMonitor("concentratorStatus", "Concentrateur");

function updateUsersOnLine(userCount) {
	$('#usersOnline > .badge').html("" + userCount);
}

function updateMeterList(listMeters) {
	let table = $('#metersList > tbody');
	table.empty();
	let bootStrapIcon;
	let trashIcon;
	$.each(listMeters, function(index, meter) {
		let trElement = document.createElement('tr');
		trElement.appendChild(getTdElement(meter.id));
		trElement.appendChild(getTdElement(meter.ads));
		trElement.appendChild(getTdElement(meter.mac));
		bootStrapIcon = document.createElement('img');
		bootStrapIcon.setAttribute("src", "/ico/" + meter.state + ".png");
// trElement.appendChild(getTdElement(meter.state));
		trElement.appendChild(getTdElement(bootStrapIcon));
		trashIcon = document.createElement('button');
		trashIcon.setAttribute("class","glyphicon glyphicon-trash removeMeter");
		trashIcon.setAttribute("data-content", meter.ads);
		trElement.appendChild(getTdElement(trashIcon));
		table[0].appendChild(trElement);
	});
	
	$('.removeMeter').click(function() {
		socket.emit(ClientEvents.type.deleteMeter, "{ 'adsToRemove' : '" + this.getAttribute("data-content") + "'}");
	});
}

function getTdElement(value) {
	let
	tdElement = document.createElement('td');
	if (typeof value === 'object') {
		tdElement.appendChild(value);
	} else {
		tdElement.appendChild(document.createTextNode(value));
	}
	return tdElement;
}
