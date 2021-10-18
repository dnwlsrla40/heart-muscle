import requests
import time
import boto3
import jwt
import hashlib
import os
from flask import Flask, render_template, jsonify, request, redirect, url_for
from pymongo import MongoClient
from datetime import datetime, timedelta
from bson.objectid import ObjectId

app = Flask(__name__)


client = MongoClient("mongodb://localhost", 27017)

db = client.dbMuscle

SECRET_KEY = os.environ.get('SECRET_KEY')




###################### new Template 관련 def ########################

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


# video 관련 된 것을 화면에 찍어주는 html 라우팅
@app.route('/video', methods=['GET'])
def get_video_html():
    return render_template('video.html')


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


# 전체 video 가져오기
@app.route('/api/videos', methods=['POST'])
def get_videos():
    info = request.json
    print("info:", info)
    videos = list(db.videos.find(info, {'_id': False}))
    return jsonify(videos)


@app.route('/api/videos/category', methods=['GET'])
def get_videos_by_category():
    category = request.args.get('category')
    print(category)
    category_videos = list(db.videos.find({'division.category': category}, {'_id': False}))
    print(category_videos)
    return jsonify(category_videos)


# @app.route('/api/video/<video_id>', methods=['GET'])
# def get_video_by_video_id(video_id):
#     print(video_id)
#     return


# # youtube api 사용해서 검색된 동영상 가져오기
# @app.route('/api/videos/<search>', methods=['GET'])
# def get_videos_by_youtube(search):
#     print(search)
#
#     optionParams = {
#         "q": search,
#         "part": "snippet",
#         "key": "AIzaSyARx6jH12f_mg-uAm_1bmlqlR8Ov69bKYY",
#         "maxResults": "20",
#         "type": "video",
#         "videoDuration": "medium",  # 영상 길이 : 4분이상, 20분 이하
#     }
#     request_url = "https://www.googleapis.com/youtube/v3/search?"
#
#     for option in optionParams:
#         request_url += option + "=" + optionParams[option] + "&"
#
#     data = requests.get(request_url)
#     jsonized_data = data.json()
#     comments_list = {
#         "items": jsonized_data["items"]
#     }
#     return jsonify(comments_list)

# # category에서 나눠진 video 가져오기
# @app.route('/api/video/<video_id>', methods=['GET'])
# def get_video(video_id):


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


###################### 득근 QnA ########################

# board list 화면에 찍어주는 html 라우팅
@app.route('/board-list', methods=['GET'])
def get_board_list_html():
    return render_template('board-list.html')


@app.route("/get-posts", methods=['GET'])
def get_posts():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        boards = list(db.boards.find({}).sort("date", -1).limit(20))
        for board in boards:
            board["_id"] = str(board["_id"])
            board["count_heart"] = db.likes.count_documents({"board_id": board["_id"], "type": "heart"})
            board["heart_by_me"] = bool(
                db.likes.find_one({"board_id": board["_id"], "type": "heart", "userid": payload['id']}))
            print(board["_id"])
            print(type(board["_id"]))
            print(board["heart_by_me"])
        print(boards)
        print(board["heart_by_me"])
        print(board["count_heart"])
        return jsonify({"result": "success", "msg": "포스팅을 가져왔습니다.", "boards": boards})
    except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError):
        return redirect(url_for("login_page"))


# 내윤님 조회수 증가
@app.route('/api/views', methods=['POST'])
def update_views():
    idx_receive = int(request.form['idx_give'])

    target_post = db.boards.find_one({'idx': idx_receive})

    current_views = target_post['views']
    new_views = current_views + 1

    db.boards.update_one({'idx': idx_receive}, {'$set': {'views': new_views}})

    return jsonify({'msg': '조회수 업데이트 완료!'})


# 좋아요 코드
@app.route('/update_like', methods=['POST'])
def like_star():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.usersdata.find_one({"userid": payload["id"]})
        board_id_receive = request.form["board_id_give"]
        type_receive = request.form["type_give"]
        action_receive = request.form["action_give"]
        doc = {
            "board_id": board_id_receive,
            "userid": user_info["userid"],
            "type": type_receive
        }
        if action_receive == "like":
            db.likes.insert_one(doc)
        else:
            db.likes.delete_one(doc)
        count = db.likes.count_documents({"board_id": board_id_receive, "type": type_receive})
        return jsonify({"result": "success", 'msg': 'updated', "count": count})
    except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError):
        return redirect(url_for("login_page"))


# board detail 화면에 찍어주는 html 라우팅
@app.route('/board-detail')
def get_board_detail_html():
    return render_template('board-detail.html')


