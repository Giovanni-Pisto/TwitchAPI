const request = require(`request`);

CLIENT_ID = 'CLIENT_ID';
CLIENT_SECRET = 'CLIENT_SECRET';
GET_TOKEN = " https://id.twitch.tv/oauth2/token";
GET_STREAM = "https://api.twitch.tv/helix/streams"

const getToken = (url, callback) => {
	const options = {
		url: GET_TOKEN,
		json: true,
		body: {
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			grant_type: "client_credentials"
		}
	};
	
	request.post(options, (err, res, body) => {
		if(err) {
			return console.log(err);
		}
		//console.log(`Status: ${res.statusCode}`);
		//console.log(body);
		
		callback(res);
	});
};
var AT = ``;
getToken(GET_TOKEN,(res) => {
	console.log(res.body);
	AT = res.body.access_token;
	return AT;
});


const getStream = (url, accessT, callback) =>{
	const streamOptions = {
		url: GET_STREAM,
		method: "GET",
		headers: {
			'Client-ID': CLIENT_ID,
    		'Authorization': `Bearer ${accessT}`
        },
        qs: {
			'user_login': `turfino`
		}
	}
	
	request.get(streamOptions, (err, res, body) => {
		if(err) {
			return console.log(err);
		}
		console.log(`Status: ${res.statusCode}`);
		console.log(JSON.parse(body));
	});
};

setTimeout(() => {
	//console.log(AT);
	getStream(GET_STREAM, AT, (response) =>{})
}, 2000)
