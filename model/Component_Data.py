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


    def CPU_data(self, page):
        """
        讀取DB資料
        """
        sql = "select * from cpu_table limit %s offset %s;"
        DB_tool = DB_Function()
        parameter = (10, 10*(page-1),)
        DB_search_data = DB_tool.ComponentDataSearch(sql, parameter)


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

    def GPU_data(self, page):
        """
        讀取DB資料，帶欄位名稱的JSON
        """
        sql = "select * from gpu_table limit %s offset %s;"
        DB_tool = DB_Function()
        parameter = (10, 10*(page-1),)
        DB_search_data = DB_tool.ComponentDataSearch(sql, parameter)

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

    def RAM_data(self, page):
        """
        讀取DB資料，帶欄位名稱的JSON
        """
        sql = "select * from ram_table limit %s offset %s;"
        DB_tool = DB_Function()
        parameter = (10, 10*(page-1),)
        DB_search_data = DB_tool.ComponentDataSearch(sql,parameter)

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

    def MB_data(self, page):
        """
        讀取DB資料，帶欄位名稱的JSON
        """
        sql = "select * from mb_table limit %s offset %s;"
        DB_tool = DB_Function()
        parameter = (10, 10*(page-1),)
        DB_search_data = DB_tool.ComponentDataSearch(sql, parameter)

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


    def cooler_data(self,page):
        """
        讀取DB資料，帶欄位名稱的JSON
        """
        sql = "select * from cooler_table limit %s offset %s"
        DB_tool = DB_Function()
        parameter = (10, 10*(page-1),)
        DB_search_data = DB_tool.ComponentDataSearch(sql,parameter)

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

    def PSU_data(self, page):
        """
        讀取DB資料，帶欄位名稱的JSON
        """
        sql = "select * from psu_table limit %s offset %s"
        DB_tool = DB_Function()
        parameter = (10, 10*(page-1),)
        DB_search_data = DB_tool.ComponentDataSearch(sql, parameter)

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

    def storage_data(self ,page):
        """
        讀取DB資料，帶欄位名稱的JSON
        """
        sql = "select * from storage_table limit %s offset %s"
        DB_tool = DB_Function()
        parameter = (10, 10*(page-1),)
        DB_search_data = DB_tool.ComponentDataSearch(sql, parameter)

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

    def case_data(self, page):
        """
        讀取DB資料，帶欄位名稱的JSON
        """
        sql = "select * from case_table limit %s offset %s"
        DB_tool = DB_Function()
        parameter = (10, 10*(page-1),)
        DB_search_data = DB_tool.ComponentDataSearch(sql, parameter)

        return DB_search_data



# 篩選資料
    def componment_filter_option(self,column_index, table_index):
        """
        傳送出選項(唯一值)
        """
        table_dict = {1:"cpu_table",2:"gpu_table", 3:"mb_table",4:"ram_table", 5:"psu_table", 6:"storage_table", 7:"cooler_table", 8:"case_table"}
        column_dict = {1:"brand", 
                       2:"socket_type", 
                       3:"chipset_brand", 
                       4:"series", 
                       5:"chipse", 
                       6:"socket_type", 
                       7:"form_factor",
                       8:"clock",
                       9:'capacity',
                       10:'dual_channel',
                       11:"wattage",
                       12:"form",
                       13:"modular",
                       14:"capacity",
                       15:"height",
                       16:"motherboard_form"}

        # 因為這邊用%s插入字串會有多''單引號的問題，因此用格式化插入的方法(前面有驗證輸入，防止被SQL注入攻擊)
        sql = "SELECT DISTINCT {} FROM {};".format(column_dict[column_index],table_dict[table_index])
        DB_tool = DB_Function()
        DB_search_data = DB_tool.ComponentDataSearch(sql)

        return DB_search_data



