from pymongo import MongoClient

# 建立連線
client = MongoClient("mongodb://localhost:27017/")

# 選擇資料庫和集合（collection）
db = client["my_database"]
collection = db["my_collection"]

# 插入資料（Create）
data = {"name": "Alice", "age": 25}
collection.insert_one(data)  # 插入一筆

collection.insert_many([
    {"name": "Bob", "age": 30},
    {"name": "Charlie", "age": 35}
])  # 插入多筆


result = collection.find_one({"name": "Alice"})
print(result)

# 查詢多筆
for item in collection.find({"age": {"$gte": 30}}):
    print(item)