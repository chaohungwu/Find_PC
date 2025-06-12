# -*- coding: utf-8 -*-
"""
Created on Fri Jun  6 03:46:24 2025

@author: asp54
"""

import pandas as pd
import numpy as np
import re


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
o_matched_rows = []



####### coolpc_data #######
coolpc_df_dropna = coolpc_df.dropna() #清除空值
coolpc_df_dropna_array = np.array(coolpc_df_dropna)


for i in range(len(coolpc_df_dropna_array)):
    
    print("現在執行到：",i , coolpc_df_dropna_array[i,1])
    coolpc_df_dropna_array_check = coolpc_df_dropna_array[i,1]
    part = coolpc_df_dropna_array_check.split(" ")
    part2 = re.split(r"[ -]",coolpc_df_dropna_array_check)
    
    if "Ultra" in part:
        print("執行Ultra系列")
        benchmark_df_array = np.array(benchmark_df, dtype=str)
        benchmark_check_array = benchmark_df_array[:,1]
        benchmark_mask = np.char.find(benchmark_check_array, part[-3]) >= 0 #沒查到會是-1所以用 >= 0
        benchmark_check_array_index = np.where(benchmark_mask)
        benchmark_array_with_mask = benchmark_check_array[benchmark_check_array_index]
    
    
        benchmark_mask2 = np.char.find(benchmark_array_with_mask, part[-1]) >= 0 #沒查到會是-1所以用 >= 0
        benchmark_check_array_index2 = np.where(benchmark_mask2)
        benchmark_array_with_mask2 = benchmark_array_with_mask[benchmark_check_array_index2]
        
        
        o_index = benchmark_check_array_index[0][benchmark_check_array_index2[0][0]]
        o_value = benchmark_df_array[o_index]
        
        
        matched_rows.append(o_value)
        
        
    elif any(x in part2 for x in ["i3", "i5", "i7","i9"]):
    #elif "Xeon" in part:
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
        

        if len(benchmark_mask[benchmark_mask[:]==True]) ==0:
            
            part[-1] = part[-1][0].lower() + part[-1][1:]
            benchmark_mask = np.char.find(benchmark_check_array, part[-1]) >= 0
            
            benchmark_check_array_index = np.where(benchmark_mask)
            benchmark_array_with_mask = benchmark_check_array[benchmark_check_array_index]
        
            benchmark_mask2 = np.char.find(benchmark_array_with_mask, part[-1]) >= 0 #沒查到會是-1所以用 >= 0



        benchmark_check_array_index2 = np.where(benchmark_mask2)
        benchmark_array_with_mask2 = benchmark_array_with_mask[benchmark_check_array_index2]
        print("benchmark_array_with_mask2:",benchmark_array_with_mask2)
        
        
        o_index = benchmark_check_array_index[0][benchmark_check_array_index2[0][0]]
        o_value = benchmark_df_array[o_index]

        matched_rows.append(o_value)
            
        
    elif "MPK(含風扇)" in part:
        print("執行AMD MPK系列")
        benchmark_df_array = np.array(benchmark_df, dtype=str)
        benchmark_check_array = benchmark_df_array[:,1]
        benchmark_mask = np.char.find(benchmark_check_array, part[-2]) >= 0 #沒查到會是-1所以用 >= 0
        benchmark_check_array_index = np.where(benchmark_mask)
        benchmark_array_with_mask = benchmark_check_array[benchmark_check_array_index]
            
        
        benchmark_mask2 = np.char.find(benchmark_array_with_mask, part[-2]) >= 0
        benchmark_check_array_index2 = np.where(benchmark_mask2)
        benchmark_array_with_mask2 = benchmark_array_with_mask[benchmark_check_array_index2]
        
        o_index = benchmark_check_array_index[0][benchmark_check_array_index2[0][0]]
        o_value = benchmark_df_array[o_index]   
        matched_rows.append(o_value)

    elif "Processor" in part:
        print("執行Ultra系列")
        print(part)
        print((part[-2]+" "+part[-1]))
        keyword01 = 'Intel 300'
        
        benchmark_df_array = np.array(benchmark_df, dtype=str)
        benchmark_check_array = benchmark_df_array[:,1]
        benchmark_mask = np.char.find(benchmark_check_array, keyword01) >= 0 #沒查到會是-1所以用 >= 0
        benchmark_check_array_index = np.where(benchmark_mask)
        benchmark_array_with_mask = benchmark_check_array[benchmark_check_array_index]
    
        
    
        benchmark_mask2 = np.char.find(benchmark_array_with_mask, keyword01) >= 0 #沒查到會是-1所以用 >= 0
        benchmark_check_array_index2 = np.where(benchmark_mask2)
        benchmark_array_with_mask2 = benchmark_array_with_mask[benchmark_check_array_index2]
        
        

        
        o_index = benchmark_check_array_index[0][benchmark_check_array_index2[0][0]]
        o_value = benchmark_df_array[o_index]
        
        
        matched_rows.append(o_value)


        
    elif "MPK(代理含風扇)" in part:
        print("執行AMD MPK系列")
        benchmark_df_array = np.array(benchmark_df, dtype=str)
        benchmark_check_array = benchmark_df_array[:,1]
        benchmark_mask = np.char.find(benchmark_check_array, part[-2]) >= 0 #沒查到會是-1所以用 >= 0
        benchmark_check_array_index = np.where(benchmark_mask)
        benchmark_array_with_mask = benchmark_check_array[benchmark_check_array_index]
            
        
        benchmark_mask2 = np.char.find(benchmark_array_with_mask, part[-2]) >= 0
        benchmark_check_array_index2 = np.where(benchmark_mask2)
        benchmark_array_with_mask2 = benchmark_array_with_mask[benchmark_check_array_index2]
        
        o_index = benchmark_check_array_index[0][benchmark_check_array_index2[0][0]]
        o_value = benchmark_df_array[o_index]
        matched_rows.append(o_value)

        
        
    elif "AMD" in part:
        print("執行AMD系列")
        
        benchmark_df_array = np.array(benchmark_df, dtype=str)
        benchmark_check_array = benchmark_df_array[:,1]
        benchmark_mask = np.char.find(benchmark_check_array, part[-1]) >= 0
        benchmark_check_array_index = np.where(benchmark_mask)
        benchmark_array_with_mask = benchmark_check_array[benchmark_check_array_index]
            
        benchmark_mask2 = np.char.find(benchmark_array_with_mask, part[-1]) >= 0
        benchmark_check_array_index2 = np.where(benchmark_mask2)
        benchmark_array_with_mask2 = benchmark_array_with_mask[benchmark_check_array_index2]
        
        o_index = benchmark_check_array_index[0][benchmark_check_array_index2[0][0]]
        o_value = benchmark_df_array[o_index]
        matched_rows.append(o_value)

        
        
    else:
        print("辨識失敗")


matched_rows_array = np.array(matched_rows)
result_array = np.hstack((coolpc_df_dropna_array,matched_rows_array))


for i2 in range(len(result_array)):
    result_array[i2,8] = result_array[i2,8].replace(",","")
    
    print(result_array[i2,8])





result_array_df = pd.DataFrame(result_array)
result_array_df.columns=['id','name','cores','brand','stock','price','benchmark_id','benchmark_name','benchmark_score','benchmark_rank','benchmark_cp','benchmark_USD']

result_array_df.to_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\result_array_df.csv",index= None)
    
    
    
    
    



