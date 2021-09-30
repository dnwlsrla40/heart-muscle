// URL파라미터에서 데이터 추출
$(document).ready(function () {
    url_data();
});

function url_data() {
    var search = location.search
    console.log("search: ", search)
    var params = new URLSearchParams(search);
    console.log("params: ", params)
    var getType = params.get('content');
    console.log("getType: ", getType)

    $.ajax({
        type: "GET",
        url: "/api/board-update",
        data: {content_give: getType},
        success: function (response) {
            let title = response['title']
            let writer = response['writer']
            let content = response['content']


            let temp_html = `<div class="input-group mb-3">
                                <input type="hidden" name="idx" value="${content}"/>
                                <div class="input-group-prepend common">
                                    <span class="badge badge-primary" id="badge-primary">제목</span>
                                    <input class="form-control" type="text" id="title" name="update_title" value="${title}"/>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend common">
                                    <span class="badge badge-primary" id="badge-primary">작성자</span>
                                    <div class="data">${writer}</div>
                                </div>
                            </div>
                             <form class="was-valicreated_atd">
                                <div class="mb-3" common>
                                    <label for="validationTextarea"><span class="badge badge-primary" id="badge-primary">내용</span></label>
                                    <textarea rows="10" class="form-control is-invalid data"  id="update_content" placeholder="내용"
                                              required>${content}</textarea>
                                    <div class="invalid-feedback">
                                    </div>
                                </div>
                            </form>
                            
                            <div>
                                <input class="btn" id="btn" type=submit value="수정" onclick="go_list_page(event, '${content}')">
                                <input class="btn" id="btn" type=button value="삭제" onclick="delete_board()"/>
                            </div>`
            $('#form-box').append(temp_html)

        }
    })
}

function delete_board() {
    let title = $('#title').val()
    $.ajax({
        type: "POST",
        url: "api/delete",
        data: {title_give: title},
        success: function (response) {
            alert(response['msg']);
            window.location.href = "/board-list"
        }
    })
}

function go_list_page(event, content) {
    event.preventDefault()
    let update_content = $('#update_content').val()
    let update_title = $('#title').val()
    console.log(content + '첫 컨텐츠 내용')
    console.log(update_content + '바뀐 컨텐츠 내용')
    console.log(update_title + '바뀐 타이틀')
    // window.location.href="/board-list"
    $.ajax({
        type: "POST",
        url: "/api/board-update",
        data: {title_give: update_title, update_content_give: update_content, content_give: content},
        success: function (response) {
            alert(response['msg']);
            window.location.href = '/board-list'
        }
    })
}

