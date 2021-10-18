<!-- 포스팅저장 -->
function posting() {
    let title = $('#titleInput').val();
    let content = $('#contentInput').val();

    let workout_01 = $('#workout01 option:selected').val();
    let min_01 = $('#min01 option:selected').val();
    let time_01 = $('#times01 option:selected').val();

    let workout_02 = $('#workout02 option:selected').val();
    let min_02 = $('#min02 option:selected').val();
    let time_02 = $('#times02 option:selected').val();

    let workout_03 = $('#workout03 option:selected').val();
    let min_03 = $('#min03 option:selected').val();
    let time_03 = $('#times03 option:selected').val();

    let breakfast = $('#breakfastInput').val();
    let lunch = $('#lunchInput').val();
    let dinner = $('#dinnerInput').val();

    let image = $('#imageInput').val();


    $.ajax({
        type: "POST",
        url: "/api/posting",
        data: {
            title_give: title,
            content_give: content,
            workout_give_01: workout_01,
            min_give_01: min_01,
            time_give_01: time_01,
            workout_give_02: workout_02,
            min_give_02: min_02,
            time_give_02: time_02,
            workout_give_03: workout_03,
            min_give_03: min_03,
            time_give_03: time_03,
            breakfast_give: breakfast,
            lunch_give: lunch,
            dinner_give: dinner,
            image_give: image
        },
        success: function (response) {
            alert(response["msg"]);
            window.location.href = '/posting/list'
        }
    })
}

<!-- 사진 업로드 -->
function save() {
    var form_data = new FormData($('#upload-file')[0]);
    $.ajax({
        type: 'POST',
        url: '/fileupload',
        data: form_data,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data)
            alert("파일이 업로드 되었습니다!!");
        },
    });
}