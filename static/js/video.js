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
            if(category == "home-training"){
                makeLvDiv()
            } else if(category == "weight") {
                makePartDiv()
            } else if(category == "yoga-pilates") {
                makeClassDiv()
            } else if(category == "stretching") {
                makeExerDiv()
            }
            // makeTagButton()
            response.forEach(function (video) {
                makeCategoryVideo(video)
            })
        }
    })
})

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

function makePartDiv() {
    let temp_html = `<div id="back">
                        <h2>등</h2>
                        <hr>
                    </div>
                    <div id="chest">
                        <h2>가슴</h2>
                        <hr>
                    </div>
                    <div id="shoulder">
                        <h2>어깨</h2>
                        <hr>
                    </div>
                    <div id="arm">
                        <h2>팔</h2>
                        <hr>
                    </div>
                    <div id="abs">
                        <h2>복근</h2>
                        <hr>
                    </div>
                    <div id="legs">
                        <h2>다리</h2>
                        <hr>
                    </div>`
    $('#video-box').append(temp_html)
}

function makeClassDiv() {
    let temp_html = `<div id="easy">
                        <h2>초급</h2>
                        <hr>
                    </div>
                    <div id="normal">
                        <h2>중급</h2>
                        <hr>
                    </div>
                    <div id="advanced">
                        <h2>고급</h2>
                        <hr>
                    </div>`
    $('#video-box').append(temp_html)
}

function makeExerDiv() {
    let temp_html = `<div id="neck">
                        <h2>목</h2>
                        <hr>
                    </div>
                    <div id="waist">
                        <h2>허리</h2>
                        <hr>
                    </div>
                    <div id="eyes">
                        <h2>눈</h2>
                        <hr>
                    </div>
                    <div id="wrist">
                        <h2>손목, 발목</h2>
                        <hr>
                    </div>
                    <div id="body">
                        <h2>전신</h2>
                        <hr>
                    </div>`
    $('#video-box').append(temp_html)
}

function makeCategoryVideo(video) {
    let category_detail = video['category_detail']
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
    $('#' + category_detail).append(temp_html)
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