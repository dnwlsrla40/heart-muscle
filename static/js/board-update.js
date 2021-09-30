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


                    let temp_html = `<form name="update" action="/api/board-update" method="post">
                                            <input type="hidden" name="idx" value="${content}"/>
                                            제목 : <input type="text" id="title" name="update_title" value="${title}"/></br>
                                            작성자 : <br/>${writer}<br/>
                                        =============================================<br/>
                                            <textarea rows="10" cols="50" name="update_content" id="update_content">${content}</textarea>
                                            <div>
                                                <input type=submit value="수정" onclick="go_list_page(event, '${content}')">
                                                <input type=button value="삭제" onclick="delete_board()"/>
                                            </div>
                                             </form>`

                    $('#form-box'). append(temp_html)
               
             }
        })
    }

    function delete_board(){
        let title = $('#title').val()
        $.ajax({
            type: "POST",
            url: "api/delete",
            data: {title_give: title},
            success: function (response){
                alert(response['msg']);
                window.location.href="/board-list"
            }
        })
    }

    function go_list_page(event, content){
        event.preventDefault()
        let update_content = $('#update_content').val()
        let update_title = $('#title').val()
        console.log(content +'첫 컨텐츠 내용')
        console.log(update_content + '바뀐 컨텐츠 내용')
        console.log(update_title + '바뀐 타이틀')
        // window.location.href="/board-list"
        $.ajax({
            type:"POST",
            url:"/api/board-update",
            data: {title_give: update_title, update_content_give: update_content, content_give: content},
            success: function (response){
                alert(response['msg']);
                window.location.href='/board-list'
            }
        })
    }