# board 하나 가져오는 기능
@app.route('/api/board/post', methods=['GET'])
def get_board_detail():
    idx_receive = int(request.args.get('idx_give'))
    data = db.boards.find_one({'idx': idx_receive}, {'_id': False})
    print("result:", data)
    # return jsonify({"result": "success", "msg": "포스팅을 가져왔습니다.", "boards": boards})
    return jsonify({"data": data})


# board create 화면에 찍어주는 html 라우팅
@app.route('/board-create')
def get_board_create_html():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.users.find_one({"username": payload["id"]})
        return render_template('board-create.html', user_info=user_info)
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login_page", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return render_template('board-create.html')

        # return redirect(url_for("login_page", msg="로그인 정보가 존재하지 않습니다."))


# board 작성(저장) 기능
@app.route('/api/post', methods=['POST'])
def board_create():
    token_receive = request.cookies.get('mytoken')
    payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
    user_info = db.usersdata.find_one({"userid": payload["id"]})
    title_receive = request.form['title_give']
    content_receive = request.form['content_give']

    boards_count = db.boards.count()
    if boards_count == 0:
        max_value = 1
    else:
        max_value = db.boards.find_one(sort=[("idx", -1)])['idx'] + 1

    if title_receive == "" or content_receive == "":
        return jsonify({'msg': '빈칸에 내용을 입력해주세요!'})

    doc = {
        'idx': max_value,
        "userid": user_info["userid"],
        'title': title_receive,
        'content': content_receive,
        'created_at': time.strftime('%Y-%m-%d', time.localtime(time.time())),
        'views': 0,
    }

    db.boards.insert_one(doc)
    return jsonify({"result": "success", 'msg': '포스팅 성공'})


# board update 화면에 찍어주는 html 라우팅
@app.route('/board-update')
def get_board_update_html():
    return render_template('board-update.html')


# 수정 페이지에서 값 받아오기
@app.route('/api/board-update', methods=['GET'])
def update_board():
    print(request.args.get('idx_give'))
    print(type(request.args.get('idx_give')))
    idx_receive = int(request.args.get('idx_give'))
    print(idx_receive)
    content_data = db.boards.find_one({'idx': idx_receive}, {'_id': False})
    print(content_data)
    return jsonify({'content_data': content_data})


@app.route('/api/board-update', methods=['POST'])
def update_board_content():
    idx_receive = int((request.form['idx_give']))
    update_receive = request.form['update_content_give']  # 수정할 텍스트를 받아왔음
    title_receive = request.form['title_give']  # 받아온타이틀
    db.boards.update_one({'idx': idx_receive}, {"$set": {'title': title_receive}})
    db.boards.update_one({'idx': idx_receive}, {"$set": {'content': update_receive}})
    return jsonify({'msg': '저장 완료!'})


# board 하나 제거하는 기능
@app.route('/api/delete', methods=['POST'])
def delete_board():
    idx_receive = int((request.form['idx_give']))
    db.boards.delete_one({'idx': idx_receive})  # 받아온 이름으로 db 삭제하기
    return jsonify({'msg': '삭제 완료!'})  # 메세지 리턴해주기


# ###################### movie 관련 def ########################
#
# # movie list 화면에 찍어주는 html 라우팅
# @app.route('/movie', methods=['GET'])
# def get_movie_html():
#     part = request.args.get('part')
#     print("GET /movie: ", part)
#     return render_template('movie.html', part=part)
#
# # movie 상세 동영상 및 정보 화면에 찍어주는 html 라우팅
# @app.route('/movie-detail', methods=['GET'])
# def get_movie_detail_html():
#     return render_template('movie-detail.html')
#
# # movie화면 이동 및 클릭한 데이터값 전달
# @app.route('/movie', methods=['POST'])
# def get_part():
#     part = request.form['part']
#     print("POST: ", part)
#     return jsonify({'data': part})
#
# # youtube api 사용해서 검색된 동영상 가져오기
# @app.route('/api/movies', methods=['GET'])
# def get_youtube_movies():
#     # q = "홈트 "
#     q = request.args.get('q')
#     print(q)
#
#     optionParams = {
#         "q": q,
#         "part": "snippet",
#         "key": "AIzaSyARx6jH12f_mg-uAm_1bmlqlR8Ov69bKYY",
#         "maxResults": "6",
#         "type": "video",
#         "videoDuration": "medium",  # 영상 길이 : 4분이상, 20분 이하
#     }
#     request_url = "https://www.googleapis.com/youtube/v3/search?"
#
#     for option in optionParams:
#         request_url += option + "=" + optionParams[option] + "&"
#
#     data = requests.get(request_url)
#     jsonized_data = data.json()
#     comments_list = {
#         "items": jsonized_data["items"]
#     }
#     return jsonify(comments_list)
#
# @app.route('/movie-detail', methods=['POST'])
# def movie_detail():
#     videoId = request.form["videoId"]
#     print(videoId)
#     return render_template('movie-detail.html', videoId=videoId)


