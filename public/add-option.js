$(document).ready(function (){
  handleOptions();
})

// function addOption(){
//   var $newOption = $("<input class='center option-field' type='text' name='poll[options][]' placeholder='Poll Option'>");
//   $('#poll-inputs').append($newOption);
// }
//
// function removeOption(){
//   var inputs = $('.option-field');
//   inputs[inputs.length - 1 ].remove();
// }

function handleOptions(){
  $('#add-option-button').on('click', function(){
    var $newOption = $("<input class='center option-field' type='text' name='poll[options][]' placeholder='Poll Option'>");
    $('#poll-inputs').append($newOption);
  });

  $('#remove-option-button').on('click', function(){
    var inputs = $('.option-field');
    inputs[inputs.length - 1 ].remove();
  });
}
