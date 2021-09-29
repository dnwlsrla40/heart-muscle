function writeDiary() {
    let writer = $('#writer').val();
    let title = $('#title').val();
    let content = $('#content').val();

    $.ajax({
        type: "POST",
        url: "/api/board",
        dataType: "json",
        data: {writer_give: writer, title_give: title, content_give: content},
        success: function (response) {
            alert(response["msg"]);
            window.location.reload();
        }
    })
}
