$(function () {
    update_board();
});

function update_board() {
    let search = location.search
    console.log("search: ", search)
    let params = new URLSearchParams(search);
    console.log("params: ", params)
    let getType = params.get('idx');
    console.log("getType: ", getType)
    $.ajax({
        type: "GET",
        url: "/api/board/post",
        data: {idx_give: getType},
        success: function (response) {
            console.log(response)
            let boards = response['data']
            console.log(boards)
            let title = boards['title']
            let userid = boards['userid']
            let content = boards['content']
            let created_at = boards['created_at']
            let idx = boards['idx']
            console.log(idx)


            let temp_html = `<div class="input-group mb-3">
                                    <div class="input-group-prepend common">
                                        <span class="badge badge-primary">제목</span>
                                        <div class="data">${title}</div>
                                    </div>
                                </div>
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend common">
                                        <span class="badge badge-primary">작성자</span>
                                        <div class="data">${userid}</div>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend common">
                                        <span class="badge badge-primary">작성일</span>
                                        <div class="data">${created_at}</div>
                                    </div>
                                </div>
                                <div class="mb-3" common>
                                  <div class="invalid-feedback"></div>
                                  <label for="validationTextarea"><span class="badge badge-primary">내용</span></label>
                                   <div class="box">
                                    <p>${content}</p>
                                   </div>                        
                                </div>
                                 <div>
                                    <button onclick="window.location.href='/board-list'" type="button" class="btn btn-outline-danger"><i class="fas fa-list"></i></button>
                                    <button class="btn btn-outline-danger" onclick="show_update(event, '${idx}')"><i class="fas fa-edit"></i></button>
                                    <button onclick="delete_board(('${idx}'))" type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                                </div>
                            </form>`
            $('#read-box').append(temp_html)
        }

    })
}

function show_update(event, idx){
    event.preventDefault()
    console.log(idx)
    window.location.href='/board-update?idx='+idx
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