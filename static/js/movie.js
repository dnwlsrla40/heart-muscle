// $(document).ready( function () {
//   search();
// });
//
// function search(){
//     let part = $('#part').val()
//     let query = "홈트 "+part+" 운동"
//     console.log(query)
//     $.ajax({
//         type: "GET",
//         url: "/api/movies?q=" + query,
//         data: {},
//         success: function (res) {
//             console.log(res)
//             for (let i = 0; i < res["items"].length; i++) {
//                 let thumbnail = res["items"][i]["snippet"]["thumbnails"]["default"]["url"]
//                 let title = res["items"][i]["snippet"]["title"]
//                 let id = res["items"][i]["id"]["videoId"]
//                 let temp_html = `<div class="card" onclick="getVideoDetail('${id}')">
//                                       <img class="card-img-top" src=${thumbnail} alt="Card image cap">
//                                       <div class="card-body" id="card-body">
//                                         <h5 class="card-title" id="card-title">${title}</h5>
// <!--                                        <input type="hidden" id="videoId" name="game_token" value=${id}>-->
//                                       </div>
//                                   </div>`
//                 $('#card-box').append(temp_html)
//             }
//         }
//     })
// }
//
// function getVideoDetail(videoId) {
//     window.location.href="/movie-detail?videoId="+videoId
//     // let videoId = $("#videoId").val()
//     // $.ajax({
//     //     type: 'POST',
//     //     url: '/api/movie/detail',
//     //     data: {
//     //         "videoId": videoId
//     //     },
//     //     success: function (res) {
//     //         console.log("getVideoDetail():" + res)
//     //     }
//     // })
// }