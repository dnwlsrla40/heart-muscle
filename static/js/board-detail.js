$(document).ready(function () {
    test()
});

function test() {
    var search = location.search
    console.log("search: ", search)
    var params = new URLSearchParams(search);
    console.log("params: ", params)
    var getType = params.get('diary');
    console.log("getType: ", getType)

    $.ajax({
        type: "GET",
        url: "/updatepage",
        data: {diary_give: getType},
        success: function (response) {
            let title = response['title']
            let name = response['name']
            let diary = response['diary']

            let temp_html = `<form name="update" action="/updatepage" method="post">
                                <input type="hidden" name="idx" value=""/>
                                제목 : <input type="text" id="title" name="update_title" value="${title}"/></br>
                                작성자 : <br/>${name}<br/>
                                =============================================<br/>
                                <textarea rows="10" cols="50" name="update_text">${diary}</textarea>
                                <div>
                                    <input type=submit value="수정">
                                    <input type=button value="목록" onclick="location.href='index.html'"/>
                                </div>
                            </form>`

            $('#form-box').append(temp_html)
        }
    })
}


$(function () {
    show_detail_page();
});

function show_detail_page() {
    let post_id = $()
    $.ajax({
        type: "GET",
        url: "/api/board/post",
        data: {},
        success: function (response) {
            let logs = response['one_log'];
            console.log(response)

            let created_at = logs['created_at']
            let writer = logs['writer']
            let title = logs['title']
            let content = logs['content']

            let temp_html = `<div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="badge badge-primary">이름</span>
                                                ${writer}
                                            </div>
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="badge badge-primary">제목</span>
                                                ${title}
                                            </div>
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="badge badge-primary">작성일</span>
                                                ${created_at}
                                            </div>
                                        </div>
                                     </div>

                                    <form class="was-valicreated_atd">
                                        <div class="mb-3">
                                            <label for="validationTextarea"><span class="badge badge-primary">내용</span></label>
                                            <textarea readonly rows="10" class="form-control is-invalid" id="validationTextarea" placeholder="내용"
                                                      required>${content}</textarea>
                                            <div class="invalid-feedback">

                                            </div>
                                        </div>
                                    </form>`
            $('#read-box').append(temp_html)
        }

    })
}