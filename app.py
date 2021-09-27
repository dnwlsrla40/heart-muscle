from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client.dbMuscle

import time

## HTML 화면 보여주기
@app.route('/')
def homework():
    return render_template('index.html')

@app.route('/diary', methods=['POST'])
def write_diary():
    writer_receive = request.form['writer_give']
    title_receive = request.form['title_give']
    content_receive = request.form['content_give']

    doc = {
        'writer': writer_receive,
        'title': title_receive,
        'content': content_receive,
        'created_at': time.strftime('%Y-%m-%d', time.localtime(time.time())),
        'views': 0,
        'count': db.dbMuscle.count()+1
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

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
