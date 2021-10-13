$(document).ready(function () {
    posting_detail();
});

function posting_detail() {
    var search = location.search
    console.log("search: ", search)
    var params = new URLSearchParams(search);
    console.log("params: ", params)
    var getType = params.get('idx');
    console.log("getType: ", getType)

    $.ajax({
        type: "GET",
        url: "/api/posting/detail",
        data: {idx_give: getType},
        success: function (response) {
            console.log(response)

            let title = response[0]['title']
            let content = response[0]['content']

            let workout_01 = response[0]['workout_01']
            let min_01 = response[0]['min_01']
            let time_01 = response[0]['time_01']

            let workout_02 = response[0]['workout_02']
            let min_02 = response[0]['min_02']
            let time_02 = response[0]['time_02']

            let workout_03 = response[0]['workout_03']
            let min_03 = response[0]['min_03']
            let time_03 = response[0]['time_03']

            let breakfast = response[0]['breakfast']
            let lunch = response[0]['lunch']
            let dinner = response[0]['dinner']

            let image = response[1]

            let temp_html = `
                                <div class="row">
                                <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                    <div class="content-area">
                                        <div class="row">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="post-holder">
                                                    <!-- 사진 -->
                                                    <div class="post-block">
                                                        <div class="post-img mb40">
                                                            <img src="${image}"
                                                                 alt="Fitness Website Template">
                                                        </div>
                                                    </div>
                                                    <!-- 제목/내용 -->
                                                    <div class="post-content mb40">
                                                    <div class="post-header">

                                                            <!-- 추후 타이틀 추가 내용
                                                            <div class="post-title">
                                                                <h1 class="text-white"></h1>
                                                            </div>
                                                            <div class="post-meta"><span class="meta-date"><i
                                                                    class="icon-primary icon-1x icon-calendar"></i>30 november, 2017</span>
                                                                <span class="meta-author"><i class="icon-user icon-primary icon-1x"></i><a
                                                                        href="#" class="text-white"> Admin</a></span><span
                                                                        class="meta-comment"><i
                                                                        class="icon-speech-bubble-12 icon-primary icon-1x"></i>08 <a
                                                                        href="#" class="text-white">Comments</a> </span></div>-->
                                                        </div>
                                                        <h1 class="">${title}</h1>
                                                        <p>${content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- 운동/식단 -->
                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                    <div class="sidebar-area">
                                        <div class="row">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="widget widget-recent-post">
                                                    <h2 class="widget-title">WORKOUT</h2>
                                                    <div class="row">
                                                        <div class="col-lg-12 col-md-12 col-sm-6 col-xs-12 mb40">                                                                
                                                                <div class="recent-block">
                                                                    <div class="recent-content mb30">
                                                                        <!-- recent block -->
                                                                        <h3 class="recent-title"><a href="#" class="title">${workout_01}</a>
                                                                        </h3>
                                                                        <div class="post-meta"><span class="meta-date"><i
                                                                                class="icon-primary icon-1x icon-calendar"></i>${min_01} / ${time_01}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div class="recent-content mb30">
                                                                        <!-- recent block -->
                                                                        <h3 class="recent-title"><a href="#" class="title">${workout_02}</a></h3>
                                                                        <div class="post-meta"><span class="meta-date"><i
                                                                                class="icon-primary icon-1x icon-calendar"></i>${min_02} / ${time_02}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="recent-content mb30">
                                                                        <!-- recent block -->
                                                                        <h3 class="recent-title"><a href="#" class="title">${workout_03}</a>
                                                                        </h3>
                                                                        <div class="post-meta"><span class="meta-date"><i
                                                                                class="icon-primary icon-1x icon-calendar"></i>${min_03} / ${time_03}</span>
                                                                        </div>
                                                                </div>
                                                                <!-- /.recent block -->
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- 식단 -->
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="widget widget-recent-post">
                                                    <h2 class="widget-title">What i eat</h2>
                                                    <div class="row">
                                                        <div class="col-lg-12 col-md-12 col-sm-6 col-xs-12 mb40">
                                                            <div class="recent-block">
                                                                <div class="recent-content mb30">                                                                   
                                                                    <!-- recent block -->
                                                                    <h3 class="recent-title"><a href="#" class="title">Breakfast</a></h3>
                                                                    <div class="post-meta"><span class="meta-date"><i
                                                                            class="icon-primary icon-1x icon-calendar"></i>${breakfast}</span>
                                                                    </div>
                                                                </div>
                                                                <div class="recent-content mb30">
                                                                    <!-- recent block -->
                                                                    <h3 class="recent-title"><a href="#" class="title">lunch</a></h3>
                                                                    <div class="post-meta"><span class="meta-date"><i
                                                                            class="icon-primary icon-1x icon-calendar"></i>${lunch}</span>
                                                                    </div>
                                                                </div>
                                                                <div class="recent-content mb30">
                                                                    <!-- recent block -->
                                                                    <h3 class="recent-title"><a href="#" class="title">dinner</a>
                                                                    </h3>
                                                                    <div class="post-meta"><span class="meta-date"><i
                                                                            class="icon-primary icon-1x icon-calendar"></i>${dinner}</span>
                                                                    </div>
                                                                </div>
                                                                <!-- /.recent block -->
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>`
            $('#posting').append(temp_html)

        }
    })
}