"use strict";

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const StorePoll = require('./public/store-poll');
const generateId = require('./public/generate-id')
const port = process.env.PORT || 3000;
const server =  http.createServer(app)
                .listen(port, function () {
                console.log('Listening on port ' + port + '.');
                  });

const socketIo = require('socket.io');
const io = socketIo(server);

app.locals.title = 'Real Time';
app.locals.votes = {};
app.locals.polls = {}

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res){
  res.render('index');
});

app.post('/new', function (req, res) {
  var pollId = generateId(5);
  var adminId = generateId(5);
  var pollTitle = req.body.poll.title;
  var submissions = req.body.poll.options;
  var options = {};

  submissions.forEach( function (option) {
    options[option] = 0;
  });

  var newPoll = new StorePoll(pollId, adminId, pollTitle, options);
  app.locals.polls[newPoll.pollId] = newPoll;

  res.render('pages/admin', {poll: newPoll});
});

//manage poll
app.get('/:adminId/:pollId', function (req, res) {
  var myPoll = app.locals.polls[req.params.pollId];
  res.render('pages/manage-poll', {poll: myPoll});
});

//show all public results
app.get('/poll/results/:pollId', function (req, res) {
  var myPoll = app.locals.polls[req.params.pollId];
  res.render('pages/public-results', {poll: myPoll});
});

//show private user voting page
app.get('/poll/private/:pollId', function (req, res) {
  var myPoll = app.locals.polls[req.params.pollId];
  res.render('pages/poll', {poll: myPoll});
});

io.on('connection', function (socket) {
  console.log('A user has connected', io.engine.clientsCount);
  console.log('Socket Id', socket.id);

  socket.on('message', function(channel, message) {
    var pollId = message.pollId;
    var poll = app.locals.polls[pollId]
    var vote = message.vote;
    var options = poll.options;

    if (channel === `voteCast-${pollId}`) {
      options[vote]++
      io.sockets.emit(`voteCount-${pollId}`, poll);
    }

    if (channel === `closePoll-${pollId}`) {
      poll.active = false;
      io.sockets.emit(`closePoll-${pollId}`);
    }

    app.locals.votes[socket.id] = message.vote

  });

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${port}.`);
  });
}

module.exports = server;
module.exports = app;
