let q_question_codes = [];
let q_index = 0;
let q_select_values = [];

$('#find-my-exer').on("click", function () {

    $('.modal').modal({
        keyboard: false
    })

    $.ajax({
        type: 'GET',
        url: '/question',
        data: {},
        success: function (response) {
            console.log(response)
            q_question_codes = response;
            getCode()
        }
    })
})

function getCode() {

    if (!$("#btn-next").is(":visible")) {
        $("#btn-next").show();
    }

    if (q_index > 0) {
        q_select_values.push($("input[name='checkType']:checked").val());
    }

    if (q_index == q_question_codes.length) {
        let data = {};
        q_question_codes.forEach(function (code, idx) {
            data[code] = q_select_values[idx];
            console.log(data)
            localStorage.setItem("info", JSON.stringify(data))
            window.location.href="/video-list"
        });

    } else {
        $.ajax({
        type: 'GET',
        url: `/codes?group=${q_question_codes[q_index]}`,
        data: {},
        success: function (response) {
            $('#select-box').empty()
            console.log(response)
            let temp_html = ''
            console.log(response[0]['group'])
            if (response[0]['group'] == 'experience') {
                temp_html += `<p>운동을 해본 경험이 있을까요?</p>`
            } else if(response[0]['group'] == 'interest'){
                temp_html += `<p>흥미있는 운동이 있나요?</p>`
            }
            $("#select-box").append(temp_html);
            response.forEach(function (code) {
                makeType(code)
            })
            q_index++;
        }
    })
    }
}

function makeType(code) {
    let temp_html = `<div class="form-check">
                      <input class="form-check-input" type="radio" value="${code['code']}" name='checkType'>
                      <label class="form-check-label" for="defaultCheck1">
                        ${code['name']}
                      </label>
                    </div>`
    $("#select-box").append(temp_html)
}

function reset() {
    q_question_codes = [];
    q_index = 0;
    q_select_values = [];
}