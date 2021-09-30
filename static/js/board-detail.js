$(function () {
    show_board_detail();
});

function show_board_detail() {
    var search = location.search
    console.log("search: ", search)
    var params = new URLSearchParams(search);
    console.log("params: ", params)
    var getType = params.get('content');
    console.log("getType: ", getType)
    $.ajax({
        type: "GET",
        url: "/api/board/post",
        data: {content_give: getType},
        success: function (response) {
            console.log(response)
            let title = response['title']
            let writer = response['writer']
            let content = response['content']

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
                                        <button class="btn btn-outline-danger" onclick="show_update(event, '${content}')">수정</button>
                                        <button type="button" class="btn btn-outline-danger">목록</button>
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