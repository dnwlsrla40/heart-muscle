function sign_in() {
    let userid = $("#input-username").val()
    let password = $("#input-password").val()

    if (userid == "" && password == "") {
        $("#help-id-login").text("아이디를 입력해주세요.")
        $("#help-password-login").text("비밀번호를 입력해주세요.")
        $("#input-username").focus()
        return;
    } else if (userid != "" && password == "") {
        $("#help-id-login").text("")
        $("#help-password-login").text("비밀번호를 입력해주세요.")
        $("#input-password").focus()
        return;
    } else if (password != "" && userid == "") {
        $("#help-password-login").text("")
        $("#help-id-login").text("아이디를 입력해주세요.")
        $("#input-username").focus()
        return;
    } else {
        $("#help-password-login").text("")
        $("#help-id-login").text("")
    }
    $.ajax({
        type: "POST",
        url: "/login/sign_in",
        data: {
            userid_give: userid,
            password_give: password
        },
        success: function (response) {
            if (response['result'] == 'success') {
                $.cookie('mytoken', response['token'], {path: '/'});
<<<<<<< HEAD
                window.location.replace("/posting/list")
                alert('로그인 성공!')
=======
                window.location.replace("/main")
>>>>>>> a16b439ae3c87e259b5cc444b9cb29f5db74a67c
            } else {
                alert(response['msg'])
            }
        }
    });
}

function sign_up() {
    let userid = $("#input-username").val()
    let password = $("#input-password").val()
    let password2 = $("#input-password2").val()
    console.log(userid, password, password2)


    if ($("#help-id").hasClass("is-danger")) {
        alert("아이디를 다시 확인해주세요.")
        return;
    } else if (!$("#help-id").hasClass("is-success")) {
        alert("아이디 중복확인을 해주세요.")
        return;
    }

    if (password == "") {
        $("#help-password").text("비밀번호를 입력해주세요.").removeClass("is-safe").addClass("is-danger")
        $("#input-password").focus()
        return;
    } else if (!is_password(password)) {
        $("#help-password").text("비밀번호의 형식을 확인해주세요. 영문과 숫자 필수 포함, 특수문자(!@#$%^&*) 사용가능 8-20자").removeClass("is-safe").addClass("is-danger")
        $("#input-password").focus()
        return
    } else {
        $("#help-password").text("사용할 수 있는 비밀번호입니다.").removeClass("is-danger").addClass("is-success")
    }
    if (password2 == "") {
        $("#help-password2").text("비밀번호를 입력해주세요.").removeClass("is-safe").addClass("is-danger")
        $("#input-password2").focus()
        return;
    } else if (password2 != password) {
        $("#help-password2").text("비밀번호가 일치하지 않습니다.").removeClass("is-safe").addClass("is-danger")
        $("#input-password2").focus()
        return;
    } else {
        $("#help-password2").text("비밀번호가 일치합니다.").removeClass("is-danger").addClass("is-success")
    }
    $.ajax({
        type: "POST",
        url: "/login/sign_up",
        data: {
            userid_give: userid,
            password_give: password
        },
        success: function (response) {
            alert("회원가입을 축하드립니다!")
            window.location.replace("/login")
        }
    });

}

function toggle_sign_up() {
    $('#sign-up-box').toggleClass("is-hidden")
    $('#div-sign-in-or-up').toggleClass("is-hidden")
    $('#btn-check-dup').toggleClass("is-hidden")
    $('#help-id').toggleClass("is-hidden")
    $('#help-password').toggleClass("is-hidden")
    $('#help-password2').toggleClass("is-hidden")
}

function is_nickname(asValue) {
    var regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/;
    return regExp.test(asValue);
}

function is_password(asValue) {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
    return regExp.test(asValue);
}

function check_dup() {
    let userid = $("#input-username").val()
    console.log(userid)
    if (userid == "") {
        $("#help-id").text("아이디를 입력해주세요.").removeClass("is-safe").addClass("is-danger")
        $("#input-username").focus()
        return;
    }
    if (!is_nickname(userid)) {
        $("#help-id").text("아이디의 형식을 확인해주세요. 영문과 숫자, 일부 특수문자(._-) 사용 가능. 2-10자 길이").removeClass("is-safe").addClass("is-danger")
        $("#input-username").focus()
        return;
    }
    $("#help-id").addClass("is-loading")
    $.ajax({
        type: "POST",
        url: "/sign_up/check_dup",
        data: {
            userid_give: userid
        },
        success: function (response) {

            if (response["exists"]) {
                $("#help-id").text("이미 존재하는 아이디입니다.").removeClass("is-safe").addClass("is-danger")
                $("#input-username").focus()
            } else {
                $("#help-id").text("사용할 수 있는 아이디입니다.").removeClass("is-danger").addClass("is-success")
            }
            $("#help-id").removeClass("is-loading")

        }
    });
<<<<<<< HEAD
}
=======
}
>>>>>>> a16b439ae3c87e259b5cc444b9cb29f5db74a67c
