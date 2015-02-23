var fs = require('fs');

var dbus = require('../index.js');

var dbusAddressFilename = "/tmp/omxplayerdbus." + process.env.USER;

if (!fs.existsSync(dbusAddressFilename)) {
	throw new Error("Can not get the dbus address  (try content of filename " + dbusAddressFilename + ")");
}

var busAddress = fs.readFileSync(dbusAddressFilename).toString();
console.log("Bus address:", busAddress);

var sessionBus = dbus.sessionBus({
	busAddress: busAddress
});

sessionBus.connection.on('message', function(msg) {
	console.log("Receive", msg);
});

sessionBus.invoke({
	destination: 'org.mpris.MediaPlayer2.omxplayer',
	path: '/org/mpris/MediaPlayer2',
	'interface': 'org.freedesktop.DBus.Properties',
	member: 'CanSetFullscreen'

}, function(error, iface) {
	if (error) {
		console.error("Get interface error:", error);
		return;
	}
	console.log("Return ", iface);
});
