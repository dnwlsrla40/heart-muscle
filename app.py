import requests
import time
from flask import Flask, render_template, jsonify, request, redirect, url_for
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbMuscle

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

# HTML을 주는 부분
@app.route('/')
def home():
    return render_template('heart_log.html')


# 전체 DB 저장
@app.route('/log', methods=['POST'])
def write_review():
    name_receive = request.form['name_give']
    title_receive = request.form['title_give']
    content_receive = request.form['content_give']
    like_receive = 0

    today = datetime.now()
    mytime = today.strftime('%Y년 %m월 %d일 %H시 %M분 %S초')

    date = f'{mytime}'

    doc = {
        'date': date,
        'name': name_receive,
        'title': title_receive,
        'content': content_receive,
        'like': like_receive
    }

    db.heart_log.insert_one(doc)

    return jsonify({'msg': '저장 완료!'})

# 전체 LIKE 저장
@app.route('/api/like', methods=['POST'])
def like_star():
    name_receive = request.form['name_give']

    target_log = db.heart_log.find_one({'name': name_receive})
    current_like = target_log['like']

    new_like = current_like + 1

    db.heart_log.update_one({'name': name_receive}, {'$set': {'like': new_like}})

    return jsonify({'msg': '좋아요 완료!'})

# 불러오기
@app.route('/log', methods=['GET'])
def read_reviews():
    logs = list(db.heart_log.find({}, {'_id': False}))
    return jsonify({'all_logs': logs})

@app.route('/detailed_post')
def detailed_post_page():
    return render_template('detailed_post_page.html')

#제거
@app.route('/api/delete', methods=['POST'])
def diary_delete():
    writer_receive = request.form['writer_give'] #이름 받아오기
    db.dbMuscle.delete_one({'writer': writer_receive}) # 받아온 이름으로 db 삭제하기
    return jsonify({'msg': '삭제 완료'}) #메세지 리턴해주기

#수정 상세페이지 이동
@app.route('/boardupdate', methods=['GET', 'POST'])
def boardupdate():
    return redirect(url_for('success'))

@app.route('/success')
def success():
    return render_template('boardupdate.html')

# 수정 페이지에서 값 받아오기
@app.route('/updatepage', methods=['GET', 'POST'])
def updatepage():
    if request.method == "GET":
        title_receive = request.args.get('title_give')  # title값 받아와써
        writer_receive = request.args.get('writer_give')  # 이름받고
        content_receive = request.args.get('content_give')  # 내용받고
        get_list = [title_receive, writer_receive, content_receive]
        return jsonify(get_list)

    if request.method == "POST":
        update_receive = request.form.get('update_content') #수정할 텍스트를 받아왔음
        title_receive = request.form.get('update_title') #받아온타이틀
        target_text = db.dbMuscle.find_one({'title': title_receive})
        print(target_text)

@app.route('/detailed_post/post', methods=['GET'])
def show_detail_page():
    one_log = db.heart_log.find_one({'name':'김아무개'}, {'_id':False})
    print(one_log)
    return jsonify({'one_log': one_log})

@app.route('/diary', methods=['POST'])
def write_diary():
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
            'count': db.dbMuscle.count() + 1
        }

        db.dbMuscle.insert_one(doc)
        return jsonify({'msg': '저장 완료!'})

@app.route('/diary', methods=['GET'])
def read_diary():
    diaries = list(db.dbMuscle.find({},{'_id': False}))
    return jsonify({'diary_list': diaries})

@app.route('/diary/view', methods=['POST'])
def update_view():
    views_receive = request.form['view_give']
    target_writer = db.dbMuscle.find_one({'writer': views_receive})
    current_views = target_writer['views']
    new_views = current_views + 1
    db.dbMuscle.update_one({'writer': views_receive}, {'$set': {'views': new_views}})
    return jsonify({'msg': '상세페이지로 이동합니다!'})

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
  
## HTML 화면 보여주기
@app.route('/movie-detail', methods=['POST'])
def movie_detail():
    videoId = request.form["videoId"]
    print(videoId)
    return render_template('movie-detail.html', videoId=videoId)
  
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)