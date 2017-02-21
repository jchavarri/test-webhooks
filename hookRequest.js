var http = require('http');

exports.makeRequest = function makeRequest(op) {

  var ref = require('child_process')
  .execSync('git rev-parse --abbrev-ref HEAD')
  .toString().trim();
  console.log(ref);

  var options = {
    host: 'localhost',
    port: 4567,
    path: '/' + op + '/' + ref,
  };

  callback = function(response) {
    var str = '';

    //another chunk of data has been received, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been received, so we just print it out here
    response.on('end', function () {
      if (response.statusCode < 200 || response.statusCode > 299) {
        console.log('Received not successful status with code ' + response.statusCode);
        console.log(str);
      } else {
        var parsedResponse = JSON.parse(str);
        if (parsedResponse.message) {
          console.log(parsedResponse.message);
        }
        if (parsedResponse.code === 0) {
          process.exit(0);
        } else {
          process.exit(1);
        }
      }
    });
  }
  var req = http.request(options, callback);
  req.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });
  req.end();
}

