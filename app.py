import requests
import time
from flask import Flask, render_template, jsonify, request, redirect, url_for
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbMuscle


###################### main 관련 def ########################

# main 페이지 라우팅
@app.route('/main', methods=['GET'])
def main():
    return render_template('main.html')

###################### board 관련 def ########################

# board list 화면에 찍어주는 html 라우팅
@app.route('/board-list', methods=['GET'])
def get_board_list_html():
    return render_template('board-list.html')

# board create 화면에 찍어주는 html 라우팅
@app.route('/board-create')
def get_board_create_html():
    return render_template('board-create.html')

# board detail 화면에 찍어주는 html 라우팅
@app.route('/board-detail')
def get_board_detail_html():
    return render_template('board-detail.html')

# 수정 상세페이지 이동
@app.route('/board-update', methods=['GET', 'POST'])
def board_update():
    return redirect(url_for('success'))

@app.route('/success')
def success():
    return render_template('board-update.html')

# board list 가져오는 기능
@app.route('/api/board', methods=['GET'])
def get_board_list():
    logs = list(db.board.find({}, {'_id': False}))
    return jsonify({'all_logs': logs})

# board 작성(저장) 기능
@app.route('/api/board', methods=['POST'])
def save_board():
    writer_receive = request.form['writer_give']
    title_receive = request.form['title_give']
    content_receive = request.form['content_give']

    if writer_receive == "" or title_receive == "" or content_receive == "":
        return jsonify({'msg': '빈칸에 내용을 입력해주세요!'})

    else:
        doc = {
            'writer': writer_receive,
            'title': title_receive,
            'content': content_receive,
            'created_at': time.strftime('%Y-%m-%d', time.localtime(time.time())),
            'views': 0,
            'count': db.board.count() + 1
        }

        db.board.insert_one(doc)
        return jsonify({'msg': '저장 완료!'})

# board 하나 가져오는 기능
@app.route('/api/board/board', methods=['GET'])
def get_board_detail():
    one_log = db.board.find_one({'writer': 'test6'}, {'_id': False})
    print(one_log)
    return jsonify({'one_log': one_log})

# 수정 페이지에서 값 받아오기
@app.route('/api/board/board', methods=['POST'])
def update_board():
    # if request.method == "GET":
    #     title_receive = request.args.get('title_give')  # title값 받아와써
    #     writer_receive = request.args.get('writer_give')  # 이름받고
    #     content_receive = request.args.get('content_give')  # 내용받고
    #     get_list = [title_receive, writer_receive, content_receive]
    #     return jsonify(get_list)

    if request.method == "POST":
        update_receive = request.form.get('update_content') #수정할 텍스트를 받아왔음
        title_receive = request.form.get('update_title') #받아온타이틀
        target_text = db.board.find_one({'title': title_receive})
        print(target_text)

# board 하나 제거하는 기능
@app.route('/api/delete', methods=['POST'])
def delete_board():
    writer_receive = request.form['writer_give'] #이름 받아오기
    db.board.delete_one({'writer': writer_receive}) # 받아온 이름으로 db 삭제하기
    return jsonify({'msg': '삭제 완료'}) #메세지 리턴해주기

###################### movie 관련 def ########################

@app.route('/movie', methods=['GET'])
def movie():
    part = request.args.get('part')
    print(part)
    return render_template('movie.html', part=part)

## movie화면 이동 및 클릭한 데이터값 전달
@app.route('/movie', methods=['POST'])
def get_part():
    part = request.form['part']
    print("POST: " + part)
    return redirect(url_for('movie',  part=part))

@app.route('/movies', methods=['GET'])
def test():
    # q = "홈트 "
    q = request.args.get('q')
    print(q)

    optionParams = {
        "q": q,
        "part": "snippet",
        "key": "AIzaSyARx6jH12f_mg-uAm_1bmlqlR8Ov69bKYY",
        "maxResults": "5",
        "type": "video",
        "videoDuration": "medium",  # 영상 길이 : 4분이상, 20분 이하
    }
    request_url = "https://www.googleapis.com/youtube/v3/search?"

    for option in optionParams:
        request_url += option + "=" + optionParams[option] + "&"

    data = requests.get(request_url)
    jsonized_data = data.json()
    comments_list = {
        "items": jsonized_data["items"]
    }
    return jsonify(comments_list)

@app.route('/movie-detail', methods=['POST'])
def movie_detail():
    videoId = request.form["videoId"]
    print(videoId)
    return render_template('movie-detail.html', videoId=videoId)


# 내윤님 조회수 증가 코드
@app.route('/diary/view', methods=['POST'])
def update_view():
    views_receive = request.form['view_give']
    target_writer = db.dbMuscle.find_one({'writer': views_receive})
    current_views = target_writer['views']
    new_views = current_views + 1
    db.dbMuscle.update_one({'writer': views_receive}, {'$set': {'views': new_views}})
    return jsonify({'msg': '상세페이지로 이동합니다!'})

# 정대님 좋아요 증가 코드
@app.route('/api/like', methods=['POST'])
def like_star():
    name_receive = request.form['name_give']

    target_log = db.heart_log.find_one({'name': name_receive})
    current_like = target_log['like']

    new_like = current_like + 1

    db.heart_log.update_one({'name': name_receive}, {'$set': {'like': new_like}})

    return jsonify({'msg': '좋아요 완료!'})
  
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)