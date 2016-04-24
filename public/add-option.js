$(document).ready(function (){
  
  function addOption(){
    var $newOption = $("<input class='center option-field' type='text' name='poll[options][]' placeholder='Poll Option'>");
    $('#poll-inputs').append($newOption);
  }

  function removeOption(){
    var inputs = $('input');
    inputs[inputs.length -3 ].remove();
  }

})
