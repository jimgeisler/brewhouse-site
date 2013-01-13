exports.checkAuthentication = function(req, res) {
    var auth = req.headers['authorization'];  
    console.log("Authorization Header is: ", auth);
	if (!auth) {
		res.statusCode=401;
		res.setHeader('WWW-Authenticate', 'Basic realm="Secure API"');
		res.end('<html><body>Missing credentials</body></html>');
		return false;
	} else {
		var tmp = auth.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
		var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
		var plain_auth = buf.toString();        // read it back out as a string
		console.log("Decoded Authorization ", plain_auth);
		var creds = plain_auth.split(':');      // split on a ':'
		var username = creds[0];
		var password = creds[1];

		if((username == 'broni') && (password == 'jimsucksatmagic')) {   // Is the username/password correct?
			res.statusCode = 200;  // OK
		} else {
			res.statusCode = 401; // Force them to retry authentication
			res.setHeader('WWW-Authenticate', 'Basic realm="Secure API"');
			res.end('<html><body>Invalid credentials</body></html>');
			return false;
		}
    }
	return true;
};
