$(function() {

  // #user-search-result
  // #chat-group-users.js-add-user
  // var name_list = $(".chat-group-form__field--right");←こいつダメ
  // var name_list = $("#chat-group-users");
  var name_list = $("#user-search-result");

  function appendName(user) {
    var html = `
            <div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user.name}</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
            </div>
            `
    console.log(html);
    name_list.append(html);
  };

  function appendErrMsgToHTML(){
    // var html = `<div class="js-add-user" id="chat-group-users">${msg}</div>`
    var html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
               </div>`
    name_list.append(html);
  }

  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    // $(".js-add-user").append(html);
    // これは、下でもいいね
    $("#chat-group-users").append(html);
  }

  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }

  // $('.chat-group-form__input').on("keyup", function(){
  //   var input = $('.chat-group-form__input').val();
  //   #これだと、入力内容が下で出ない
  //   console.log(input);
  // })

  // $('.new_group').on('keyup', function(){
  //   console.log("？");
  //   var input = $('.new_group').val();
  //   #これも、入力内容が下で出ない
  //   console.log(input);
  // });


  $('#user-search-field').on('keyup', function(){
    // inputタグの、idが正解：#user-search-field
    var input = $('#user-search-field').val();
    console.log(input);
    $.ajax({
      type: 'GET',
      // ↓、/users じゃない？:いや、やっぱり"/users"！！
      url: '/users',
      dataType: 'json',
      data: { keyword: input }
    })
    .done(function(users) {
      // console.log("成功です");←途中で利用した
      console.log(users);
      name_list.empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendName(user);
        })
      }
      else {
        appendErrMsgToHTML();
      }
    })
    .fail(function() {
      // console.log("失敗です");←途中で利用した
      alert('ユーザー検索に失敗しました');
    })
  });

  // $("#user-search-result").on('click',".user-searck-add",function(){
  //   console.log("イベント発火成功");
  // });

  $(document).on("click", ".chat-group-user__btn--add", function() {
    // console.log("イベント発火成功");
    console.log
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });

  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this).parent().remove();
  });

});