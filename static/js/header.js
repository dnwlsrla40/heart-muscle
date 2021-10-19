$(document).ready(function () {
    login_logout();
});

function login_logout() {

    let token = document.cookie;
    console.log(token)

    if(token != ""){
        let temp_html = `<button id="logout" onclick="sign_out()">logout</button>`
        $('#login').append(temp_html)
    } else{
        let temp_html = `<button onclick="href='/login'">login</button>`
        $('#login').append(temp_html)
    }

    // $.ajax({
    //     type: "GET",
    //     url: "/login/logout?status" + status,
    //     data: {},
    //     success: function (response) {
    //         login_id = response
    //         console.log(login_id)
    //         if (response != "") {
    //             let temp_html = `<a title="Style Guide" class="animsition-link">logout</a>`
    //             $('#login').append(temp_html)
    //         }
    //         else {
    //             let temp_html = `<a href="/login" title="Style Guide" class="animsition-link">login</a>`
    //             $('#login').append(temp_html)
    //         }
    //     }
    // })
}

// ('#logout').on("click",function(event){
//     event.preventDefault();
//     console.log("hello")
//     $.removeCookie('mytoken', {path: '/'});
//     alert('정상적으로 로그아웃 되었습니다')
// });


function sign_out() {
    console.log("hello")
    $.removeCookie('mytoken', {path: '/'});
    alert('정상적으로 로그아웃 되었습니다')
    // window.location.href = "/"
}