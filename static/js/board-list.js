$(function () {
    show_list();
});

function show_list() {
    $.ajax({
        type: "GET",
        url: "/api/board-list",
        data: {},
        success: function (response) {
            let logs = response['all_logs'];
            for (let i = 0; i < logs.length; i++) {
                let created_at = logs[i]['created_at']
                let writer = logs[i]['writer']
                let title = logs[i]['title']
                let like = logs[i]['likes']
                let views = logs[i]['views']

                let temp_html = `<tr>
                                     <th scope="row">${i + 1}</th>
                                     <td>${created_at}</td>
                                     <td onclick="update_views('${writer}');show_detail('${writer}');"><button type="button" id="writer-button" class="btn btn-link">${writer}</button></td>
                                     <td>${title}</td>
                                     <td>
                                         <p target="_blank" class="star-writer title is-4">좋아요: ${like}</p>
                                         <a href="#" onclick="like_star('${writer}')" class="card-footer-item has-text-info"><i class="far fa-thumbs-up"></i></a>
                                     </td>
                                     <td>${views}</td>
                                  </tr>`
                $('#log_table').append(temp_html)
            }
        }
    })
}

function show_detail(writer) {
    console.log(writer)
    window.location.href='/board-detail?writer='+writer
}

function update_views(writer) {
    $.ajax({
        type: 'POST',
        url: '/api/view',
        data: {writer_give: writer},
        success: function (response) {
        }
    });
}

function like_star(writer) {
    $.ajax({
        type: 'POST',
        url: '/api/like',
        data: {writer_give: writer},
        success: function (response) {
            alert(response['msg']);
            window.location.reload()
        }
    });
}