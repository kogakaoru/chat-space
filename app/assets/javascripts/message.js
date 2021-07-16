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

  // var reloadMessages = function( {
  //   //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  //   var last_message_id = $('.main-chat__message--list--article').data("message-id");
  //   $.ajax({
  //     //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
  //     url: "api/messages",
  //     //ルーティングで設定した通りhttpメソッドをgetに指定
  //     type: 'get',
  //     dataType: 'json',
  //     //dataオプションでリクエストに値を含める
  //     data: {id: last_message_id}
  //   })
  // })
  
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

  // var last_message_id = $('.main-chat__message--list--article').data("message-id");
  // console.log(last_message_id);

  // そのまま書いていいんじゃない？
  // $.ajax({

  // })

  // この書き方だと、last_message_idに変な文句がつく(模解通りなのに、なぜ)
  // var reloadMessages = function( {
  //   //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  //   var last_message_id = $('.main-chat__message--list--article').data("message-id");
  //   $.ajax({
  //     //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
  //     url: "api/messages",
  //     //ルーティングで設定した通りhttpメソッドをgetに指定
  //     type: 'get',
  //     dataType: 'json',
  //     //dataオプションでリクエストに値を含める
  //     data: {id: last_message_id}
  //   })
  // })

  function reloadMessages() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.main-chat__message--list--article').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
    })
    .fail(function() {
      alert('error');
    })
  }
  
});