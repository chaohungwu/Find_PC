
import urllib
import urllib.request as req
import bs4
import time
import pandas as pd
import chardet
import urllib.request as req
import numpy as np
import re
from fuzzywuzzy import process

def getdata(url):
    #url="https://www.ptt.cc/bbs/Lottery/index.html"
    #這邊要輸入一些你的請求辨識資訊
    #建立一個request物件，附加Request hraders 的資訊
    request = req.Request(url, headers={
        # "cookie":"over18=1",
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
        })
    
    #這邊用request物件來打開網址
    with req.urlopen(request) as response:
        charset = response.info().get_content_charset()
        # 如果沒抓到就預設用 utf-8
        charset = charset if charset else "utf-8"
        data = response.read().decode(charset, errors="replace")

        # data = response.read().decode("utf-8")

    return data




def GetAllMarkData_CPU():
    data = getdata("https://www.cpubenchmark.net/cpu_list.php")
    root = bs4.BeautifulSoup(data, "html.parser")

    # 找到 ID 為 'cputable' 的表格
    table = root.find('table', {'id': 'cputable'})

    # print(table)

    # 提取表格的標題
    headers = [th.text.strip() for th in table.find_all('th')]

    # 提取表格的每一列資料
    rows = []
    for tr in table.find_all('tr')[1:]:  # 跳過標題列
        cells = [td.text.strip() for td in tr.find_all('td')]
        if cells:
            rows.append(cells)

    
    rows_df = pd.DataFrame(rows)
    rows_df.columns=headers
    rows_df.to_csv("./web_crawler/cpu_mark.csv")
    
# GetAllMarkData_CPU()






def GetAllMarkData_CPU_Correspond():

    # 載入兩份 CSV
    coolpc_df = pd.read_csv("./web_crawler/clean_coolpc_cpu_data_new.csv")
    benchmark_df = pd.read_csv("./web_crawler/cpu_mark.csv")

    # 整理欄位名稱
    coolpc_df.columns = ['id', 'name', 'cores', 'brand', 'socket_type', 'price']
    benchmark_df.columns = ['cpu_name', 'mark', 'rank', 'value', 'price', 'cpu_type']

    #修正：確保是字串才能用 .str.contains
    benchmark_df['cpu_name'] = benchmark_df['cpu_name'].astype(str)

    coolpc_df_dropna = coolpc_df.dropna() #清除空值
    coolpc_df_dropna_array = np.array(coolpc_df_dropna)
    benchmark_df_array = np.array(benchmark_df, dtype=str)

    # 儲存比對結果
    matched_rows = []



    ####### benchmark #######
    # 查詢包含 "Intel" 的項目
    benchmark_check_array = benchmark_df_array[:,1]
    benchmark_mask = np.char.find(benchmark_check_array, "Ultra") >= 0 #沒查到會是-1所以用 >= 0

    benchmark_check_array_index = np.where(benchmark_mask)[0] #index
    benchmark_array_with_mask = benchmark_check_array[benchmark_check_array_index]


    ####### coolpc data #######



    print(benchmark_array_with_mask)





GetAllMarkData_CPU_Correspond()




# def GetAllMarkData_CPU_Correspond2():
#     # 載入兩份 CSV
#     coolpc_df = pd.read_csv("./web_crawler/clean_coolpc_cpu_data_new.csv")
#     benchmark_df = pd.read_csv("./web_crawler/cpu_mark.csv")

#     # 整理欄位名稱
#     coolpc_df.columns = ['id', 'name', 'cores', 'brand', 'socket_type', 'price']
#     benchmark_df.columns = ['cpu_name', 'mark', 'rank', 'value', 'price', 'cpu_type']

#     # 修正：確保是字串才能做比對
#     coolpc_df['name'] = coolpc_df['name'].astype(str)
#     benchmark_df['cpu_name'] = benchmark_df['cpu_name'].astype(str)

#     # 清除空值
#     coolpc_df_dropna = coolpc_df.dropna()

#     # 儲存比對結果
#     matched_rows = []

#     # 將 benchmark_df 轉為 numpy array for index access
#     benchmark_df_array = np.array(benchmark_df, dtype=str)

#     # 遍歷每一筆 coolpc 資料，嘗試在 benchmark 中比對名稱
#     for _, coolpc_row in coolpc_df_dropna.iterrows():
#         coolpc_id = coolpc_row['id']
#         coolpc_name = str(coolpc_row['name']).strip().lower()

#         for bench_idx, bench_row in enumerate(benchmark_df_array):
#             benchmark_name = bench_row[0].strip().lower()

#             if coolpc_name in benchmark_name or benchmark_name in coolpc_name:
#                 matched_rows.append({
#                     'coolpc_id': coolpc_id,
#                     'coolpc_name': coolpc_row['name'],
#                     'benchmark_name': benchmark_name,
#                     'mark': bench_row[1],
#                     'rank': bench_row[2],
#                     'value': bench_row[3],
#                     'benchmark_price': bench_row[4]
#                 })

#     # 可選：轉為 DataFrame 回傳或儲存
#     matched_df = pd.DataFrame(matched_rows)
#     # return matched_df
#     matched_df.to_csv("./web_crawler/matched_df.csv")


# GetAllMarkData_CPU_Correspond2()




def GetAllMarkData_GPU():
    data = getdata("https://www.videocardbenchmark.net/gpu_list.php")
    root = bs4.BeautifulSoup(data, "html.parser")

    # 找到 ID 為 'cputable' 的表格
    table = root.find('table', {'id': 'cputable'})

    # print(table)

    # 提取表格的標題
    headers = [th.text.strip() for th in table.find_all('th')]

    # 提取表格的每一列資料
    rows = []
    for tr in table.find_all('tr')[1:]:  # 跳過標題列
        cells = [td.text.strip() for td in tr.find_all('td')]
        if cells:
            rows.append(cells)

    
    rows_df = pd.DataFrame(rows)
    rows_df.columns=headers
    rows_df.to_csv("./web_crawler/gpu_mark.csv")

# GetAllMarkData_GPU()