from fastapi import *
from fastapi.responses import FileResponse,JSONResponse
from fastapi import APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
from model.Auth import Auth
import datetime

from model.Component_Data import Component_Data
from model.DB_ORM import DB_Function

# from model.s3_function import s3_function
import json
import os



router = APIRouter()


# 快速配單畫面
@router.get("/order_builder")
async def order_builder(request: Request):
	return FileResponse("./static/order_builder.html", media_type="text/html")


# 會員中心畫面
@router.get("/user_info", include_in_schema=False)
async def user_center(request: Request, userid):
	return FileResponse("./static/account_page.html", media_type="text/html")


# 會員登入
@router.put("/api/user_signin", include_in_schema=False)
async def user_signin(request: Request, body = Body(None)):
	accountFunction=Auth()

	try:
		singin_result = accountFunction.SingIn_Auth(data=body)
		print(singin_result)
		if singin_result['ok']==True:
			return {"token": singin_result['token']} #登入成功傳回token
		else:
			if singin_result['message']==1:
				return JSONResponse(content={"error": True, "message": "無此email"}, status_code=400)
			else:
				return JSONResponse(content={"error": True, "message": "密碼錯誤"}, status_code=400)
	except Exception as e:
		print(e)
		raise HTTPException(status_code=500, detail={"error":True, "message":"伺服器內部錯誤"})
	

# 會員註冊
@router.post("/api/user", include_in_schema=False)
async def user(request: Request, body = Body(None)):
	try:
		data = json.loads(body)
		accountFunction=Auth()
		result = accountFunction.Register(data)
		if result['ok']==True:
			return {"ok": True} #註冊成功
		else:
			#回傳錯誤訊息
			return JSONResponse(content={"error": True, "message": "系統中已存在該Email"}, status_code=400)
		
	except Exception as e:
		print(e)
		# 500:伺服器內部錯誤(中斷)
		raise HTTPException(status_code=500, detail={"error":True, "message":"伺服器內部錯誤"})


# 登入狀態驗證
@router.get("/api/auth", include_in_schema=False)
async def decode_user_signin_info(Authorization: str = Header(None)):
	#解碼
	try:
		accountFunction=Auth()
		result = accountFunction.authenticator(Authorization)
		return result

	except:
		return{"data":None}


#============================ 配單儲存 #============================

@router.post("/api/order_save")
async def save_order(request: Request, body = Body(None),Authorization: str = Header(None)):
    try:
        accountFunction=Auth()
        Auth_result = accountFunction.authenticator(Authorization)
        print(Auth_result)
        user_id = Auth_result['data']['id']

        data = json.loads(body)
        total_price = 0  # 若有計算金額邏輯可加上
        order_name = data['order_name']

        # 插入訂單主檔的 SQL
        sql = "INSERT INTO order_table (user_id, order_name ,total_price) VALUES (%s, %s, %s)"
        parameter = (user_id, order_name ,total_price)

        # 整理成明細資料 list of tuples
        order_details = []
        for t, cid, num in zip(data['compent_type_list'], data['compent_id_list'], data['compent_num_list']):
            order_details.append((t.upper(), int(cid), int(num)))  # 轉大寫+轉型別保險一點

        # 寫入資料庫
        DB_tool = DB_Function()
        DB_tool.SaveOrder2DB(sql, parameter, order_details)

        return {"msg": "儲存成功"}

    except Exception as e:
        print("訂單儲存失敗：", e)
        return {"msg": "儲存失敗", "error": str(e)}


@router.get("/api/user_order_info")
async def save_order(Authorization: str = Header(None)):
      
    try:
        accountFunction=Auth()
        Auth_result = accountFunction.authenticator(Authorization)
        print(Auth_result)
        user_id = Auth_result['data']['id']

        DB_tool = DB_Function()
        sql = "SELECT * FROM order_table WHERE user_id = %s "
        parameter = (user_id,)
        result = DB_tool.search_column(sql, parameter)

        return result

    except Exception as e:
        print(e)
        return{"data":"驗證失敗",}



@router.get("/user_order_read", include_in_schema=False)
async def user_order_read(request: Request, number, Authorization: str = Header(None)):
	return FileResponse("./static/order_builder.html", media_type="text/html")
      


#編輯已儲存訂單
@router.get("/order", include_in_schema=False)
async def order_page(request: Request, number, Authorization: str = Header(None)):
	return FileResponse("./static/edit_order_builder.html", media_type="text/html")


