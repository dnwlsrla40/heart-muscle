$(".dropdown-item").on("click", function (event) {
    event.preventDefault()
    console.log($(this).text())
    let part = $(this).text()
    $.ajax({
        type: 'POST',
        url: '/movie',
        data: {
            "part": part
        },
        success: function (res) {
            part = res['data']
            console.log(res['data'])
            window.location.href = '/movie?part=' + part
        }
    })
})

$("#whole-body").on("click", function (event) {
    event.preventDefault()
    console.log($(this).text())
    let part = $(this).text()
    $.ajax({
        type: 'POST',
        url: '/movie',
        data: {
            "part": part
        },
        success: function (res) {
            part = res['data']
            console.log(res['data'])
            window.location.href = '/movie?part=' + part
        }
    })
})

function armClick() {
    $('#chest-nav').toggle()
}

function chestClick() {
    $('#stomach-nav').toggle()
}

function stomachClick() {
    $('#leg-nav').toggle()
}

function legClick() {
    $('#body-nav').toggle()
}