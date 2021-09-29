$("#arm-menu a").on("click", function(event) {
    event.preventDefault()
    console.log($(this).text())
    let part = $(this).text()
    $.ajax({
        type: 'POST',
        url: '/movie',
        data: {
            "part": part
        },
        success: function(res){
            window.location.href='/movie'
        }
    })
})