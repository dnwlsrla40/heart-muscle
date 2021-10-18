from pymongo import MongoClient

client = MongoClient('mongodb://52.78.134.129', 27017, username="heart-muscle", password="teamco")

db = client.dbMuscle

codes = [
    # home-training
    {"video_id": "CYcLODSeC-c", "title": "Lv.4 층간소음없이 딱! 15분 체지방 100% 녹여버리는 루틴 [Noise Free 15mins Fat Burning Workout]", "thumbnail": "https://i.ytimg.com/vi/CYcLODSeC-c/hqdefault.jpg", "division": {"category": "home-training", "Lv": "4"}},
    {"video_id": "FFWklphDy8A", "title": "Lv.3 층간소음 없는 체지방 착즙 루틴 (떠먹는홈트)", "thumbnail": "https://i.ytimg.com/vi/FFWklphDy8A/hqdefault.jpg", "division": {"category": "home-training", "Lv": "3"}},
    {"video_id": "c_5ENJWekbQ", "title": "Lv.4 10분 만에 집에서 가슴 작살내는 루틴 (누구나 쉽게 가능) [10mins Intense Chest Workout]", "thumbnail": "https://i.ytimg.com/vi/c_5ENJWekbQ/hqdefault.jpg", "division": {"category": "home-training", "Lv": "4"}},
    {"video_id": "Oz5ts01rzEo", "title": "Lv.1 운동초보 분들은 이 영상을 무조건 따라 하세요! (떠먹는홈트)", "thumbnail": "https://i.ytimg.com/vi/Oz5ts01rzEo/hqdefault.jpg", "division": {"category": "home-training", "Lv": "1"}},
    {"video_id": "AC9twq7A_cs", "title": "Lv.3.5 복근을 가지고 싶다면 이 영상을 반복하세요.", "thumbnail": "https://i.ytimg.com/vi/AC9twq7A_cs/hqdefault.jpg", "division": {"category": "home-training", "Lv": "3"}},
    {"video_id": "yka0VGRh1oc", "title": "Lv.4 이 12분짜리 영상 딱! 하나로 전신 한방에 끝내버리세요! [12mins Full body workout]", "thumbnail": "https://i.ytimg.com/vi/yka0VGRh1oc/hqdefault.jpg", "division": {"category": "home-training", "Lv": "4"}},
    {"video_id": "SwlS857LjVc", "title": "Lv2.5 9분만에 복근 찢어집니다! 누구나 가능한 완벽한 복근루틴 9Mins Intense Abs Workout! Make Sixpack Together!", "thumbnail": "https://i.ytimg.com/vi/SwlS857LjVc/hqdefault.jpg", "division": {"category": "home-training", "Lv": "2"}},
    {"video_id": "qkQdIMW1xlw", "title": "Lv.2 꽉! 차는 머슬핏 만드는 팔 루틴 (이두,삼두) 덤벨필요", "thumbnail": "https://i.ytimg.com/vi/qkQdIMW1xlw/hqdefault.jpg", "division": {"category": "home-training", "Lv": "2"}},
    {"video_id": "6R2fLpXOKQI", "title": "Lv.1.5 누구나 쌉 가능한 하체 마스터 루틴 (웜업포함)", "thumbnail": "https://i.ytimg.com/vi/6R2fLpXOKQI/hqdefault.jpg", "division": {"category": "home-training", "Lv": "1"}},
    {"video_id": "FMNNnilprMI", "title": "Lv.0 런지! 7분만에 완벽 마스터하기 (떠먹는 홈트)", "thumbnail": "https://i.ytimg.com/vi/FMNNnilprMI/hqdefault.jpg", "division": {"category": "home-training", "Lv": "0"}},
    {"video_id": "wwiXAVYa9UQ", "title": "Lv.0 스쿼트, 8분만에 완벽 마스터하기 (떠먹는 홈트)", "thumbnail": "https://i.ytimg.com/vi/wwiXAVYa9UQ/hqdefault.jpg", "division": {"category": "home-training", "Lv": "0"}},
    {"video_id": "ndzgtmzF45o", "title": "Lv.0 푸쉬업 9분만에 완벽 마스터하기 (떠먹는 홈트)", "thumbnail": "https://i.ytimg.com/vi/ndzgtmzF45o/hqdefault.jpg", "division": {"category": "home-training", "Lv": "0"}},
    {"video_id": "7BQ92l95Zqc", "title": "HIIT 10분으로 운동효과 제대로 - 고강도 인터벌 트레이닝 홈트", "thumbnail": "https://i.ytimg.com/vi/7BQ92l95Zqc/hqdefault.jpg", "division": {"category": "home-training", "Lv": "4"}},

    # stretching
    {"video_id": "gMKrEgAdmmo", "title": "Lv.0 운동 전! 무적권 해야하는 동적스트레칭 (안하면 다침)", "thumbnail": "https://i.ytimg.com/vi/gMKrEgAdmmo/hqdefault.jpg", "division": {"category": "stretching", "Lv": "0"}},
    {"video_id": "OCED-S7D5IY", "title": "Lv.1 하루가 달라지는 필수 모닝 스트레칭 (떠먹는홈트)", "thumbnail": "https://i.ytimg.com/vi/OCED-S7D5IY/hqdefault.jpg", "division": {"category": "stretching", "Lv": "1"}},
    {"video_id": "q46cMwNQsIg", "title": "누워서도 할 수 있는 목 운동 레벨 1! 자기 전 필수 습관 재활홈트", "thumbnail": "https://i.ytimg.com/vi/q46cMwNQsIg/hqdefault.jpg", "division": {"category": "stretching", "Lv": "1"}},

    # weight
    {"video_id": "q46cMwNQsIg", "title": "누워서도 할 수 있는 목 운동 레벨 1! 자기 전 필수 습관 재활홈트", "thumbnail": "https://i.ytimg.com/vi/q46cMwNQsIg/hqdefault.jpg", "division": {"category": "stretching", "Lv": "1"}},

    # yoga-pilates
    {"video_id": "q46cMwNQsIg", "title": "누워서도 할 수 있는 목 운동 레벨 1! 자기 전 필수 습관 재활홈트", "thumbnail": "https://i.ytimg.com/vi/q46cMwNQsIg/hqdefault.jpg", "division": {"category": "stretching", "Lv": "1"}},
]

db.videos.insert_many(codes)