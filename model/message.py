import pandas as pd
import numpy as np
from model.DB_ORM import DB_Function



class message:
    def __init__(self):
        pass

    # 取得所有留言的資料
    def GetMessageData(self):
        sql = "select * from message_table"
        DB_tool = DB_Function()
        DB_search_data = DB_tool.search_column(sql)

        return DB_search_data

    # 取得該留言的資料
    def GetMessageDataByMessageID(self, message_id):
        sql = "select message_table.id, message_table.user_id, message_table.title, message_table.message, message_table.create_at ,member.member_name from message_table inner join member on message_table.user_id = member.id  where message_table.id = %s ;"

        parameter = (message_id,)
        DB_tool = DB_Function()
        DB_search_data = DB_tool.search_column(sql,parameter)

        return DB_search_data
    


    # 取得使用者所有討論的資料
    def GetMessageDataByUserID(self, user_id):
        sql = "select * from message_table where user_id = %s"
        parameter = (user_id,)
        DB_tool = DB_Function()
        DB_search_data = DB_tool.search_column(sql,parameter)

        return DB_search_data
    
    # 取得使用者所有回應的資料
    def GetMessageResponseData(self, message_id):
        # "select message_table.id, message_table.user_id, message_table.title, message_table.message, message_table.create_at ,member.member_name from message_table inner join member on message_table.user_id = member.id  where message_table.id = %s ;"
        
        sql = "select message_response_table.id, message_response_table.user_id, message_response_table.message_id, message_response_table.resoponse, message_response_table.create_at,member.member_name from message_response_table inner join member on message_response_table.user_id = member.id  where message_response_table.message_id = %s ;"
        parameter = (message_id,)
        DB_tool = DB_Function()
        DB_search_data = DB_tool.search_column(sql,parameter)

        return DB_search_data



    # 送出使用者留言回應
    def InsertMessage(self, title_text, message_text, user_id):
        try:
            sql = "insert into message_table (user_id, title, message) values (%s,%s,%s);"
            parameter = (user_id, title_text, message_text,)
            DB_tool = DB_Function()
            DB_tool.insert_data(sql,parameter)

            return{"data":"新增成功",}

        except Exception as e:
            print(e)
            return{"data":"驗證失敗",}




    # 送出使用者留言回應
    def InsertMessageResponse(self, user_id, message_id, response_text):
        try:
            sql = "insert into message_response_table (user_id, message_id, resoponse) values (%s,%s,%s);"
            parameter = (user_id, message_id,response_text,)
            DB_tool = DB_Function()
            DB_tool.insert_data(sql,parameter)

            return{"data":"新增成功",}

        except Exception as e:
            print(e)
            return{"data":"驗證失敗",}






