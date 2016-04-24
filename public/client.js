const socket = io();

const connectionCount = document.getElementById('connection-count');
const userIds = document.getElementById("user-ids");
const buttons = document.querySelectorAll('.options button');
const path = window.location.pathname.split("/");
const pollId = path[path.length-1];


socket.on('usersConnected', function (count, users) {
  connectionCount.innerText = 'Connected Users: ' + count;
  userIds.innerText = 'Users Connected: ' + users
});

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function (){
    console.log(this.innerText, pollId)
    socket.send(`voteCast-${pollId}`, {vote: this.innerText, pollId: pollId});
  });
}

socket.on(`voteCount-${pollId}`, function (poll) {
  console.log("poll: " + poll)
  var i = 1
  for (var option in poll.options) {
    console.log('option: ' + option)
    $(`#${poll.pollId}-${i}`).text(`${poll.options[option]}`);
    i++
  };
});
