$(document).ready(function () {
    login_logout();
});

function login_logout() {

    let token = document.cookie;
    console.log(token)

    if(token != ""){
        let temp_html = `<a title="Style Guide" class="animsition-link" id="logout">logout</a>`
        $('#login').append(temp_html)
    } else{
        let temp_html = `<a href="/login" title="Style Guide" class="animsition-link">login</a>`
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