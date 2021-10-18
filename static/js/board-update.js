// URL파라미터에서 데이터 추출
$(document).ready(function () {
    url_data();
});

function url_data() {
    let search = location.search
    console.log("search: ", search)
    let params = new URLSearchParams(search);
    console.log("params: ", params)
    let getType = params.get('idx');
    console.log("getType: ", getType)

    $.ajax({
        type: "GET",
        url: "/api/board-update",
        data: {idx_give: getType},
        success: function (response) {
            console.log(response)
            let boards = response['content_data']
            console.log(boards)
            let title = boards['title']
            let userid = boards['userid']
            let content = boards['content']
            let idx = boards['idx']
            console.log(idx)


            let temp_html = `<div class="input-group mb-3">
                                <div class="input-group-prepend common">
                                    <span class="badge badge-primary" id="badge-primary">작성자</span>
                                    <div class="data">${userid}</div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="hidden" name="idx" value="${content}"/>
                                <div class="input-group-prepend common">
                                    <span class="badge badge-primary" id="badge-primary">제목</span>
                                    <input class="form-control" type="text" id="title" name="update_title" value="${title}"/>
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
                                <button onclick="window.location.href='/board-list'" type="button" class="btn btn-outline-danger"><i class="fas fa-list"></i></button>
                                <button onclick="update_board(event, '${idx}')" type="button" class="btn btn-outline-danger"><i class="fas fa-save fa-lg"></i></button>
                                <button onclick="delete_board(('${idx}'))" type="button" class="btn btn-outline-danger"><i class="fas fa-trash fa-lg"></i></button>
                            </div>`
            $('#form-box').append(temp_html)

        }
    })
}

function delete_board(idx) {
    // let title = $('#title').val()
    $.ajax({
        type: "POST",
        url: "api/delete",
        data: {idx_give: idx},
        success: function (response) {
            alert(response['msg']);
            window.location.href = "/board-list"
        }
    })
}

function update_board(event, idx) {
    event.preventDefault()
    let update_content = $('#update_content').val()
    let update_title = $('#title').val()
    console.log(idx + '첫 컨텐츠 내용')
    console.log(update_content + '바뀐 컨텐츠 내용')
    console.log(update_title + '바뀐 타이틀')
    // window.location.href="/board-list"
    $.ajax({
        type: "POST",
        url: "/api/board-update",
        data: {title_give: update_title, update_content_give: update_content, idx_give: idx},
        success: function (response) {
            alert(response['msg']);
            window.location.href = '/board-list'
        }
    })
}

