function search1(){
    alert("hello2")
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
                let temp_html = `<div class="card">
                                      <img class="card-img-top" src=${thumbnail} alt="Card image cap">
                                      <div class="card-body">
                                        <h5 class="card-title">${title}</h5>
                                        <p class="card-text">${desc}</p>
                                      </div>
                                  </div>`
                $('#card-box').append(temp_html)
            }
        }
    })
}

function check(){
    alert("hello")
}