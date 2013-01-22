exports.checkAuthentication = function(auth) {
    console.log("Authorization Header is: ", auth);
    
	if (!auth) {
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
            return true; // OK
		} else {
			return false; // Retry authentication.
		}
    }
	return true;
};