## 21-10-13 1차 푸시

## 피드 작성 화면
@app.route('/posting')
def posting_html():
    return render_template('posting-save.html')


## 피드 상세 화면
@app.route('/posting/detail')
def posting_detail_html():
    return render_template('posting-detail.html')


## 피드 목록 화면
@app.route('/posting/list')
def posting_list_html():
    return render_template('posting-list.html')


## 업로드한 사진 S3 저장 / image url DB에 저장
@app.route('/fileupload', methods=['POST'])
def file_upload():
    file = request.files['file']
    s3 = boto3.client('s3')
    s3.put_object(
        ACL="public-read",
        Bucket="teamco-project",
        Body=file,
        Key=file.filename,
        ContentType=file.content_type)

    location = s3.get_bucket_location(Bucket="teamco-project")['LocationConstraint']
    print(location)
    image_url = f'https://{"teamco-project"}.s3.{location}.amazonaws.com/{file.filename}'
    print(image_url)

    image_count = db.image_url.find({}).count()

    if image_count == 0:
        max_value = 1
    else:
        max_value = db.image_url.find_one(sort=[("idx", -1)])['idx'] + 1

    doc = {
        'image_url': image_url,
        'idx': max_value
    }

    db.image_url.insert_one(doc)

    posting_idx = db.image_url.find_one({'idx': int(max_value)})
    print(posting_idx)

    # update_image = posting_idx['image_url']
    # print(update_image)
    # db.posting.update_one({'idx': posting_idx}, {'$set': {'image': update_image}})
    return jsonify({'result': 'success'})


## 일지 DB 저장
@app.route('/api/posting', methods=['POST'])
def posting():
    title_receive = request.form['title_give']
    content_receive = request.form['content_give']

    workout_receive_01 = request.form['workout_give_01']
    min_receive_01 = request.form['min_give_01']
    time_receive_01 = request.form['time_give_01']

    workout_receive_02 = request.form['workout_give_02']
    min_receive_02 = request.form['min_give_02']
    time_receive_02 = request.form['time_give_02']

    workout_receive_03 = request.form['workout_give_03']
    min_receive_03 = request.form['min_give_03']
    time_receive_03 = request.form['time_give_03']

    breakfast_receive = request.form['breakfast_give']
    lunch_receive = request.form['lunch_give']
    dinner_receive = request.form['dinner_give']
    posting_count = db.posting.count()

    if posting_count == 0:
        max_value = 1
    else:
        max_value = db.posting.find_one(sort=[("idx", -1)])['idx'] + 1

    doc = {
        'title': title_receive,
        'content': content_receive,
        'workout_01': workout_receive_01,
        'min_01': min_receive_01,
        'time_01': time_receive_01,
        'workout_02': workout_receive_02,
        'min_02': min_receive_02,
        'time_02': time_receive_02,
        'workout_03': workout_receive_03,
        'min_03': min_receive_03,
        'time_03': time_receive_03,
        'breakfast': breakfast_receive,
        'lunch': lunch_receive,
        'dinner': dinner_receive,
        'created_at': time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time())),
        'views': 0,
        'likes': 0,
        'idx': max_value
    }

    db.posting.insert_one(doc)
    return jsonify({'msg': '저장 완료!'})


## 일지 상세내용 불러오기
@app.route('/api/posting/detail', methods=['GET'])
def posting_detail():
    idx_receive = request.args.get('idx_give')
    print(idx_receive)
    data = db.posting.find_one({"idx": int(idx_receive)}, {"_id": False})
    print("result:", data)

    image_data = db.image_url.find_one({"idx": int(idx_receive)}, {"_id": False})
    image = image_data['image_url']
    print("result:", image)

    return jsonify(data, image)


## 일지 피드에 불러오기
@app.route('/api/posting/list', methods=['GET'])
def posting_list():
    posts = list(db.posting.find({}, {'_id': False}))
    print("result:", posts)

    image = list(db.image_url.find({}, {'_id': False}))
    print("result:", image)

    return jsonify(posts, image)


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