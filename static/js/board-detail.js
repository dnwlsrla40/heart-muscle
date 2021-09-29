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