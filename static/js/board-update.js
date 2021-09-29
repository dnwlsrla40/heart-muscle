
    $(document).ready(function () {
        diary_data();
    });

    function diary_update() {
        let board = $('#update_text').val()
        let title = $('#update_title').val()

        $.ajax({
            type: "POST",
            url: "/api/board/board",
            data: {update_content: board, update_title: title},
            success: function (response) {
                alert(response['msg']);
                window.location.reload()
            }
        })
    }

    function diary_data() {

    }