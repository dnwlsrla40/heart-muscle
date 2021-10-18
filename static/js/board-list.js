$(document).ready(function () {
     get_board_list();
});

function toggle_like(board_id, type) {
    console.log(board_id, type)
    let $a_like = $(`#${board_id} a[aria-label='heart']`)
    let $i_like = $a_like.find("i")
    if ($i_like.hasClass("fas")) {
        $.ajax({
            type: "POST",
            url: "/update_like",
            data: {
                board_id_give: board_id,
                type_give: type,
                action_give: "unlike"
            },
            success: function (response) {
                console.log("unlike")
                $i_like.addClass("far").removeClass("fas")
                $a_like.find("span.like-num").text(num2str(response["count"]))
            }
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/update_like",
            data: {
                board_id_give: board_id,
                type_give: type,
                action_give: "like"
            },
            success: function (response) {
                console.log("like")
                $i_like.addClass("fas").removeClass("far")
                $a_like.find("span.like-num").text(num2str(response["count"]))
            }
        })

    }
}


function get_board_list() {
    // if (userid==undefined) {
    //     userid=""
    // }
    // $("#post-box").empty()
    $.ajax({
        type: "GET",
        url: `/get-posts`,
        data: {},
        success: function (response) {
            if (response["result"] == "success") {
                let boards = response["boards"]
                console.log(boards)
                for (let i = 0; i < boards.length; i++) {
                    let board = boards[i]
                    let created_at = boards[i]['created_at']
                    let idx = boards[i]['idx']
                    console.log(typeof(idx))
                    let userid = boards[i]['userid']
                    let title = boards[i]['title']
                    let views = boards[i]['views']
                    let _id = boards[i]['_id']
                    console.log(board["heart_by_me"])
                    // let class_heart = board['heart_by_me'] ? "fas" : "far"
                    let class_heart = ""
                    if (board["heart_by_me"]) {
                        class_heart = "fas"
                    } else {
                        class_heart = "far"
                    }
                    let count_heart = board['count_heart']
                    let temp_html = `<tr id="${board["_id"]}">
                                         <th scope="row">${idx}</th>
                                         <td>${created_at}</td>
                                         <td onclick="updateViews('${idx}');showDetail('${idx}');"><button class="button is-ghost">${userid}</button></td>
                                         <td>${title}</td>
                                         <td class="container">
                                             <nav class="level is-mobile">
                                                <div class="level-left">
                                                    <a class="level-item is-sparta" aria-label="heart" onclick="toggle_like('${board['_id']}', 'heart')">
                                                        <span class="icon is-small"><i class="${class_heart} fa-thumbs-up"
                                                                                       aria-hidden="true"></i></span>&nbsp;<span class="like-num">${num2str(count_heart)}</span>
                                                    </a>
                                                </div>
                                            </nav>
                                         </td>
                                         <td>${views}</td>
                                      </tr>`
                $('#post_table').append(temp_html)
                }
            }
        }
    })
}


function showDetail(idx) {
    console.log(idx)
    window.location.href='/board-detail?idx='+idx
}

function updateViews(idx) {
    $.ajax({
        type: 'POST',
        url: '/api/views',
        data: {idx_give: idx},
        success: function (response) {
        }
    });
}


function num2str(count) {
    if (count > 10000) {
        return parseInt(count / 1000) + "k"
    }
    if (count > 500) {
        return parseInt(count / 100) / 10 + "k"
    }
    if (count == 0) {
        return ""
    }
    return count
}
