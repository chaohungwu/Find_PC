import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pandas as pd
import numpy as np
from model.DB_ORM import DB_Function

def CPU_data_clean2DB():
        """
        讀取並清理乾淨資料
        """
        CPU_df_data = pd.read_csv("./web_crawler/CPU_DATA_with_benchmark_2.csv")
        CPU_df_data_data_cleaned = CPU_df_data.dropna() #去掉空值
        CPU_df_data_data_cleaned.columns = ['id', 'name','cores','brand','socket_type','price','benchmark_score'] #設定欄位名稱
        CPU_data_dict = CPU_df_data_data_cleaned.to_dict(orient="records") #DataFrame to Dict
        
        
        #print(CPU_data_dict[0])
        #print(type(CPU_data_dict))

        DB_function = DB_Function()
        sql = "INSERT INTO cpu_table (name, cores, brand, socket_type, score, price) VALUES (%s, %s, %s, %s, %s, %s)"
        

        for i in range(len(CPU_data_dict)):
            data =  CPU_data_dict[i]
            parameter = (
                         data["name"],
                         int(data["cores"]),
                         data["brand"],
                         data["socket_type"],
                         int(data["benchmark_score"]),
                         float(data["price"])
                         )
            DB_function.ComponentData2DB(sql,parameter)
            


def GPU_data_clean2DB():
        """
        讀取並清理乾淨資料
        """
        GPU_df_data = pd.read_csv("./web_crawler/GPU_DATA_with_benchmark.csv")
        GPU_df_data_data_cleaned = GPU_df_data.dropna() #去掉空值
        GPU_df_data_data_cleaned.columns = ["id","廠牌","晶片品牌","型號","顯存","名稱","價格","score"] #設定欄位名稱
        GPU_data_dict = GPU_df_data_data_cleaned.to_dict(orient="records") #DataFrame to Dict
        
        
        #print(CPU_data_dict[0])
        #print(type(CPU_data_dict))

        DB_function = DB_Function()
        sql = "INSERT INTO gpu_table (brand, chipset_brand, series ,VRAM, name, score, price) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        

        for i in range(len(GPU_data_dict)):
            data =  GPU_data_dict[i]
            parameter = (
                         data["廠牌"],
                         data["晶片品牌"],
                         data["型號"],
                         int(data["顯存"]),
                         data["名稱"],
                         int(data["score"]),
                         float(data["價格"])
                         )
            DB_function.ComponentData2DB(sql,parameter)


GPU_data_clean2DB()
