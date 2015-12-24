var express = require('express');
var Busboy = require('busboy');
var fs=require('fs');
var app = express();
var dataBox =[];
var fileName =0;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));



app.post('/upload', function(request, response) {
	var busboy = new Busboy({ headers: request.headers });

	busboy.on('file', function(fieldename, file, filename, encoding, mimetype)
	{
		if (fieldename === 'pic') {
			file.pipe(fs.createWriteStream('public/' + fileName + '.jpg'));
		}
		if (fieldename === 'talk'){
			file.pipe(fs.createWriteStream('public/' + fileName + '.m4a'));
		}

	});
	request.pipe(busboy);
		fileName++;
	
		dataBox.push([fileName+'.jpg',fileName + '.m4a']);
		response.end('ok');
	});

	app.get('/message', function(request, response){
		response.end(JSON.stringify(dataBox));
	});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});




