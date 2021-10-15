$(document).ready(function () {
    posting_list();
});

function posting_list() {
    $.ajax({
        type: "GET",
        url: "/api/posting/list",
        data: {},
        success: function (response) {
            console.log(response)

            for (let i = 0; i < response[1].length; i++) {
                let title = response[0][i]['title']
                let image = response[1][i]['image_url']
                let idx = response[1][i]['idx']
                let time_post = new Date(response[0][i]["created_at"])
                let time_before = time2str(time_post)
                console.log(time_before)

                let temp_html = `
                                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                    <div class="post-block mb30">
                                       <div class="post-img">
                                            <a onclick="get_post('${idx}')" class="imghover"><img src="${image}" class="img-responsive" alt="Fitness Website Template"></a>
                                        </div>
                                        <div class="post-header">
                                            <!-- 좋아요/프로필 -->
                                            <div class="post-title">
                                                <h3><a onclick="get_post('${idx}')" class="text-white">${title}</a></h3>
<!--                                                <h5><a class="image is-64x64" href="#">-->
<!--                                                    <img class="is-rounded" src="../static/images/post.pin.png"-->
<!--                                                         alt="Image">-->
<!--                                                </a>유저아이디-->
                                                </h5>
                                            </div>
                                            <div class="post-meta"><span class="meta-date"><i class="fas fa-history"></i>${time_before}</span></div>
                                        </div>
                                    </div>
                                </div>
                    `
                $('#post').append(temp_html)
            }
        }
    })
}

function time2str(date) {
    let today = new Date()
    let time = (today - date) / 1000 / 60  // 분

    if (time < 60) {
        return parseInt(time) + "분 전"
    }
    time = time / 60  // 시간
    if (time < 24) {
        return parseInt(time) + "시간 전"
    }
    time = time / 24
    if (time < 7) {
        return parseInt(time) + "일 전"
    }
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

function get_post(idx) {
    console.log(idx);
    window.location.href = '/posting/detail?idx=' + idx
}