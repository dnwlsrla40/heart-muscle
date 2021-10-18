$(document).ready(function () {
    posting_list();
    login_check();
});

function login_check(){
    let check_cookie = document.cookie
    if (check_cookie == '') {
        alert("로그인 후 이용해 주세요!")
        history.pushState(null, null, '/push')
        window.location.href="/login"
    }
}

function toggle_like(post_idx, type) {
                console.log(post_idx, type)
                let $a_like = $(`#${post_idx} a[aria-label='heart']`)
                let $i_like = $a_like.find("i")
                if ($i_like.hasClass("fa-heart")) {
                    $.ajax({
                        type: "POST",
                        url: "/posting/update/like",
                        data: {
                            post_idx_give: post_idx,
                            type_give: type,
                            action_give: "unlike"
                        },
                        success: function (response) {
                            console.log("unlike")
                            $i_like.addClass("fa-heart-o").removeClass("fa-heart")
                            $a_like.find("span.like-num").text(response["count"])
                        }
                    })
                } else {
                    $.ajax({
                        type: "POST",
                        url: "/posting/update/like",
                        data: {
                            post_idx_give: post_idx,
                            type_give: type,
                            action_give: "like"
                        },
                        success: function (response) {
                            console.log("like")
                            $i_like.addClass("fa-heart").removeClass("fa-heart-o")
                            $a_like.find("span.like-num").text(response["count"])
                        }
                    })

                }
            }

function posting_list() {
    $.ajax({
        type: "GET",
        url: "/api/posting/list",
        data: {},
        success: function (response) {
            let posts = response[0]
            let images = response[1]
            console.log(response)

            for (let i = 0; i < posts.length; i++) {
                let title = posts[i]['title']
                let image = images[i]['image_url']
                let post_idx = images[i]['idx']
                console.log(post_idx)
                let time_post = new Date(posts[i]["created_at"])
                let time_before = time2str(time_post)
                let post = posts[i]
                console.log(post["heart_by_me"])
                let class_heart = ""
                if (post["heart_by_me"]) {
                    class_heart = "fa-heart"
                } else {
                    class_heart = "fa-heart-o"
                }
                let count_heart = posts[i]['count_heart']
                console.log(count_heart)

                let temp_html = `
                                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" id="${post_idx}">
                                    <div class="post-block mb30">
                                       <div class="post-img">
                                            <a onclick="get_post('${post_idx}')" class="imghover"><img src="${image}" class="img-responsive" alt="Fitness Website Template"></a>
                                        </div>
                                        <div class="post-header">
                                            <!-- 좋아요/프로필 -->
                                            <div class="post-title">
                                                <h3><a onclick="get_post('${post_idx}')" class="text-white">${title}</a></h3>
                                                </h5>
                                            </div>
                                            <div class="post-meta"><span class="meta-date"><i class="fas fa-history"></i>${time_before}</span></div>
                                            <nav class="level is-mobile">
                                                <div class="level-left">
                                                    <a class="level-item is-sparta" aria-label="heart" onclick="toggle_like('${post_idx}', 'heart')">
                                                        <span class="icon is-small"><i class="fa ${class_heart}" aria-hidden="true" ></i></span>&nbsp;<span
                                                            class="like-num">${count_heart}</span>
                                                    </a>
                                                </div>
                                            </nav>
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