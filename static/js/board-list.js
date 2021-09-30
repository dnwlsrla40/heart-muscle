$(function () {
    showLog();
});

function showLog() {
    $.ajax({
        type: "GET",
        url: "/api/board",
        data: {},
        success: function (response) {
            let logs = response['all_logs'];
            for (let i = 0; i < logs.length; i++) {
                let created_at = logs[i]['created_at']
                let writer = logs[i]['writer']
                let title = logs[i]['title']
                let content = logs[i]['content']
                let like = logs[i]['like']

                let temp_html = `<tr onclick="show_detail('${content}')">
                                     <th scope="row">${i + 1}</th>
                                     <td>${created_at}</td>
                                     <td>${writer}</td>
                                     <td>${title}</td>
                                      <td>${content}<a></td>
                                      <td>
                                          <a href="#" target="_blank" class="star-writer title is-4">좋아요: ${like}</a>
                                          <a href="#" onclick="likeStar('${writer}')" class="card-footer-item has-text-info"><span class="icon"><i class="fas fa-thumbs-up"></i></span></a>
                                      </td>
                                  </tr>`
                $('#log_table').append(temp_html)
            }
        }
    })
}

function show_detail(content) {
    console.log(content)
    window.location.href='/board-detail?diary='+content
}

function likeStar(writer) {
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