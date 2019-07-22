//zaladowanie modulow
const colors = require('colors');
const http = require('http');
const handlers = require('./handlers');

function start() {
	function onRequest(req,res) {
		//request info
		console.log(
			colors.blue('Request from: ')+colors.green('%s:%s ')+colors.white('%s %s'),
			req.connection.remoteAddress, req.connection.remotePort,
			req.method, req.url
		);

		res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});

		switch(req.url) {
			case '/':
	        case '/start':
	            handlers.welcome(req, res);
	            break;
	        case '/upload':
	            handlers.upload(req, res);
	            break;
			case '/show':
	            handlers.show(req, res);
	            break;
	        default:
	            handlers.error(req, res);
		}
	}

	//uruchomienie serwera
	http.createServer(onRequest).listen(9000);
  	console.log("Server is running!".green);
}

exports.start = start;