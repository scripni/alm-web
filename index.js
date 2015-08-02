var express = require("express");
var app = express();
var solr = require("solr");

var client = solr.createClient({
  host: 'trynutch.cloudapp.net',
  port: '8983',
  core: '/collection1', // if defined, should begin with a slash
  path: '/solr' // should also begin with a slash
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.get('/search/:query', function(req, res, done) {
	console.log("received search query " + req.params.query);
	client.query(req.params.query, function(err, solrResponse) {
		if (err){
			console.log(err);
			throw err;
		}

		console.log("SOLR response " + solrResponse);
		var responseObject = JSON.parse(solrResponse);

		console.log("returning results " + responseObject.response);
		res.send(JSON.stringify(responseObject.response));
		done();
	});
});

var server = app.listen(3000, function() {
	console.log("listening on port " + server.address().port);
});