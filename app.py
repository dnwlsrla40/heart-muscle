import requests
import time
import jwt
import hashlib
import os
from flask import Flask, render_template, jsonify, request, redirect, url_for
from pymongo import MongoClient
from datetime import datetime, timedelta
from bson.objectid import ObjectId

app = Flask(__name__)

# client = MongoClient('mongodb://test:test@localhost', 27017)
client = MongoClient("mongodb://localhost", 27017)

db = client.dbMuscle

SECRET_KEY = os.environ.get('SECRET_KEY')


###################### new Template 관련 def ########################

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')\


@app.route('/video-list', methods=['GET'])
def get_video_list_html():
    return render_template('video-list.html')


@app.route('/question', methods=['GET'])
def get_question():
    codes = list(db.question.find({}).distinct('group'))
    print(codes)
    return jsonify(codes)


@app.route('/codes', methods=['GET'])
def get_codes():
    group = request.args.get('group')
    print("group:" + group)
    codes = list(db.question.find({'group': group}, {'_id': False}))
    return jsonify(codes)


@app.route('/api/videos', methods=['POST'])
def get_videos():
    info = request.json
    print("info:", info)
    videos = list(db.videos.find(info, {'_id': False}))
    return jsonify(videos)

###################### main 관련 def ########################

# main 페이지 라우팅
@app.route('/main', methods=['GET'])
def main():
    return render_template('main.html')

###################### 로그인 & 회원가입 관련 def ###############

# 로그인 페이지 라우팅
@app.route('/login', methods=['GET'])
def login_page():
    return render_template('login.html')


# 회원가입 ID와 비밀번호를 받아서 DB에 저장
@app.route('/login/sign_up', methods=['POST'])
def sign_up():
    userid_receive = request.form['userid_give']
    password_receive = request.form['password_give']
    password_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    doc = {
        "userid": userid_receive,
        "password": password_hash
    }
    db.usersdata.insert_one(doc)
    return jsonify({'result': 'success'})


# 회원가입 시 ID 중복검사
@app.route('/sign_up/check_dup', methods=['POST'])
def check_dup():
    userid_receive = request.form['userid_give']
    exists = bool(db.usersdata.find_one({"userid": userid_receive}))
    return jsonify({'result': 'success', 'exists': exists})


@app.route('/login/sign_in', methods=['POST'])
def sign_in():
    # 로그인
    userid_receive = request.form['userid_give']
    password_receive = request.form['password_give']

    pw_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    print(pw_hash)
    result = db.usersdata.find_one({'userid': userid_receive, 'password': pw_hash})
    print(userid_receive)

    if result is not None:
        payload = {
            'id': userid_receive,
            'exp': datetime.utcnow() + timedelta(seconds=60 * 60 * 24)  # 로그인 24시간 유지
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return jsonify({'result': 'success', 'token': token})
    # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})


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

# board update 화면에 찍어주는 html 라우팅
@app.route('/board-update')
def get_board_update_html():
    return render_template('board-update.html')

# board list 가져오는 기능
@app.route('/api/board-list', methods=['GET'])
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
            'likes': 0,
            'count': db.board.count() + 1
        }

        db.board.insert_one(doc)
        return jsonify({'msg': '저장 완료!'})

# board 하나 가져오는 기능
@app.route('/api/board/<id>', methods=['GET'])
def get_board_detail(id):
    writer_receive = request.args.get('writer_give')  # 내용받고

    data = db.board.find_one({"writer": writer_receive}, {"_id": False})
    print("result:", data)

    return jsonify(data)

# 수정 페이지에서 값 받아오기
@app.route('/api/board-update', methods=['GET'])
def update_board():
    content_receive = request.args.get('content_give')
    content_data = db.board.find_one({'content': content_receive}, {'_id': False})
    return jsonify(content_data)

@app.route('/api/board-update', methods=['POST'])
def update_board_content():
    content_receive = request.form['content_give']
    update_receive = request.form['update_content_give'] #수정할 텍스트를 받아왔음
    title_receive = request.form['title_give'] #받아온타이틀
    print(content_receive, update_receive, title_receive)
    db.board.update_one({'content': content_receive}, {"$set": {'title': title_receive}})
    db.board.update_one({'content': content_receive}, {"$set": {'content': update_receive}})
    return jsonify({'msg': '완료'})

# board 하나 제거하는 기능
@app.route('/api/delete', methods=['POST'])
def delete_board():
    title_receive = request.form['title_give'] #이름 받아오기
    db.board.delete_one({'title': title_receive}) # 받아온 이름으로 db 삭제하기
    return jsonify({'msg': '삭제 완료'}) #메세지 리턴해주기

###################### movie 관련 def ########################

# movie list 화면에 찍어주는 html 라우팅
@app.route('/movie', methods=['GET'])
def get_movie_html():
    part = request.args.get('part')
    print("GET /movie: ", part)
    return render_template('movie.html', part=part)

# movie 상세 동영상 및 정보 화면에 찍어주는 html 라우팅
@app.route('/movie-detail', methods=['GET'])
def get_movie_detail_html():
    return render_template('movie-detail.html')

# movie화면 이동 및 클릭한 데이터값 전달
@app.route('/movie', methods=['POST'])
def get_part():
    part = request.form['part']
    print("POST: ", part)
    return jsonify({'data': part})

# youtube api 사용해서 검색된 동영상 가져오기
@app.route('/api/movies', methods=['GET'])
def get_youtube_movies():
    # q = "홈트 "
    q = request.args.get('q')
    print(q)

    optionParams = {
        "q": q,
        "part": "snippet",
        "key": "AIzaSyARx6jH12f_mg-uAm_1bmlqlR8Ov69bKYY",
        "maxResults": "6",
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

# 정대님 좋아요 증가 코드
@app.route('/api/like', methods=['POST'])
def like_star():
    writer_receive = request.form['writer_give']

    target_post = db.board.find_one({'writer': writer_receive})

    current_like = target_post['likes']
    new_like = current_like + 1

    db.board.update_one({'writer': writer_receive}, {'$set': {'likes': new_like}})

    return jsonify({'msg': '좋아요 완료!'})
  
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)


    # # 내유님 조회수 증가
    # @app.route('/api/view', methods=['POST'])
    # def update_views():
    #     writer_receive = request.form['writer_give']
    #
    #     target_post = db.board.find_one({'writer': writer_receive})
    #
    #     current_like = target_post['views']
    #     new_like = current_like + 1
    #
    #     db.board.update_one({'writer': writer_receive}, {'$set': {'views': new_like}})
    #
    #     return jsonify({'msg': '좋아요 완료!'})