$(document).ready(function () {
    posting_list();
});

function posting_list() {
    $.ajax({
        type: "GET",
        url: "/api/posting/list",
        data: {},
        success: function (response) {
            console.log(response)

            // let title = response[0][0]['title']
            // let image = response[1][0]['image_url']
            //
            // console.log(title,image)

            for (let i = 0; i < response[1].length; i++) {
                let title = response[0][i]['title']
                let image = response[1][i]['image_url']
                let idx = response[1][i]['idx']
                console.log(idx)

                let temp_html = `
                                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                    <div class="post-block mb30">
                                        <div class="post-img">
                                            <a onclick="get_post('${idx}')" class="imghover"><img src="${image}" class="img-responsive" alt="Fitness Website Template"></a>
                                        </div>
                                        <div class="post-header">
                                            <div class="post-title">
                                                <h3><a onclick="get_post('${idx}')" class="text-white">${title}</a></h3>
                                                <h5><a class="image is-64x64" href="#">
                                                    <img class="is-rounded" src="../static/images/post.pin.png"
                                                         alt="Image">
                                                </a>유저아이디
                                                </h5>
                                            </div>
                                            <div class="post-meta"> <span class="meta-date"><i class="icon-primary icon-1x icon-calendar"></i>30 november, 2017</span></div>
                                        </div>
                                    </div>
                                </div>
                    `
                $('#post').append(temp_html)
            }
        }
    })
}

function get_post(idx) {
    console.log(idx);
    window.location.href = '/posting/detail?idx=' + idx
}