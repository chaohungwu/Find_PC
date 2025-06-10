import os
from dotenv import load_dotenv
import mysql.connector
from mysql.connector import pooling


# 載入 .env 檔案
load_dotenv()

## 讀取環境變數
db_name = os.getenv("db_name")
db_user = os.getenv("db_user")
db_password = os.getenv("db_password")

dbconfig = {
            "database": db_name,
            "user": db_user,
            "password": db_password,

            # 本機測試
            "host": "localhost",

            # 部屬用
            # "host": "mysql_db",
            # "port": "3306"
            }

pool = mysql.connector.pooling.MySQLConnectionPool(pool_name="find_pc_db",
                                            pool_size=15,
                                            pool_reset_session=True,
                                            **dbconfig)


class DB_Function:
    def __init__(self):
        pass
    
    # 搜尋
    def search_column(self, sql, parameter=None):
        """
        sql: str 欲使用的 SQL 語法
        parameter: tuple 或 list，SQL 參數化用的值
        回傳: list[dict]，每筆資料為一個 dict，含欄位名稱
        """
        connection = pool.get_connection()
        cursor = connection.cursor()

        if parameter:
            cursor.execute(sql, parameter)
        else:
            cursor.execute(sql)

        columns = [desc[0] for desc in cursor.description]  # 取得欄位名稱
        results = cursor.fetchall()
        data = [dict(zip(columns, row)) for row in results]  # 將每筆轉為 dict

        cursor.close()
        connection.close()  # return connection to the pool

        return data


    # 搜尋
    def search(self, sql, parameter=None):
        """
        sql:str 欲使用的sql語法
        """
        if parameter: #如果有輸入參數
            connection = pool.get_connection()
            cursor = connection.cursor()
            cursor.execute(sql, parameter)#依據頁數查詢資料
            db_search = cursor.fetchall()
            cursor.close()
            connection.close() # return connection to the pool.

            return db_search
        
        else:
            connection = pool.get_connection()
            cursor = connection.cursor()
            cursor.execute(sql)#依據頁數查詢資料
            db_search = cursor.fetchall()
            cursor.close()
            connection.close() # return connection to the pool.

            return db_search
        
    # 搜尋
    def insert_data(self, sql, parameter):
        """
        sql:str 欲使用的sql語法
        """
        connection = pool.get_connection()
        cursor = connection.cursor()
        cursor.execute(sql, parameter)
        connection.commit()
        cursor.close()
        connection.close()



    # 註冊功能
    def insert(self, sql, parameter):
        """
        parameter:(member_name, member_email, member_password, member_hash_password)
        """
        connection = pool.get_connection()
        cursor = connection.cursor()
        db_sql = "insert into member (member_name, member_email, member_password, member_hash_password) values (%s,%s,%s,%s);"
        cursor.execute(db_sql, parameter)
        connection.commit()
        cursor.close()
        connection.close()


    # 匯入零件資料功能
    def ComponentData2DB(self, sql, parameter):
        """
        parameter：(
                    cpu_data["id"],
                    cpu_data["name"],
                    int(cpu_data["cores"]),
                    cpu_data["brand"],
                    cpu_data["socket_type"],
                    float(cpu_data["price"])
                    )
        """
        connection = pool.get_connection()
        cursor = connection.cursor()
        db_sql = sql
        cursor.execute(db_sql, parameter)
        connection.commit()
        cursor.close()
        connection.close()


    def ComponentDataSearch(self, sql, parameter=None):
        """
        parameter：(
                    cpu_data["id"],
                    cpu_data["name"],
                    int(cpu_data["cores"]),
                    cpu_data["brand"],
                    cpu_data["socket_type"],
                    float(cpu_data["price"])
                    )
        """

        connection = pool.get_connection()
        cursor = connection.cursor()
        cursor.execute(sql, parameter)#依據頁數查詢資料

        columns = [col[0] for col in cursor.description]  # 取得欄位名稱
        rows = cursor.fetchall()
        # db_search = cursor.fetchall()

        cursor.close()
        connection.close() # return connection to the pool.

        # 將每一列轉換為 dict
        result = [dict(zip(columns, row)) for row in rows]


        return result




    # 儲存order
    # def SaveOrder2DB(self, sql, parameter ,order_details):
    #     """
    #     """
    #     connection = pool.get_connection()
    #     cursor = connection.cursor()
    #     db_sql = sql
    #     cursor.execute(db_sql, parameter)


    #     connection.commit()
    #     cursor.close()
    #     connection.close()

    def SaveOrder2DB(self, sql, parameter, order_details):
        """
        儲存訂單主檔與明細資料到資料庫

        - sql: 用於插入 order_table 的 SQL 語句
        - parameter: 對應 order_table 欄位的值（tuple）
        - order_details: list of tuples，每筆為 (component_type, component_id, quantity)
        """
        connection = pool.get_connection()
        cursor = connection.cursor()
        try:
            # 插入主檔
            cursor.execute(sql, parameter)
            order_id = cursor.lastrowid  # 取得剛剛插入的訂單 ID

            # 插入每筆明細資料
            detail_sql = """
            INSERT INTO order_detail_table (order_id, component_type, component_id, quantity)
            VALUES (%s, %s, %s, %s)
            """
            for detail in order_details:
                component_type, component_id, quantity = detail
                cursor.execute(detail_sql, (order_id, component_type, component_id, quantity))

            # 提交
            connection.commit()

        
        except Exception as e:
            print("寫入訂單失敗：", e)
            connection.rollback()
        finally:
            cursor.close()
            connection.close()




    def DeleteOrder(self, sql, parameter, order_id):
        connection = pool.get_connection()
        cursor = connection.cursor()
        delete_sql = sql
        cursor.execute(delete_sql, parameter)
        connection.commit()
        cursor.close()
        connection.close()





    def UpdateOrderDetailsOnly(self, order_id: int, frontend_data: dict):
        """
        更新指定 order_id 的 order_detail_table 資料，
        不動 order_table，只刪除原明細再插入新明細。

        frontend_data 應包含：
        - compent_type_list: list[str]
        - compent_id_list: list[str or int]
        - compent_num_list: list[str or int]
        """

        compent_type_list = frontend_data.get("compent_type_list", [])
        compent_id_list = frontend_data.get("compent_id_list", [])
        compent_num_list = frontend_data.get("compent_num_list", [])

        # 驗證資料長度一致
        if not (len(compent_type_list) == len(compent_id_list) == len(compent_num_list)):
            raise ValueError("欄位長度不一致，請確認傳入資料")

        # 整理成要插入的格式：[(order_id, type, id, qty), ...]
        insert_data = [
            (
                order_id,
                compent_type_list[i],
                int(compent_id_list[i]),
                int(compent_num_list[i])
            )
            for i in range(len(compent_type_list))
        ]

        connection = pool.get_connection()
        cursor = connection.cursor()

        try:
            # 1. 刪除原本的明細
            delete_sql = "DELETE FROM order_detail_table WHERE order_id = %s"
            cursor.execute(delete_sql, (order_id,))

            # 2. 插入新明細
            insert_sql = """
            INSERT INTO order_detail_table (order_id, component_type, component_id, quantity)
            VALUES (%s, %s, %s, %s)
            """
            cursor.executemany(insert_sql, insert_data)

            connection.commit()
            print(f"order_id = {order_id} 的明細已成功更新")

        except Exception as e:
            print("更新明細失敗：", e)
            connection.rollback()
        finally:
            cursor.close()
            connection.close()










    # def OrderDetailSearch(self, sql, parameter, order_details):
        # """
        # 儲存訂單主檔與明細資料到資料庫

        # - sql: 用於插入 order_table 的 SQL 語句
        # - parameter: 對應 order_table 欄位的值（tuple）
        # - order_details: list of tuples，每筆為 (component_type, component_id, quantity)
        # """
        # connection = pool.get_connection()
        # cursor = connection.cursor()
        # try:
        #     # 插入主檔
        #     cursor.execute(sql, parameter)
        #     order_id = cursor.lastrowid  # 取得剛剛插入的訂單 ID

        #     # 插入每筆明細資料
        #     detail_sql = """
        #     INSERT INTO order_detail_table (order_id, component_type, component_id, quantity)
        #     VALUES (%s, %s, %s, %s)
        #     """
        #     for detail in order_details:
        #         component_type, component_id, quantity = detail
        #         cursor.execute(detail_sql, (order_id, component_type, component_id, quantity))

        #     # 提交
        #     connection.commit()

        
        # except Exception as e:
        #     print("寫入訂單失敗：", e)
        #     connection.rollback()
        # finally:
        #     cursor.close()
        #     connection.close()