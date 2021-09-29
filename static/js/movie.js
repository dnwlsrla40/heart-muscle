function search1(){
    let query = $('#query').val()
    $.ajax({
        type: "GET",
        url: "/movies?q=" + query,
        data: {},
        success: function (res) {
            console.log(res)
            for (let i = 0; i < res["items"].length; i++) {
                let thumbnail = res["items"][i]["snippet"]["thumbnails"]["default"]["url"]
                let title = res["items"][i]["snippet"]["title"]
                let desc = res["items"][i]["snippet"]["description"]
                let id = res["items"][i]["id"]["videoId"]
                let temp_html = `<div class="card" onclick="getVideoDetail()">
                                      <img class="card-img-top" src=${thumbnail} alt="Card image cap">
                                      <div class="card-body">
                                        <h5 class="card-title" id="card-title">${title}</h5>
                                        <p class="card-text">${desc}</p>
                                        <input type="hidden" id="videoId" name="game_token" value=${id}>
                                      </div>
                                  </div>`
                $('#card-box').append(temp_html)
            }
        }
    })
}

function getVideoDetail() {
    alert("hello")
    let videoId = $("#videoId").val()
    $.ajax({
        type: 'POST',
        url: 'movie-detail',
        data: {
            "videoId": videoId
        },
        success: function (res) {
            console.log("getVideoDetail():" + res)
        }
    })
}