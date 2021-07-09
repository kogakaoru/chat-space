$(function(){
  // console.log("あ");
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    console.log("い");
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  })
});