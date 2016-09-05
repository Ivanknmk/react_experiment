var connect = require('connect'),
    serveStatic = require('serve-static'),
    path = require('path');

connect()
  .use(serveStatic(path.resolve(__dirname, 'public')))
  .listen(8080, function(){
    console.log('Server running on 8080...');
  });
