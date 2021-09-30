$(function () {
    show_board_detail();
});

function show_board_detail() {
    var search = location.search
    console.log("search: ", search)
    var params = new URLSearchParams(search);
    console.log("params: ", params)
    var getType = params.get('writer');
    console.log("getType: ", getType)
    $.ajax({
        type: "GET",
        url: "/api/board/post",
        data: {writer_give: getType},
        success: function (response) {
            console.log(response)
            let title = response['title']
            let writer = response['writer']
            let content = response['content']
            let created_at = response['created_at']

            let temp_html = `<div class="input-group mb-3">
                                    <div class="input-group-prepend common">
                                        <span class="badge badge-primary">제목</span>
                                        <div class="data">${title}</div>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend common">
                                        <span class="badge badge-primary">작성자</span>
                                        <div class="data">${writer}</div>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend common">
                                        <span class="badge badge-primary">작성일</span>
                                        <div class="data">${created_at}</div>
                                    </div>
                                </div>
                             <form class="was-valicreated_atd">
                                <div class="mb-3" common>
                                    <label for="validationTextarea"><span class="badge badge-primary">내용</span></label>
                                    <textarea readonly rows="10" class="form-control is-invalid data" id="validationTextarea" placeholder="내용"
                                              required>${content}</textarea>
                                    <div class="invalid-feedback">
                                    </div>
                                </div>
                                
                                 <div>
                                    <button class="btn btn-outline-danger" onclick="show_update(event, '${content}')"><i class="fas fa-edit"></i></button>
                                    <button onclick="window.location.href='/board-list'" type="button" class="btn btn-outline-danger"><i class="fas fa-list"></i></button>
                                </div>
                            </form>
                                         `
            $('#read-box').append(temp_html)
        }

    })
}

function show_update(event, content){
    event.preventDefault()
    console.log(content)
    window.location.href='/board-update?content='+content
}