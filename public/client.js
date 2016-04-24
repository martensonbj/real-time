const socket = io();

const connectionCount = document.getElementById('connection-count');
const userIds = document.getElementById("user-ids");
const buttons = document.querySelectorAll('.options button');
const optionsBlock = document.getElementById("options-block")
const path = window.location.pathname.split("/");
const pollId = path[path.length-1];


socket.on('usersConnected', function (count, users) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function (){
    socket.send(`voteCast-${pollId}`, {vote: this.innerText, pollId: pollId});
  });
}

socket.on(`voteCount-${pollId}`, function (poll) {
  var i = 1
  for (var option in poll.options) {
    $(`#${poll.pollId}-${i}`).text(`${poll.options[option]}`);
    i++
  };
});

$('#close-poll').on('click', function(){
  socket.send(`closePoll-${pollId}`, {pollId: pollId});
});

socket.on(`closePoll-${pollId}`, function (poll) {
  optionsBlock.remove();
  $('#poll-closed-text').text("POLL CLOSED")
});
