var http = require('http');

console.log('process.env.GIT_PARAMS');
console.log(JSON.stringify(process.env.GIT_PARAMS));

var options = {
  host: 'localhost',
  port: 4567,
  path: '/prepush'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    console.log('response');
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log('received' + str);
    // process.exit(1);
  });
}
var req = http.request(options, callback);
req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});
req.end();