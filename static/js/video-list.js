$(document).ready(function () {
    getSuggestionVideos()
});

function getSuggestionVideos() {
    let data = localStorage.getItem("info")

    $.ajax({
        type: 'GET',
        url: `/api/videos/suggestion?data=`+data,
        data: {},
        success: function (response) {
            console.log(response)
            response.forEach(function (video) {
                makeSuggestionVideo(video)
            })
        }
    })
}

function makeSuggestionVideo(video) {
    let temp_html = `<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 service-container" onclick="getVideoDetail('${video['video_id']}')">
                        <div class="service-block outline mb30 pinside20">
                            <div class="thumbnail-block">
                                <img class="card-img-top thumbnail-img" src=${video['thumbnail']} alt="영상 썸네일"> 
                            </div>
                            <div class="service-content">
                                <h2 class="service-title"><a class="title">${video['title']}</a>
                                </h2>
                            </div>
                        </div>
                    </div>`

    $('#video-box').append(temp_html)
}

function getVideoDetail(video_id) {
    console.log(video_id)

    let temp_html = `<div id="youtube-box">
                        <iframe src="https://www.youtube.com/embed/${video_id}" width="700" height=400" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                     </div>`

    $('#youtube-box').empty()
    $('#video-content').prepend(temp_html)
    $('html').scrollTop(0)
}