from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.dbMuscle


## HTML 화면 보여주기
@app.route('/')
def homework():
    return render_template('index.html')

@app.route('/diary', methods=['POST'])
def write_diary():
    name_receive = request.form['name_give']
    title_receive = request.form['title_give']
    diary_receive = request.form['diary_give']

    doc = {
        'name': name_receive,
        'title': title_receive,
        'diary': diary_receive
    }

    db.dbMuscle.insert_one(doc)
    return jsonify({'msg': '저장 완료!'})

@app.route('/diary', methods=['GET'])
def read_diary():
    diaries = list(db.dbMuscle.find({},{'_id': False}))
    return jsonify({'diary_list': diaries})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
