$(document).ready(function (){
  addOption();
})

function addOption(){
  var $newOption = $("<input class='center' type='text' name='poll[options][]' placeholder='Poll Option'>");
  $('#poll-inputs').append($newOption);
}
