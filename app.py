from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.heart_muscle

from datetime import datetime


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


@app.route('/detailed_post/post', methods=['GET'])
def show_detail_page():
    one_log = db.heart_log.find_one({'name':'김아무개'}, {'_id':False})
    print(one_log)
    return jsonify({'one_log': one_log})

@app.route('/detailed_post')
def detailed_post_page():
    return render_template('detailed_post_page.html')


if __name__ == 'main':
    app.run('0.0.0.0', port=5000, debug=True)