# 篩選資料
    def SearchFilterData(self, data):

        table_dict = {1:"cpu_table",2:"gpu_table", 3:"mb_table",4:"ram_table", 5:"psu_table", 6:"storage_table", 7:"cooler_table", 8:"case_table"}
        column_dict = {1:"brand", 
                       2:"socket_type", 
                       3:"chipset_brand", 
                       4:"series", 
                       5:"chipse", 
                       6:"socket_type", 
                       7:"form_factor",
                       8:"clock",
                       9:'capacity',
                       10:'dual_channel',
                       11:"wattage",
                       12:"form",
                       13:"modular",
                       14:"capacity",
                       15:"height",
                       16:"motherboard_form"}

        # cpu篩選
        if data["table_index"]==1:
            sql = "SELECT * FROM cpu_table WHERE"
            parameter  =  ()
            parameter_num = 0


            if data["brand_value"]!=False:
                sql = sql + " brand = %s"
                parameter  =  parameter + (data["brand_value"],)
                parameter_num +=1

            if data["min_price_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"

                sql = sql + " price >= %s"
                parameter  =  parameter + (data["min_price_value"],)
                parameter_num +=1

            if data["max_price_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " price <= %s"
                parameter  =  parameter + (data["max_price_value"],)
                parameter_num +=1

            if data["socket_type_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " socket_type = %s"
                parameter  =  parameter + (data["socket_type_value"],)
                parameter_num +=1

            if data["core_num_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " cores >= %s"
                parameter  =  parameter + (data["core_num_value"],)
                parameter_num +=1


            DB_tool = DB_Function()
            DB_search_data = DB_tool.ComponentDataSearch(sql, parameter)

            return DB_search_data

        # gpu篩選
        if data["table_index"]==2:

            sql = "SELECT * FROM gpu_table WHERE"
            parameter  =  ()
            parameter_num = 0 #這邊用來辨識事不是第一次加入參數，方便辨識是不是需要加AND


            if data["brand_value"]!=False:
                sql = sql + " brand = %s"
                parameter  =  parameter + (data["brand_value"],)
                parameter_num +=1


            if data["min_price_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " price >= %s"
                parameter  =  parameter + (data["min_price_value"],)
                parameter_num +=1


            if data["max_price_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " price <= %s"
                parameter  =  parameter + (data["max_price_value"],)
                parameter_num +=1
                
            if data["chipset_brand_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " chipset_brand = %s"
                parameter  =  parameter + (data["chipset_brand_value"],)
                parameter_num +=1


            if data["series_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " series = %s"
                parameter  =  parameter + (data["series_value"],)
                parameter_num +=1

            if data["vram_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " VRAM >= %s"
                parameter  =  parameter + (data["vram_value"],)
                parameter_num +=1

            print(sql)
            print(parameter)

            DB_tool = DB_Function()
            DB_search_data = DB_tool.ComponentDataSearch(sql, parameter)

            return DB_search_data
        
        # mb篩選
        if data["table_index"]==3:

            sql = "SELECT * FROM mb_table WHERE"
            parameter  =  ()
            parameter_num = 0 #這邊用來辨識事不是第一次加入參數，方便辨識是不是需要加AND

            if data["brand_value"]!=False:
                sql = sql + " brand = %s"
                parameter  =  parameter + (data["brand_value"],)
                parameter_num +=1


            if data["min_price_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " price >= %s"
                parameter  =  parameter + (data["min_price_value"],)
                parameter_num +=1


            if data["max_price_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " price <= %s"
                parameter  =  parameter + (data["max_price_value"],)
                parameter_num +=1


            if data["chipse_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " chipse = %s"
                parameter  =  parameter + (data["chipse_value"],)
                parameter_num +=1


            if data["mb_socket_type_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " socket_type = %s"
                parameter  =  parameter + (data["mb_socket_type_value"],)
                parameter_num +=1

            if data["form_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " form_factor >= %s"
                parameter  =  parameter + (data["form_value"],)
                parameter_num +=1

            print(sql)
            print(parameter)

            DB_tool = DB_Function()
            DB_search_data = DB_tool.ComponentDataSearch(sql, parameter)

            return DB_search_data


        # ram篩選
        if data["table_index"]==4:

            sql = "SELECT * FROM ram_table WHERE"
            parameter  =  ()
            parameter_num = 0 #這邊用來辨識事不是第一次加入參數，方便辨識是不是需要加AND

            if data["brand_value"]!=False:
                sql = sql + " brand = %s"
                parameter  =  parameter + (data["brand_value"],)
                parameter_num +=1


            if data["min_price_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " price >= %s"
                parameter  =  parameter + (data["min_price_value"],)
                parameter_num +=1


            if data["max_price_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " price <= %s"
                parameter  =  parameter + (data["max_price_value"],)
                parameter_num +=1



            if data["clock_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " clock = %s"
                parameter  =  parameter + (data["clock_value"],)
                parameter_num +=1


            if data["ram_capacity_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " capacity = %s"
                parameter  =  parameter + (data["ram_capacity_value"],)
                parameter_num +=1


            if data["ram_dual_channel_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " dual_channel = %s"
                parameter  =  parameter + (data["ram_dual_channel_value"],)
                parameter_num +=1

            print(sql)
            print(parameter)

            DB_tool = DB_Function()
            DB_search_data = DB_tool.ComponentDataSearch(sql, parameter)

            return DB_search_data
        

        # psu篩選
        if data["table_index"]==5:

            sql = "SELECT * FROM psu_table WHERE"
            parameter  =  ()
            parameter_num = 0 #這邊用來辨識事不是第一次加入參數，方便辨識是不是需要加AND

            if data["brand_value"]!=False:
                sql = sql + " brand = %s"
                parameter  =  parameter + (data["brand_value"],)
                parameter_num +=1


            if data["min_price_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " price >= %s"
                parameter  =  parameter + (data["min_price_value"],)
                parameter_num +=1


            if data["max_price_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " price <= %s"
                parameter  =  parameter + (data["max_price_value"],)
                parameter_num +=1



            if data["wattage_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " wattage = %s"
                parameter  =  parameter + (data["wattage_value"],)
                parameter_num +=1


            if data["form_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " form = %s"
                parameter  =  parameter + (data["form_value"],)
                parameter_num +=1


            if data["modular_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " modular = %s"
                parameter  =  parameter + (data["modular_value"],)
                parameter_num +=1

            print(sql)
            print(parameter)

            DB_tool = DB_Function()
            DB_search_data = DB_tool.ComponentDataSearch(sql, parameter)

            return DB_search_data


        # storage篩選
        if data["table_index"]==6:

            sql = "SELECT * FROM storage_table WHERE"
            parameter  =  ()
            parameter_num = 0 #這邊用來辨識事不是第一次加入參數，方便辨識是不是需要加AND

            if data["brand_value"]!=False:
                sql = sql + " brand = %s"
                parameter  =  parameter + (data["brand_value"],)
                parameter_num +=1


            if data["min_price_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " price >= %s"
                parameter  =  parameter + (data["min_price_value"],)
                parameter_num +=1


            if data["max_price_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " price <= %s"
                parameter  =  parameter + (data["max_price_value"],)
                parameter_num +=1



            if data["capacity_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " capacity = %s"
                parameter  =  parameter + (data["capacity_value"],)
                parameter_num +=1


            print(sql)
            print(parameter)

            DB_tool = DB_Function()
            DB_search_data = DB_tool.ComponentDataSearch(sql, parameter)

            return DB_search_data



        # cooler篩選
        if data["table_index"]==7:

            sql = "SELECT * FROM cooler_table WHERE"
            parameter  =  ()
            parameter_num = 0 #這邊用來辨識事不是第一次加入參數，方便辨識是不是需要加AND

            if data["brand_value"]!=False:
                sql = sql + " brand = %s"
                parameter  =  parameter + (data["brand_value"],)
                parameter_num +=1


            if data["min_price_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " price >= %s"
                parameter  =  parameter + (data["min_price_value"],)
                parameter_num +=1


            if data["max_price_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " price <= %s"
                parameter  =  parameter + (data["max_price_value"],)
                parameter_num +=1



            if data["height_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " height = %s"
                parameter  =  parameter + (data["height_value"],)
                parameter_num +=1


            print(sql)
            print(parameter)

            DB_tool = DB_Function()
            DB_search_data = DB_tool.ComponentDataSearch(sql, parameter)
            return DB_search_data


        # case篩選
        if data["table_index"]==8:

            sql = "SELECT * FROM case_table WHERE"
            parameter  =  ()
            parameter_num = 0 #這邊用來辨識事不是第一次加入參數，方便辨識是不是需要加AND

            if data["brand_value"]!=False:
                sql = sql + " brand = %s"
                parameter  =  parameter + (data["brand_value"],)
                parameter_num +=1


            if data["min_price_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " price >= %s"
                parameter  =  parameter + (data["min_price_value"],)
                parameter_num +=1


            if data["max_price_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " price <= %s"
                parameter  =  parameter + (data["max_price_value"],)
                parameter_num +=1



            if data["motherboard_form_value"]!=False:
                if parameter_num !=0:
                    sql = sql + " AND"
                sql = sql + " motherboard_form = %s"
                parameter  =  parameter + (data["motherboard_form_value"],)
                parameter_num +=1


            print(sql)
            print(parameter)

            DB_tool = DB_Function()
            DB_search_data = DB_tool.ComponentDataSearch(sql, parameter)
            return DB_search_data


        else:
            pass


        return data

















    def componment_filter_data(self, column_index, table_index, page):
        """
        傳送出選項查詢的資料內容
        """
        table_dict = {1:"cpu_table",2:"gpu_table", 3:"mb_table",4:"ram_table", 5:"storage_table", 6:"cooler_table", 7:"psu_table", 8:"case_table"}
        column_dict = {1:"brand", 2:"socket_type", 3:"cores"}

        sql = "select * from {} limit %s offset %s where %s = %s".format(table_dict['table_index'])
        DB_tool = DB_Function()
        parameter = (10, 10*(page-1),)
        DB_search_data = DB_tool.ComponentDataSearch(sql, parameter)

        return DB_search_data



    def componment_filter_count(self, table_index):
        """
        傳送出選項篩選的筆數
        """
        table_dict = {1:"cpu_table",2:"gpu_table", 3:"mb_table",4:"ram_table", 5:"storage_table", 6:"cooler_table", 7:"psu_table", 8:"case_table"}

        sql_count = "SELECT COUNT(*) FROM {};".format(table_dict[table_index])
        DB_tool = DB_Function()
        DB_search_count = DB_tool.ComponentDataSearch(sql_count)

        return {"count":DB_search_count[0]['COUNT(*)']}




    # 從訂單資料查詢零件
    def get_order_components_fun(self, order_id):

        DB_tool = DB_Function()
        DB_search_result = DB_tool.get_order_components(order_id)

        return DB_search_result







