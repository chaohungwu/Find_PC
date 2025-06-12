# -*- coding: utf-8 -*-
"""
Created on Thu Jun  5 15:35:14 2025

@author: asp54
"""
import pandas as pd
import numpy as np


def GetAllMarkData_CPU_Correspond():

    # 載入兩份 CSV
    coolpc_df = pd.read_csv("g:/05_wehelp/03_week_work/03_stage3/find_pc/web_crawler/clean_coolpc_cpu_data_new.csv")
    benchmark_df = pd.read_csv("g:/05_wehelp/03_week_work/03_stage3/find_pc/web_crawler/cpu_mark.csv")

    # 整理欄位名稱
    coolpc_df.columns = ['id', 'name', 'cores', 'brand', 'socket_type', 'price']
    benchmark_df.columns = ['cpu_name', 'mark', 'rank', 'value', 'price', 'cpu_type']

    #確保是字串，後面才可以比對
    benchmark_df['cpu_name'] = benchmark_df['cpu_name'].astype(str)


    # 儲存比對結果
    matched_rows = []
    



    ####### coolpc_data #######
    coolpc_df_dropna = coolpc_df.dropna() #清除空值
    coolpc_df_dropna_array = np.array(coolpc_df_dropna)
    
    
    for i in range(len(coolpc_df_dropna_array)):
        
        print("現在執行到：",i , coolpc_df_dropna_array[i,1])
        coolpc_df_dropna_array_check = coolpc_df_dropna_array[i,1]
        part = coolpc_df_dropna_array_check.split(" ")
        
        
        if "Ultra" in part:
            print("執行Ultra系列")
            benchmark_df_array = np.array(benchmark_df, dtype=str)
            benchmark_check_array = benchmark_df_array[:,1]
            benchmark_mask = np.char.find(benchmark_check_array, part[-3]) >= 0 #沒查到會是-1所以用 >= 0
            benchmark_check_array_index = np.where(benchmark_mask)
            benchmark_array_with_mask = benchmark_check_array[benchmark_check_array_index]
        
            
            #print(benchmark_check_array_index)
            #print(benchmark_array_with_mask)
        
            benchmark_mask2 = np.char.find(benchmark_array_with_mask, part[-1]) >= 0 #沒查到會是-1所以用 >= 0
            benchmark_check_array_index2 = np.where(benchmark_mask2)
            benchmark_array_with_mask2 = benchmark_array_with_mask[benchmark_check_array_index2]
            
            
            #print(benchmark_check_array_index)            
            #print(np.shape(benchmark_check_array_index))
            #print(np.shape(benchmark_check_array_index2))
            #print(benchmark_check_array_index2[0][0])
    
            
            o_index = benchmark_check_array_index[0][benchmark_check_array_index2[0][0]]
            o_value = benchmark_df_array[o_index]
            
            #print("aaa")
            #print(o_index)
            #print(o_value)
            
            matched_rows.append(o_value)
            
            
        elif any(x in part for x in ["I3", "I5", "I7"]):
            print("執行I系列")
            benchmark_df_array = np.array(benchmark_df, dtype=str)
            benchmark_check_array = benchmark_df_array[:,1]
            benchmark_mask = np.char.find(benchmark_check_array, part[-1]) >= 0 #沒查到會是-1所以用 >= 0
            benchmark_check_array_index = np.where(benchmark_mask)
            benchmark_array_with_mask = benchmark_check_array[benchmark_check_array_index]
                
            benchmark_mask2 = np.char.find(benchmark_array_with_mask, part[-1]) >= 0 #沒查到會是-1所以用 >= 0
            benchmark_check_array_index2 = np.where(benchmark_mask2)
            benchmark_array_with_mask2 = benchmark_array_with_mask[benchmark_check_array_index2]
            
            o_index = benchmark_check_array_index[0][benchmark_check_array_index2[0][0]]
            o_value = benchmark_df_array[o_index]
            
            matched_rows.append(o_value)
        
        elif "Xeon" in part:
            print(part)
            print("執行Xeon")
            benchmark_df_array = np.array(benchmark_df, dtype=str)
            benchmark_check_array = benchmark_df_array[:,1]
            benchmark_mask = np.char.find(benchmark_check_array, part[-1]) >= 0 #沒查到會是-1所以用 >= 0
            
            
            
            
            
            
            benchmark_check_array_index = np.where(benchmark_mask)
            benchmark_array_with_mask = benchmark_check_array[benchmark_check_array_index]
            
            part[-1] = part[-1][0].lower() + part[-1][1:]
            benchmark_mask2 = np.char.find(benchmark_array_with_mask, part[-1]) >= 0 #沒查到會是-1所以用 >= 0

            """
            try:
                benchmark_mask2 = np.char.find(benchmark_array_with_mask, part[-1]) >= 0 #沒查到會是-1所以用 >= 0
                part[-1]
                print(part[-1])
                print("ccc")
                print(benchmark_mask2)
                
                
            except:
                part[-1 = part[-1][0].lower() + part[-1][1:]
                print("ddd")
                print(ddd)
                benchmark_mask2 = np.char.find(benchmark_array_with_mask, ddd) >= 0      
            """
            
            
            print("benchmark_df_array",benchmark_df_array)
            print("benchmark_check_array",benchmark_check_array)
            print("benchmark_mask",benchmark_mask)
            print("benchmark_check_array_index",benchmark_check_array_index)
            print("benchmark_array_with_mask",benchmark_array_with_mask)
            print("new part[-1]:",part[-1])
            print("benchmark_mask2:",benchmark_mask2)
    
    
            
            benchmark_check_array_index2 = np.where(benchmark_mask2)
            benchmark_array_with_mask2 = benchmark_array_with_mask[benchmark_check_array_index2]
            print("benchmark_array_with_mask2:",benchmark_array_with_mask2)
            
            
            o_index = benchmark_check_array_index[0][benchmark_check_array_index2[0][0]]
            

            o_value = benchmark_df_array[o_index]
            
            matched_rows.append(o_value)
                
    
    
    else:
        print("123")
    
    














GetAllMarkData_CPU_Correspond()