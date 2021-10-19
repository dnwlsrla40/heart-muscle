let q_lv = [];

$('.sidenav > li').on("click", function () {
    let category = $($(this)[0]).attr('value')
    $.ajax({
        type: 'GET',
        url: '/api/videos/category?category=' + category,
        success: function (response) {
            $('#youtube-box').empty()
            // makeSearchButton()
            console.log(response)
            $('#video-box').empty()
            // makeIndex()
            // makeTagButton()
            makeLvDiv()
            response.forEach(function (video) {
                makeCategoryVideo(video)
            })
        }
    })
})

function makeIndex() {
    let temp_html = `<div class="index">
                        <ul>
                            <li><a href="#lv0">Lv0</a></li>
                            <li><a href="#lv1">Lv1</a></li>
                            <li><a href="#lv2">Lv2</a></li>
                            <li><a href="#lv3">Lv3</a></li>
                            <li><a href="#lv4">Lv4</a></li>
                        </ul>
                    </div>`
    $('#video-box').append(temp_html)
}

// function makeTagButton() {
//     let temp_html = `<div class="button-box">
//                         <button type="button" class="btn btn-outline-dark exer-btn">부위1</button>
//                         <button type="button" class="btn btn-outline-dark exer-btn">부위2</button>
//                         <button type="button" class="btn btn-outline-dark exer-btn">부위3</button>
//                         <button type="button" class="btn btn-outline-dark exer-btn">부위4</button>
//                     </div>`
//
//     $('#video-box').append(temp_html)
// }

// function makeSearchButton() {
//     $('.search-box').empty()
//     let temp_html = `<input type="text" class="search-input"
//                            aria-label="Recipient's username" aria-describedby="basic-addon2">
//                     <div class="search-button-box">
//                         <button class="search-button" type="button"><i class="fas fa-search"></i></button>
//                     </div>`
//
//     $('.search-box').prepend(temp_html)
// }

function makeLvDiv() {
    let temp_html = `<div id="lv0">
                        <h2>LV0</h2>
                        <hr>
                    </div>
                    <div id="lv1">
                        <h2>LV1</h2>
                        <hr>
                    </div>
                    <div id="lv2">
                        <h2>LV2</h2>
                        <hr>
                    </div>
                    <div id="lv3">
                        <h2>LV3</h2>
                        <hr>
                    </div>
                    <div id="lv4">
                        <h2>LV4</h2>
                        <hr>
                    </div>`
    $('#video-box').append(temp_html)
}

function makeCategoryVideo(video) {
    let Lv = "lv" + video['division']['Lv']
    let title = ''
    if(video['title'].length > 80){
         title = video['title'].substr(0,40) + "..."
    } else {
        title = video['title']
    }
    let temp_html = `<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 service-container" onclick="getVideoDetail('${video['video_id']}')">
                        <div class="service-block outline mb30 pinside20">
                            <div class="thumbnail-block">
                                <img class="card-img-top thumbnail-img" src=${video['thumbnail']} alt="영상 썸네일"> 
                            </div>
                            <div class="service-content">
                                <h2 class="service-title"><a class="title">${title}</a>
                                </h2>
                            </div>
                        </div>
                    </div>`
    $('#' + Lv).append(temp_html)
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