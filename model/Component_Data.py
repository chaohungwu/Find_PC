import pandas as pd
import numpy as np
from model.DB_ORM import DB_Function

class Component_Data:
    def __init__(self):
        pass
    ##============================= 所有部件資料  =============================

    def All_component_data(self):
        """
        讀取所有零件資料
        """

        sql1 = "select * from cpu_table"
        sql2 = "select * from mb_table"
        sql3 = "select * from ram_table"
        sql4 = "select * from gpu_table"
        sql5 = "select * from storage_table"
        sql6 = "select * from cooler_table"
        sql7 = "select * from psu_table"
        sql8 = "select * from case_table"
        
        all_table_name_list = ["cpu","mb","ram","gpu","storage","cooler","psu","case"]
        all_sql_list = [sql1,sql2,sql3,sql4,sql5,sql6,sql7,sql8]
        all_data_list = []

        for i in range(len(all_sql_list)):
            sql = all_sql_list[i]
            DB_tool = DB_Function()
            DB_search_data = DB_tool.ComponentDataSearch(sql)

            add_data = {all_table_name_list[i]:DB_search_data}
            all_data_list.append(add_data)


        return all_data_list





    ##============================= CPU 資料  =============================
    def CPU_data_clean(self):
        """
        讀取並清理乾淨資料
        """
        df_data = pd.read_csv("./web_crawler/coolpc_cpu_data_new.csv")
        df_data_cleaned = df_data.dropna()
        df_data_cleaned.columns = ['id', 'name','cores','brand','socket_type','price']
        CPU_data_dict = df_data_cleaned.to_dict(orient="records")
        return CPU_data_dict

    def CPU_data_clean2DB(self):
        """
        讀取並清理乾淨資料
        """
        df_data = pd.read_csv("./web_crawler/coolpc_cpu_data_new.csv")
        df_data_cleaned = df_data.dropna()
        df_data_cleaned.columns = ['id', 'name','cores','brand','socket_type','price']
        CPU_data_dict = df_data_cleaned.to_dict(orient="records")

        DB_function = DB_Function()
        sql = "INSERT INTO cpu_table (id, name, cores, brand, socket_type, price)VALUES (%s, %s, %s, %s, %s, %s)"
        
        for i in range(len(df_data_cleaned)):
            data =  df_data_cleaned.iloc[i]
            parameter = ( int(data["id"]),data["name"],int(data["cores"]),data["brand"],data["socket_type"],float(data["price"]))
            DB_function.ComponentData2DB(sql,parameter)
        # return CPU_data_dict

    def CPU_data(self):
        """
        讀取DB資料
        """
        sql = "select * from cpu_table"
        DB_tool = DB_Function()
        DB_search_data = DB_tool.ComponentDataSearch(sql)

        return DB_search_data



    ##============================= GPU 資料  =============================
    def GPU_data_clean(self):
        """
        讀取並清理乾淨資料
        """
        df_data = pd.read_csv("./web_crawler/clean_coolpc_GPU_data_new.csv")
        df_data_cleaned = df_data.dropna()
        df_data_cleaned.columns = ['id', 'brand','chipset_brand','VRAM','name','price']
        GPU_data_dict = df_data_cleaned.to_dict(orient="records")
        return GPU_data_dict

    def GPU_data_clean2DB(self):
        """
        讀取並清理乾淨資料
        """
        df_data = pd.read_csv("./web_crawler/clean_coolpc_GPU_data_new.csv")
        df_data_cleaned = df_data.dropna()
        df_data_cleaned.columns = ['id', 'brand','chipset_brand','VRAM','name','price']
        GPU_data_dict = df_data_cleaned.to_dict(orient="records")

        DB_function = DB_Function()
        sql = "INSERT INTO gpu_table (id, brand, chipset_brand, VRAM, name, price) VALUES (%s, %s, %s, %s, %s, %s)"
        
        for i in range(len(df_data_cleaned)):
            data =  df_data_cleaned.iloc[i]
            parameter = (
                        int(data["id"]),
                        data["brand"],
                        data["chipset_brand"],
                        float(data["VRAM"]),
                        data["name"],
                        float(data["price"])
                        )
            
            DB_function.ComponentData2DB(sql,parameter)

    def GPU_data(self):
        """
        讀取DB資料，帶欄位名稱的JSON
        """
        sql = "select * from gpu_table"
        DB_tool = DB_Function()
        DB_search_data = DB_tool.ComponentDataSearch(sql)

        return DB_search_data


    ##============================= RAM 資料  =============================
    def RAM_data_clean(self):
        """
        讀取並清理乾淨資料
        """
        df_data = pd.read_csv("./web_crawler/clean_coolpc_RAM_data_new.csv")
        df_data_cleaned = df_data.dropna()
        df_data_cleaned.columns = ['id', 'brand','name','clock','type','capacity','dual_channel','price']
        RAM_data_dict = df_data_cleaned.to_dict(orient="records")
        return RAM_data_dict
    
    def RAM_data_clean2DB(self):
        """
        讀取並清理乾淨資料
        """
        df_data = pd.read_csv("./web_crawler/clean_coolpc_RAM_data_new.csv")
        df_data_cleaned = df_data.dropna()
        df_data_cleaned.columns = ['id', 'brand','name','clock','type','capacity','dual_channel','price']
        RAM_data_dict = df_data_cleaned.to_dict(orient="records")

        DB_function = DB_Function()
        sql = "INSERT INTO ram_table (id, brand, name, clock, type, capacity, dual_channel, price) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        
        for i in range(len(df_data_cleaned)):
            data =  df_data_cleaned.iloc[i]
            parameter = (
                        int(data["id"]),
                        str(data["brand"]),
                        str(data["name"]),
                        float(data["clock"]),
                        str(data["type"]),
                        str(data["capacity"]),
                        int(data["dual_channel"]),
                        float(data["price"])
                        )
            
            DB_function.ComponentData2DB(sql,parameter)

    def RAM_data(self):
        """
        讀取DB資料，帶欄位名稱的JSON
        """
        sql = "select * from ram_table"
        DB_tool = DB_Function()
        DB_search_data = DB_tool.ComponentDataSearch(sql)

        return DB_search_data


    ##============================= MB 資料  =============================
    def MB_data_clean(self):
        """
        讀取並清理乾淨資料
        """
        df_data = pd.read_csv("./web_crawler/clean_coolpc_MB_data_new.csv")
        df_data_cleaned = df_data.dropna()
        df_data_cleaned.columns = ['id', 'brand','name','chipse','socket_type','form_factor','price']
        MB_data_dict = df_data_cleaned.to_dict(orient="records")
        return MB_data_dict
    
    def MB_data_clean2DB(self):
        """
        讀取並清理乾淨資料
        """
        df_data = pd.read_csv("./web_crawler/clean_coolpc_MB_data_new.csv")
        df_data_cleaned = df_data.dropna()
        df_data_cleaned.columns = ['id', 'brand','name','chipse','socket_type','form_factor','price']
        MB_data_dict = df_data_cleaned.to_dict(orient="records")

        DB_function = DB_Function()
        sql = "INSERT INTO mb_table (brand, name, chipse, socket_type, form_factor, price) VALUES (%s, %s, %s, %s, %s, %s)"
        
        for i in range(len(df_data_cleaned)):
            data =  df_data_cleaned.iloc[i]
            parameter = (
                        str(data["brand"]),
                        str(data["name"]),
                        str(data["chipse"]),
                        str(data["socket_type"]),
                        str(data["form_factor"]),
                        float(data["price"])
                        )
            
            DB_function.ComponentData2DB(sql,parameter)

    def MB_data(self):
        """
        讀取DB資料，帶欄位名稱的JSON
        """
        sql = "select * from mb_table"
        DB_tool = DB_Function()
        DB_search_data = DB_tool.ComponentDataSearch(sql)

        return DB_search_data


    ##============================= COOLER 資料  =============================
    def cooler_data_clean(self):
        """
        讀取並清理乾淨資料
        """
        df_data = pd.read_csv("./web_crawler/clean_coolpc_cooler_data_new.csv")
        df_data_cleaned = df_data.dropna()
        df_data_cleaned.columns = ['id', 'brand','name','cooler_type','socket_type_w','socket_type_x','socket_type_h','socket_type_y','socket_type_z','height','price']
        cooler_data_dict = df_data_cleaned.to_dict(orient="records")
        return cooler_data_dict


    def cooler_data_clean2DB(self):
        """
        讀取並清理乾淨資料
        """
        df_data = pd.read_csv("./web_crawler/clean_coolpc_cooler_data_new.csv")
        df_data_cleaned = df_data.dropna()
        df_data_cleaned.columns = ['id', 'brand', 'name', 'cooler_type','socket_type_w', 'socket_type_x', 'socket_type_h','socket_type_y', 'socket_type_z', 'height', 'price']
        cooler_data_dict = df_data_cleaned.to_dict(orient="records")

        DB_function = DB_Function()
        sql = "INSERT INTO cooler_table (id, brand, name, cooler_type,socket_type_w, socket_type_x, socket_type_h,socket_type_y, socket_type_z, height, price) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        
        for i in range(len(df_data_cleaned)):
            data =  df_data_cleaned.iloc[i]
            parameter = (
                        int(data["id"]),
                        str(data["brand"]),
                        str(data["name"]),
                        int(data["cooler_type"]),
                        int(data["socket_type_w"]),
                        int(data["socket_type_x"]),
                        int(data["socket_type_h"]),
                        int(data["socket_type_y"]),
                        int(data["socket_type_z"]),
                        float(data["height"]),
                        float(data["price"])
                        )
            
            DB_function.ComponentData2DB(sql,parameter)


    def cooler_data(self):
        """
        讀取DB資料，帶欄位名稱的JSON
        """
        sql = "select * from cooler_table"
        DB_tool = DB_Function()
        DB_search_data = DB_tool.ComponentDataSearch(sql)

        return DB_search_data


    ##============================= PSU 資料  =============================
    def PSU_data_clean(self):
        """
        讀取並清理乾淨資料
        """
        df_data = pd.read_csv("./web_crawler/clean_coolpc_PSU_data_new.csv")
        df_data_cleaned = df_data.dropna()
        df_data_cleaned.columns = ['id','brand','name','model','wattage','form','modular','price']
        PSU_data_dict = df_data_cleaned.to_dict(orient="records")
        return PSU_data_dict

    def PSU_data_clean2DB(self):
        """
        讀取並清理乾淨資料
        """
        df_data = pd.read_csv("./web_crawler/clean_coolpc_PSU_data_new.csv")
        df_data_cleaned = df_data.dropna()
        df_data_cleaned.columns = ['id','brand','name','model','wattage','form','modular','price']
        PSU_data_dict = df_data_cleaned.to_dict(orient="records")

        DB_function = DB_Function()
        sql = "INSERT INTO psu_table (brand, name, model, wattage, form, modular, price) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        
        for i in range(len(df_data_cleaned)):
            data =  df_data_cleaned.iloc[i]
            parameter = (
                        str(data["brand"]),
                        str(data["name"]),
                        str(data["model"]),
                        float(data["wattage"]),
                        str(data["form"]),
                        int(data["modular"]),
                        float(data["price"])
                        )
            
            DB_function.ComponentData2DB(sql,parameter)

    def PSU_data(self):
        """
        讀取DB資料，帶欄位名稱的JSON
        """
        sql = "select * from psu_table"
        DB_tool = DB_Function()
        DB_search_data = DB_tool.ComponentDataSearch(sql)

        return DB_search_data



    ##============================= storage 資料  =============================
    def storage_data_clean(self):
        """
        讀取並清理乾淨資料
        """
        df_data = pd.read_csv("./web_crawler/clean_coolpc_storage_data_new.csv")
        df_data_cleaned = df_data.dropna()
        df_data_cleaned.columns = ['id', 'brand','name','model','type','form','capacity','price']
        storage_data_dict = df_data_cleaned.to_dict(orient="records")
        return storage_data_dict
    

    def storage_data_clean2DB(self):
        """
        讀取並清理乾淨資料
        """
        df_data = pd.read_csv("./web_crawler/clean_coolpc_storage_data_new.csv")
        df_data_cleaned = df_data.dropna()
        df_data_cleaned.columns = ['id', 'brand','name','model','type','form','capacity','price']
        storage_data_dict = df_data_cleaned.to_dict(orient="records")

        DB_function = DB_Function()
        sql = "INSERT INTO storage_table ( brand, name, model, type, form, capacity, price) VALUES ( %s, %s, %s, %s, %s, %s, %s)"
        
        for i in range(len(df_data_cleaned)):
            data =  df_data_cleaned.iloc[i]
            parameter = (
                        str(data["brand"]),
                        str(data["name"]),
                        str(data["model"]),
                        str(data["type"]),
                        str(data["form"]),
                        float(data["capacity"]),
                        float(data["price"])
                        )
            
            DB_function.ComponentData2DB(sql,parameter)

    def storage_data(self):
        """
        讀取DB資料，帶欄位名稱的JSON
        """
        sql = "select * from storage_table"
        DB_tool = DB_Function()
        DB_search_data = DB_tool.ComponentDataSearch(sql)

        return DB_search_data

    ##============================= case 資料  =============================
    def case_data_clean(self):
        """
        讀取並清理乾淨資料
        """
        df_data = pd.read_csv("./web_crawler/clean_coolpc_case_data_new.csv")
        df_data.columns = ['id', 'brand','name','model','motherboard_form','gpu_max_length','psu_max_length','cooler_max_hight','price']
        df_selected = df_data[['id', 'brand','name','model','motherboard_form','price']]
        df_selected_cleaned = df_selected.dropna()

        case_data_dict = df_selected_cleaned.to_dict(orient="records")
        return case_data_dict


    def case_data_clean2DB(self):
        """
        讀取並清理乾淨資料
        """
        df_data = pd.read_csv("./web_crawler/clean_coolpc_case_data_new.csv")
        df_data.columns = ['id', 'brand','name','model','motherboard_form','gpu_max_length','psu_max_length','cooler_max_hight','price']
        df_selected = df_data[['id', 'brand','name','model','motherboard_form','price']]

        df_data_cleaned = df_selected.dropna()
        df_data_cleaned.columns = ['id', 'brand','name','model','motherboard_form','price']

        DB_function = DB_Function()
        sql = "INSERT INTO case_table (brand, name, model, motherboard_form, price) VALUES ( %s, %s, %s, %s, %s)"
        
        for i in range(len(df_data_cleaned)):
            data =  df_data_cleaned.iloc[i]
            parameter = (
                        str(data["brand"]),
                        str(data["name"]),
                        str(data["model"]),
                        str(data["motherboard_form"]),
                        float(data["price"])
                        )
            
            DB_function.ComponentData2DB(sql,parameter)

    def case_data(self):
        """
        讀取DB資料，帶欄位名稱的JSON
        """
        sql = "select * from case_table"
        DB_tool = DB_Function()
        DB_search_data = DB_tool.ComponentDataSearch(sql)

        return DB_search_data

# aaa = Component_Data()
# aaa.case_data_clean2DB()