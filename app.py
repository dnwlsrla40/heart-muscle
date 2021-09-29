import requests
import time
from flask import Flask, render_template, jsonify, request, redirect, url_for

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
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

## HTML 화면 보여주기
@app.route('/')
def homework():
    return render_template('index.html')

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