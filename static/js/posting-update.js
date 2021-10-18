$(document).ready(function () {
    posting_update();
});

function posting_update() {
    var search = location.search
    console.log("search: ", search)
    var params = new URLSearchParams(search);
    console.log("params: ", params)
    var getType = params.get('idx');
    console.log("getType: ", getType)

    $.ajax({
        type: "GET",
        url: "/api/posting/update",
        data: {idx_give: getType},
        success: function (response) {
            console.log(response)

            let idx = response[0]['idx']

            let title = response[0]['title']
            let content = response[0]['content']

            let workout_01 = response[0]['workout_01']
            let min_01 = response[0]['min_01']
            let time_01 = response[0]['time_01']

            let workout_02 = response[0]['workout_02']
            let min_02 = response[0]['min_02']
            let time_02 = response[0]['time_02']

            let workout_03 = response[0]['workout_03']
            let min_03 = response[0]['min_03']
            let time_03 = response[0]['time_03']

            let breakfast = response[0]['breakfast']
            let lunch = response[0]['lunch']
            let dinner = response[0]['dinner']

            let image = response[1]


            let temp_html = `<div class="row">
                                <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                    <div class="content-area">
                                        <div class="row">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="post-holder">
                                                    <div class="post-block">
                                                        <div class="post-img mb40">
                                                            <img src="${image}"
                                                                 alt="Fitness Website Template">
                                                        </div>
                                                        
                                                    </div>
                                                    <!-- 제목 입력 박스-->
                                                    <div class="form-group">
                                                        <label for="titleInput">Title</label>
                                                        <input type="email" class="form-control" id="titleInput"
                                                               value="${title}">
                                                    </div>
                                                    <!-- 내용 입력 박스 -->
                                                    <div class="form-group">
                                                        <label for="contentInput">Content</label>
                                                        <textarea class="form-control" id="contentInput" rows="10">${content}</textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                    <div class="sidebar-area">
                                        <div class="row">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="widget widget-recent-post">
                                                    <h2 class="widget-title">WORKOUT</h2>
                                                    <div class="row">
                                                        <div class="col-lg-12 col-md-12 col-sm-6 col-xs-12 mb40">
                                                            <!-- 운동입력폼-->
                                                            <form>
                                                                <label for="workout"></label>
                                                                <div class="container">
                                                                    <select class="workout-select-01" id="workout01">
                                                                        <option selected>${workout_01}</option>
                                                                        <option value="none">-</option>
                                                                        <option value="fitness">Fitness</option>
                                                                        <option value="yoga/pilates">Yoga/Pilates</option>
                                                                        <option value="stretching">Stretching</option>
                                                                    </select>
                                                                    <select class="min-select" id="min01">
                                                                        <option selected>${min_01}</option>
                                                                        <option value="none">-</option>
                                                                        <option value="10">10min</option>
                                                                        <option value="20">20min</option>
                                                                        <option value="30">30min</option>
                                                                        <option value="40">40min</option>
                                                                        <option value="50">50min</option>
                                                                        <option value="60">60min</option>
                                                                    </select>
                                                                    <select class="time-select" id="times01">
                                                                        <option selected>${time_01}</option>
                                                                        <option value="none">-</option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                        <option value="5">5</option>
                                                                    </select>
                                                                </div>
                    
                                                                <!-- 추가 운동칸 -->
                                                                <div class="container">
                                                                    <select class="workout-select-02" id="workout02">
                                                                        <option selected>${workout_02}</option>
                                                                        <option value="none">-</option>
                                                                        <option value="fitness">Fitness</option>
                                                                        <option value="yoga/pilates">Yoga/Pilates</option>
                                                                        <option value="stretching">Stretching</option>
                                                                    </select>
                                                                    <select class="min-select" id="min02">
                                                                        <option selected>${min_02}</option>
                                                                        <option value="none">-</option>
                                                                        <option value="10">10min</option>
                                                                        <option value="20">20min</option>
                                                                        <option value="30">30min</option>
                                                                        <option value="40">40min</option>
                                                                        <option value="50">50min</option>
                                                                        <option value="60">60min</option>
                                                                    </select>
                                                                    <select class="time-select" id="times02">
                                                                        <option selected>${time_02}</option>
                                                                        <option value="none">-</option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                        <option value="5">5</option>
                                                                    </select>
                                                                </div>
                                                                <div class="container">
                                                                    <select class="workout-select-03" id="workout03">
                                                                        <option selected>${workout_03}</option>
                                                                        <option value="none">-</option>
                                                                        <option value="fitness">Fitness</option>
                                                                        <option value="yoga/pilates">Yoga/Pilates</option>
                                                                        <option value="stretching">Stretching</option>
                                                                    </select>
                                                                    <select class="min-select" id="min03">
                                                                        <option selected>${min_03}</option>
                                                                        <option value="none">-</option>
                                                                        <option value="10">10min</option>
                                                                        <option value="20">20min</option>
                                                                        <option value="30">30min</option>
                                                                        <option value="40">40min</option>
                                                                        <option value="50">50min</option>
                                                                        <option value="60">60min</option>
                                                                    </select>
                                                                    <select class="time-select" id="times03">
                                                                        <option selected>${time_03}</option>
                                                                        <option value="none">-</option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                        <option value="5">5</option>
                                                                    </select>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                    
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="widget widget-recent-post">
                                                    <h2 class="widget-title">What i eat</h2>
                                                    <div class="row">
                                                        <div class="col-lg-12 col-md-12 col-sm-6 col-xs-12 mb40">
                                                            <div class="recent-block">
                                                                <div class="recent-content mb30">
                                                                    <!-- 식단 입력 폼 -->
                                                                    <form>
                                                                        <div class="form-group">
                                                                            <label for="breakfastInput">Breakfast</label>
                                                                            <input type="text" class="form-control"
                                                                                   id="breakfastInput" value="${breakfast}">
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <label for="lunchInput">Lunch</label>
                                                                            <input type="text" class="form-control"
                                                                                   id="lunchInput" value="${lunch}">
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <label for="dinnerInput">Dinner</label>
                                                                            <input type="text" class="form-control"
                                                                                   id="dinnerInput" value="${dinner}">
                                                                        </div>
                                                                    </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
                $('#posting_update').append(temp_html)

        }
    })
}

<!-- 포스팅 수정 -->
function posting_db_update() {
    var search = location.search
    console.log("search: ", search)
    var params = new URLSearchParams(search);
    console.log("params: ", params)
    var getType = params.get('idx');
    console.log("getType: ", getType)

    let idx = getType
    console.log(idx)

    let title = $('#titleInput').val();
    let content = $('#contentInput').val();

    let workout_01 = $('#workout01 option:selected').val();
    console.log(workout_01)
    let min_01 = $('#min01 option:selected').val();
    let time_01 = $('#times01 option:selected').val();

    let workout_02 = $('#workout02 option:selected').val();
    let min_02 = $('#min02 option:selected').val();
    let time_02 = $('#times02 option:selected').val();

    let workout_03 = $('#workout03 option:selected').val();
    let min_03 = $('#min03 option:selected').val();
    let time_03 = $('#times03 option:selected').val();

    let breakfast = $('#breakfastInput').val();
    console.log(breakfast)
    let lunch = $('#lunchInput').val();
    let dinner = $('#dinnerInput').val();

    $.ajax({
        type: "POST",
        url: "/api/posting/update",
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
            idx_give: idx
        },
        success: function (response) {
            alert(response["msg"]);
            console.log(response)
            window.location.href = '/posting/detail?idx=' + idx
        }
    })
}