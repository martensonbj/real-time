const http = require('http');
const express = require('express');

const app = express();
app.locals.title = 'Real Time';


app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res){
  res.send(app.locals.title);
});

app.get('/', function (req, res){
  res.render('pages/index');
});

const port = process.env.PORT || 3000;

const server = http.createServer(app)
server.listen(port, function () {
});




if (!module.parent) {
  app.listen(app.get('port'), () => {
      console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = server;
module.exports = app;
