$(document).ready(function () {
    login_check();
});

function login_check(){
    let check_cookie = document.cookie
    if (check_cookie == '') {
        alert("로그인 후 이용해 주세요!")
        history.pushState(null, null, '/push')
        window.location.href="/login"
    }
}

function writeDiary() {
    let title = $('#title').val();
    let content = $('#content').val();

    $.ajax({
        type: "POST",
        url: "/api/post",
        dataType: "json",
        data: {title_give: title, content_give: content},
        success: function (response) {
            alert(response["msg"]);
            window.location.reload();
            window.location.href='/board-list'
        }
    })
}