#取得儲存訂單詳細資料
@router.get("/api/order_detail_compent/{order_num}", include_in_schema=False)
async def order_detail_compent(request: Request, order_num, Authorization: str = Header(None)):
    try:
        # accountFunction=Auth()
        # Auth_result = accountFunction.authenticator(Authorization)

        DB_tool = DB_Function()
        sql = 'select * from order_detail_table where order_id = %s'
        parameter = (order_num,)
        search_order_detail_compent_result = DB_tool.search_column(sql,parameter)


        sql = 'select order_name from order_table where id = %s'
        parameter = (order_num,)
        order_name = DB_tool.search_column(sql,parameter)

        # print("aaa"," ",order_name[0]['order_name'])
        # print("aaa")
        # print({"order_id":order_num, "order_name":order_name[0]['order_name'], "data":search_order_detail_compent_result})

        return {"order_id":order_num, "order_name":order_name, "data":search_order_detail_compent_result}
    

    except Exception as e:
        print(e)
        return{"data":"驗證失敗",}


@router.put("/api/update_order_detail_compent/{order_id}", include_in_schema=False)
async def update_order_details(order_id: int, request: Request ,Authorization: str = Header(None)):
    try:
        # accountFunction=Auth()
        # Auth_result = accountFunction.authenticator(Authorization)

        data = await request.json()
        db = DB_Function()
        db.UpdateOrderDetailsOnly(order_id, data)
        return {"message": "訂單明細更新成功"}


    except Exception as e:
        print(e)
        return{"data":"驗證失敗",}





#============================零件 API #============================
@router.get("/api/all_component_data", include_in_schema=False)
async def CPUData(Authorization: str = Header(None)):
    try:
        # accountFunction=Auth()
        # Auth_result = accountFunction.authenticator(Authorization)

        datafunction = Component_Data()
        all_data_dict = datafunction.All_component_data()
		
        return all_data_dict

    except Exception as e:
        print(e)
        return{"data":"驗證失敗",}

#登入狀態驗證
@router.get("/api/cpu_data", include_in_schema=False)
async def CPUData(Authorization: str = Header(None)):
    try:

        datafunction = Component_Data()
        CPU_data_dict = datafunction.CPU_data()
		
        return CPU_data_dict

    except Exception as e:
        print(e)
        return{"data":"驗證失敗",}


@router.get("/api/gpu_data", include_in_schema=False)
async def GPUData(Authorization: str = Header(None)):
    try:
        # accountFunction=Auth()
        # Auth_result = accountFunction.authenticator(Authorization)

        datafunction = Component_Data()
        GPU_data_dict = datafunction.GPU_data()

        return GPU_data_dict

    except:
        return{"data":"驗證失敗"}



@router.get("/api/ram_data", include_in_schema=False)
async def RAM_data(Authorization: str = Header(None)):
    try:
        # accountFunction=Auth()
        # Auth_result = accountFunction.authenticator(Authorization)

        datafunction = Component_Data()
        ram_data_dict = datafunction.RAM_data()

        return ram_data_dict

    except Exception as e:
        print(e)
        return{"data":"驗證失敗"}


@router.get("/api/mb_data", include_in_schema=False)
async def MB_data(Authorization: str = Header(None)):
    try:
        # accountFunction=Auth()
        # Auth_result = accountFunction.authenticator(Authorization)

        datafunction = Component_Data()
        MB_data_dict = datafunction.MB_data()

        return MB_data_dict

    except:
        return{"data":"驗證失敗"}


@router.get("/api/cooler_data", include_in_schema=False)
async def cooler_data(Authorization: str = Header(None)):
    try:
        # accountFunction=Auth()
        # Auth_result = accountFunction.authenticator(Authorization)

        datafunction = Component_Data()
        cooler_data_dict = datafunction.cooler_data()

        return cooler_data_dict

    except:
        return{"data":"驗證失敗"}


@router.get("/api/PSU_data", include_in_schema=False)
async def PSU_data(Authorization: str = Header(None)):
    try:
        # accountFunction=Auth()
        # Auth_result = accountFunction.authenticator(Authorization)

        datafunction = Component_Data()
        PSU_data_dict = datafunction.PSU_data()

        return PSU_data_dict

    except Exception as e:
        print(e)
        return{"data":"驗證失敗"}


@router.get("/api/storage_data", include_in_schema=False)
async def storage_data(Authorization: str = Header(None)):
    try:
        # accountFunction=Auth()
        # Auth_result = accountFunction.authenticator(Authorization)

        datafunction = Component_Data()
        storage_data_dict = datafunction.storage_data()

        return storage_data_dict

    except Exception as e:
        print(e)
        return{"data":"驗證失敗"}



@router.get("/api/case_data", include_in_schema=False)
async def case_data(Authorization: str = Header(None)):
    try:
        # accountFunction=Auth()
        # Auth_result = accountFunction.authenticator(Authorization)

        datafunction = Component_Data()
        case_data_dict = datafunction.case_data()

        return case_data_dict

    except Exception as e:
        print(e)
        return{"data":"驗證失敗"}

