$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="main-chat__message--list--article">
        <div class="main-chat__message--list--article--head">
          <div class="main-chat__message--list--article--head--name">
            ${message.user_name}
          </div>
          <div class="main-chat__message--list--article--head--date">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__message--list--article--text">
          ${message.content}
          <img src=${message.image} >
        </div>
      </div>`
      
    return html;
    } else {
      var html =
      `<div class="main-chat__message--list--article">
        <div class="main-chat__message--list--article--head">
          <div class="main-chat__message--list--article--head--name">
            ${message.user_name}
          </div>
          <div class="main-chat__message--list--article--head--date">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__message--list--article--text">
          ${message.content}
        </div>
      </div>`
      
    return html;
    };
  }
  
  $('#new_message').on('submit', function(e){
    e.preventDefault()
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
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__message--list').append(html);
      $('.main-chat__message--list').animate({ scrollTop: $('.main-chat__message--list')[0].scrollHeight});
      $('form')[0].reset();
      $('.main-chat__message--form--input--text').val('');
      $('.main-chat__message--form--send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.main-chat__message--form--send-btn').prop('disabled', false);
    })
  })
});