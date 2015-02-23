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

sessionBus.connection.on('message', console.log);

sessionBus.getInterface('org.mpris.MediaPlayer2.omxplayer', '/org/mpris/MediaPlayer2', 'interface', function(error, iface) {
	if (error) {
		console.error("Get interface error:", error);
		return;
	}
	iface.getProperties(function(error, props) {
		console.log('Properties:');
		console.log(props);
	});
});
