import urllib
import urllib.request as req
import bs4
import time
import pandas as pd
import chardet
import urllib.request as req
import numpy as np
import re

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



def GetAllData_n():
    data = getdata("https://www.coolpc.com.tw/evaluate.php")
    root = bs4.BeautifulSoup(data, "html.parser")
    all_data = root.find_all("option",)#尋找所有<div class="title">的標題 取得所有文章標題
    # article_like = root.find_all("div", class_="nrec")#尋找所有<div class="nrec">的標題 取得所有文章推數
    # 取得所有 <option> 元素
    # 印出每個 <option> 的文字
    # for opt in CPU_all:
    #     print(opt.text.strip())
    all_data_list = []

    for optgroup in root.find_all("optgroup"):
        group_label = optgroup.get("label")
        for option in optgroup.find_all("option"):
            # print(f"[{group_label}] {option.text.strip()}")
            all_data_list.append(f"[{group_label}] {option.text.strip()}")

    all_data_list_df = pd.DataFrame(all_data_list)
    all_data_list_df.to_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_data.csv")


def GetCPUData():
    data = getdata("https://www.coolpc.com.tw/evaluate.php")
    root = bs4.BeautifulSoup(data, "html.parser")
    all_data_list_cpu=[]
    seen_texts = set() #用set來避免重複的

    cpugroup0 = root.find("select", attrs={"name": "n4"}) #取得CPU那一欄的選擇框
    cpugroups = cpugroup0.find_all("optgroup")


    all_option = cpugroup0.find_all("option")
    grouped_option = sum([group.find_all("option") for group in cpugroups], [])
    print(f"總 option 數：{len(all_option)}")
    print(f"optgroup 內 option 數：{len(grouped_option)}")


    for group in cpugroups:
        label = group.get("label")

        # 只抓這個 group 內的 options（不抓整頁）
        options = group.find_all("option", recursive=False)

        count = 0
        for option in options:
            text = option.text.strip()
            if not text or "共有商品" in text:
                continue

            if text in seen_texts:
                continue  # 避免重複

            seen_texts.add(text)
            count += 1
            all_data_list_cpu.append({
                "Accessories": text,
                "label": label
            })
        print(f"分類：{label} → 共 {len(options)} 筆")


    df = pd.DataFrame(all_data_list_cpu)
    df.to_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_cpu_data_with_label.csv")



def GetAllData2CSV():
    data = getdata("https://www.coolpc.com.tw/evaluate.php")
    root = bs4.BeautifulSoup(data, "html.parser")
    all_data_list_cpu=[]
    seen_texts = set() #用set來避免重複的

    #CPU、MB、RAM、硬碟、散熱、顯卡、機殼、PSU
    data_name=["CPU","MB","RAM","storage","cooler","GPU","case","PSU"]
    data_name_select = ["n4","n5","n6","n7","n11","n12","n14","n15"]

    for i in range (len(data_name_select)):
        all_data_list_cpu=[]
        seen_texts = set() #用set來避免重複的
        cpugroup0 = root.find("select", attrs={"name": data_name_select[i]}) #取得CPU那一欄的選擇框
        cpugroups = cpugroup0.find_all("optgroup")


        for group in cpugroups:
            label = group.get("label")

            # 只抓這個 group 內的 options（不抓整頁）
            options = group.find_all("option", recursive=False)

            count = 0
            for option in options:
                text = option.text.strip()
                if not text or "共有商品" in text:
                    continue

                if text in seen_texts:
                    continue  # 避免重複

                seen_texts.add(text)
                count += 1
                all_data_list_cpu.append({
                    "label": label,
                    "component": text
                })


        df = pd.DataFrame(all_data_list_cpu)
        df.to_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_data_noclean_{}.csv".format(data_name[i]))


GetAllData2CSV()

#只取出原價資料
def OriginalPriceData_CPU():
    """
    1. 讀入CSV
    2. 將特價、專案的價格移除
    3. 
    """

    data = pd.read_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_cpu_data_with_label_CPU.csv")
    data_array = np.array(data)

    core_num_llist = []
    brand_list=[]
    stocket_list=[]
    price_list=[]
    name_list = []


    for i in range(len(data_array)):
        #1. cpu名稱
        ## 篩選去除所有的合購專案
        cpu_data_name = data_array[i,2]
        cpu_data_name_filter= cpu_data_name.find("=>")

        if cpu_data_name_filter == -1:
            pass
        else:
            data_array[i,1]=""
            data_array[i,2]=""


        #2. 核心數
        core_num = data_array[i,2]
        core_num_filter= cpu_data_name.find("【")
        core_num_filter2= cpu_data_name.find("核")

        if core_num_filter and core_num_filter2 ==-1:
            core_num_llist.append("")

        else:
            core_num_llist.append(core_num[core_num_filter+1 : core_num_filter2])


        #3. 品牌
        brand_name = data_array[i,2]
        brand_name_filter= brand_name.find("Intel")
        brand_name_filter2= brand_name.find("Sapphire")
        brand_name_filter3= brand_name.find("AMD")

        if brand_name_filter != -1:
            brand_list.append("Intel")
        elif brand_name_filter2 != -1:
            brand_list.append("Intel")
        elif brand_name_filter3 != -1:
            brand_list.append("AMD")
        else:
            brand_list.append("")


        #4. 腳位
        stocket_name = data_array[i,1]
        stocket_name_filter= stocket_name.find("Ultra")
        stocket_name_filter2= stocket_name.find("14代")
        stocket_name_filter3= stocket_name.find("12代")
        stocket_name_filter4= stocket_name.find("Xeon")
        stocket_name_filter5= stocket_name.find("AM4")
        stocket_name_filter6= stocket_name.find("AM5")
        stocket_name_filter7= stocket_name.find("Threadripper")
        
        if stocket_name_filter != -1:
            stocket_list.append("1851")
        elif stocket_name_filter2 != -1:
            stocket_list.append("1700")
        elif stocket_name_filter3 != -1:
            stocket_list.append("1700")
        elif stocket_name_filter4 != -1:
            stocket_list.append("4677")
        elif stocket_name_filter5 != -1:
            stocket_list.append("AM4")
        elif stocket_name_filter6 != -1:
            stocket_list.append("AM5")
        elif stocket_name_filter7 != -1:
            stocket_list.append("sTR5")
        else:
            stocket_list.append("")


        #5. 價格
        price_name = data_array[i,2]
        price_name_filter= price_name.rfind("$")
        price_name_filter2= price_name.rfind("◆")
        price_name_filter3= price_name.rfind("★")

        if price_name_filter2!=-1:
            price_list.append(price_name[price_name_filter+1:price_name_filter2-1])
        else:
            price_list.append(price_name[price_name_filter+1:price_name_filter3-1])


        #6. 零件名稱
        name = data_array[i,2]
        name_filter= name.find("【")
        name_filter2= name.find("任搭")

        if name_filter2==-1:
            new_name = name[:name_filter]
            new_name = new_name.replace(" 代理盒裝","")
            new_name = new_name.replace("代理盒裝","")
            new_name = new_name.replace(" 盒","")
            new_name = new_name.replace("盒","")

            name_list.append(new_name)
        else:
            name_list.append("")


    name_list_array = np.array(name_list)
    name_list_array = np.reshape(name_list_array,(len(name_list_array),1))

    core_num_list_array = np.array(core_num_llist)
    core_num_list_array = np.reshape(core_num_list_array,(len(core_num_list_array),1))

    brand_list_array = np.array(brand_list)
    brand_list_array = np.reshape(brand_list_array,(len(brand_list_array),1))

    stocket_list_array = np.array(stocket_list)
    stocket_list_array = np.reshape(stocket_list_array,(len(stocket_list_array),1))

    price_list_array = np.array(price_list)
    price_list_array = np.reshape(price_list_array,(len(price_list_array),1))


    all_data_array = np.hstack((name_list_array, core_num_list_array))
    all_data_array = np.hstack((all_data_array, brand_list_array))
    all_data_array = np.hstack((all_data_array, stocket_list_array))
    all_data_array = np.hstack((all_data_array, price_list_array))


    df = pd.DataFrame(all_data_array)
    df.to_csv("./web_crawler/coolpc_cpu_data_new.csv")




def OriginalPriceData_GPU():
    """
    處理顯示卡資料，萃取以下欄位：
    1. 廠牌（ASUS、MSI、GIGABYTE...）
    2. 晶片品牌（NVIDIA、AMD、INTEL）
    3. 顯存大小（例如 8G、16GB）
    4. 顯示卡名稱
    5. 價格（若為特價取最終售價）
    """

    data = pd.read_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_cpu_data_with_label_GPU.csv")
    data_array = np.array(data)

    brand_list = []
    chip_brand_list = []
    vram_list = []
    name_list = []
    price_list = []

    for row in data_array:
        label, component = row[1], row[2]

        # 1. 廠牌（從前綴抓）
        brand_match = re.match(r"(華碩|微星|技嘉|撼訊|ZOTAC|INNO3D|ACER|麗臺|酷碼|賽德斯|華擎)", component)
        brand = brand_match.group(1) if brand_match else ""
        brand_list.append(brand)

        # 2. 晶片品牌（從 label 判斷）
        if "NVIDIA" in label:
            chip_brand_list.append("NVIDIA")
        elif "AMD" in label:
            chip_brand_list.append("AMD")
        elif "INTEL" in label:
            chip_brand_list.append("INTEL")
        else:
            chip_brand_list.append("")

        # 3. 顯存（搜尋幾 GB 或 G 的格式）
        vram_match = re.search(r"(\d{1,3})\s*(GB|G)", component.upper())
        vram = f"{vram_match.group(1)}GB" if vram_match else ""
        vram_list.append(vram)

        # 4. 顯示卡名稱（抓前段至 "(" 或 ","）
        name_match = re.match(r"[^,（(]+", component)
        name = name_match.group(0).strip() if name_match else ""
        name_list.append(name)

        # 5. 價格（從最後一個 $ 抓到數字）
        price_match = re.search(r"\$(\d+)", component.replace(",", ""))
        price = price_match.group(1) if price_match else ""
        price_list.append(price)

    # 組成 DataFrame
    df = pd.DataFrame({
        "廠牌": brand_list,
        "晶片品牌": chip_brand_list,
        "顯存": vram_list,
        "名稱": name_list,
        "價格": price_list
    })

    df.to_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_gpu_data_with_label_gpu_test_clean.csv")




def OriginalPriceData_MB():
    """
    處理主機板資料，萃取以下欄位：
    1. 廠牌
    2. 名稱
    3. 晶片組
    4. 腳位
    5. 主機板尺寸
    6. 價格
    """

    data = pd.read_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_cpu_data_with_label_MB.csv")
    data_array = np.array(data)

    brand_list = []
    name_list = []
    chipset_list = []
    socket_list = []
    size_list = []
    price_list = []

    for row in data_array:
        label, component = row[1], row[2]

        # 廠牌（從 component 前綴擷取）
        brand_match = re.match(r"(華碩|微星|技嘉|華擎|ASUS|MSI|GIGABYTE|ASRock)", component)
        brand = brand_match.group(1) if brand_match else ""
        brand_list.append(brand)

        # 名稱（擷取 component 中前段名稱）
        name_match = re.match(r"[^,（(]+", component)
        name = name_match.group(0).strip() if name_match else ""
        name_list.append(name)

        # 晶片組（從 label 擷取前兩詞）
        chipset_match = re.match(r"(\w+\s*\w*)", label)
        chipset = chipset_match.group(1).strip() if chipset_match else ""
        chipset_list.append(chipset)

        # 腳位（label 中擷取 “xxxx腳位”）
        socket_match = re.search(r"(\d{3,5}|AM\d|sTR\d|sWRX\d+)\s*腳位", label)
        socket = socket_match.group(0).replace(" ", "") if socket_match else ""
        socket_list.append(socket)

        # 主機板尺寸（從 component 中抓取 Mini-ITX, M-ATX, ATX, E-ATX, CEB, EEB 等）
        size_match = re.search(r"(Mini-ITX|M-ATX|ATX|E-ATX|CEB|EEB)", component, re.IGNORECASE)
        size = size_match.group(0).upper() if size_match else ""
        size_list.append(size)

        # 價格（擷取最後一個 $ 後的數字）
        price_match = re.search(r"\$(\d+)", component.replace(",", ""))
        price = price_match.group(1) if price_match else ""
        price_list.append(price)

    # 建立 DataFrame 並輸出
    df = pd.DataFrame({
        "廠牌": brand_list,
        "名稱": name_list,
        "晶片組": chipset_list,
        "腳位": socket_list,
        "主機板尺寸": size_list,
        "價格": price_list
    })

    df.to_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_MB_data_with_label_MB_test_clean.csv")





def OriginalPriceData_RAM():
    """
    處理記憶體資料，萃取以下欄位：
    1. 品牌（例如 金士頓、威剛、芝奇、十銓、海盜船 等）
    2. 頻率（例如 3200、3600）
    3. 記憶體類型（DDR4、DDR5）
    4. 單支容量（例如 8GB、16GB）
    5. 雙通道（0：無雙通道，1：有雙通道）
    6. 價格
    """

    data = pd.read_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_cpu_data_with_label_RAM.csv")
    data_array = np.array(data)

    brand_list = []
    name_list = []
    freq_list = []
    ram_type_list = []
    capacity_list = []
    dual_channel_list = []
    price_list = []

    for row in data_array:
        component = row[2]

        # 品牌（前綴）
        brand_match = re.match(r"(金士頓|威剛|芝奇|十銓|海盜船|美光|宇帷|影馳|KLEVV|Crucial|CORSAIR|ADATA|Kingston|G\.Skill|TeamGroup)", component, re.IGNORECASE)
        brand = brand_match.group(1) if brand_match else ""
        brand_list.append(brand)

        # 名稱（從開頭到第一個「,」、「(」或「（」為止）
        name_match = re.match(r"[^,（(]+", component)
        name = name_match.group(0).strip() if name_match else ""
        name_list.append(name)

        # 頻率（通常為數字後面接 MHz 或直接數字）
        freq_match = re.search(r"(\d{3,5})\s*(MHz)?", component)
        freq = freq_match.group(1) if freq_match else ""
        freq_list.append(freq)

        # 記憶體類型（DDR4、DDR5）
        type_match = re.search(r"(DDR\d)", component.upper())
        ram_type = type_match.group(1) if type_match else ""
        ram_type_list.append(ram_type)

        # 單支容量（例：8GB、16G，取第一個容量數值）
        cap_match = re.search(r"(\d{1,3})\s*(G|GB)", component.upper())
        capacity = f"{cap_match.group(1)}GB" if cap_match else ""
        capacity_list.append(capacity)

        # 是否雙通道（判斷 2x、2條）
        dual_match = re.search(r"(2條|2X|\*2)", component.upper())
        dual_channel = 1 if dual_match else 0
        dual_channel_list.append(dual_channel)

        # 價格（最後一個 $ 後的數字）
        price_match = re.search(r"\$(\d+)", component.replace(",", ""))
        price = price_match.group(1) if price_match else ""
        price_list.append(price)

    df = pd.DataFrame({
        "品牌": brand_list,
        "名稱": name_list,
        "頻率": freq_list,
        "記憶體類型": ram_type_list,
        "單支容量": capacity_list,
        "雙通道": dual_channel_list,
        "價格": price_list
    })

    df.to_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_RAM_data_with_label_RAM_test_clean.csv")





def OriginalPriceData_Cooler():
    data = pd.read_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_cpu_data_with_label_cooler.csv")
    data_array = np.array(data)

    brand_list = []
    name_list = []
    cooling_type_list = []
    socket_w_list = []
    socket_x_list = []
    socket_h_list = []
    socket_y_list = []
    socket_z_list = []
    height_list = []
    price_list = []

    for row in data_array:
        label, component = row[1], row[2]

        # 品牌
        brand_match = re.match(r"(華碩|微星|技嘉|利民|九州風神|酷碼|幾何未來|銀欣|Antec|Apexgaming|be quiet|海盜船|Thermaltake|NZXT|Noctua|Fractal|Montech|COUGAR|darkFlash|ID-COOLING|DEEPCOOL|保銳 ENERMAX|追風者 Phanteks|LIAN LI|喬思伯)", component)
        brand = brand_match.group(1) if brand_match else ""
        brand_list.append(brand)

        # 名稱
        name_match = re.match(r"[^,（(]+", component)
        name = name_match.group(0).strip() if name_match else ""
        name_list.append(name)


        # 風冷水冷：1 為水冷，0 為風冷
        cooling_type_list.append(1)


        # 支援腳位        
        socket_filter1 = component.find("【")
        socket_filter2 = component.find("】")
        support_socket = component[socket_filter1:socket_filter2]

        if "W" in support_socket:
            socket_w_list.append(1)
        else:
            socket_w_list.append(0)


        if "X" in support_socket:
            socket_x_list.append(1)
        else:
            socket_x_list.append(0)

        if "H" in support_socket:
            socket_h_list.append(1)
        else:
            socket_h_list.append(0)

        if "Y" in support_socket:
            socket_y_list.append(1)
        else:
            socket_y_list.append(0)

        if "Z" in support_socket:
            socket_z_list.append(1)
        else:
            socket_z_list.append(0)



        # socket_w_list.append(int(any(kw in component for kw in socket_w_keywords)))
        # socket_x_list.append(int(any(kw in component for kw in socket_x_keywords)))
        # socket_h_list.append(int(any(kw in component for kw in socket_h_keywords)))
        # socket_y_list.append(int(any(kw in component for kw in socket_y_keywords)))
        # socket_z_list.append(int(any(kw in component for kw in socket_z_keywords)))

        # 高度（mm）
        height_match_mm = re.search(r"(\d{2,3})\s*mm", component.lower())
        height_match_cm = re.search(r"(\d{1,2}\.?\d{0,2})\s*cm", component.lower())
        if height_match_mm:
            height = int(height_match_mm.group(1))
        elif height_match_cm:
            height = round(float(height_match_cm.group(1)) * 10)
        else:
            height = ""
        height_list.append(height)

        # 價格
        price_match = re.search(r"\$(\d+)", component.replace(",", ""))
        price = price_match.group(1) if price_match else ""
        price_list.append(price)

    df = pd.DataFrame({
        "品牌": brand_list,
        "名稱": name_list,
        "風冷水冷": cooling_type_list,
        "socket_type_w": socket_w_list,
        "socket_type_x": socket_x_list,
        "socket_type_h": socket_h_list,
        "socket_type_y": socket_y_list,
        "socket_type_z": socket_z_list,
        "高度(mm)": height_list,
        "價格": price_list
    })

    df.to_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_cooler_data_with_label_cooler_test_clean.csv")




def OriginalPriceData_PSU():
    data = pd.read_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_cpu_data_with_label_PSU.csv")
    data_array = np.array(data)

    brand_list = []
    name_list = []
    model_list = []
    wattage_list = []
    case_type_list = []
    modular_list = []
    price_list = []

    for row in data_array:
        label, component = row[1], row[2]

        # 品牌
        brand_match = re.match(r"(海盜船|華碩|微星|技嘉|be quiet|酷碼|Antec|Seasonic|Super Flower|FSP|EVGA|Thermaltake)", component)
        brand = brand_match.group(1) if brand_match else ""
        brand_list.append(brand)

        # 名稱
        name_match = re.match(r"[^,（(]+", component)
        name = name_match.group(0).strip() if name_match else ""
        name_list.append(name)

        # 型號
        model_match = re.search(r"\b([A-Z0-9\-]{3,})", component)
        model = model_match.group(1) if model_match else ""
        model_list.append(model)

        # 瓦數
        wattage_match = re.search(r"(\d{3,4})W", component.upper())
        wattage = wattage_match.group(1) if wattage_match else ""
        wattage_list.append(wattage)

        # 機殼尺寸類型
        if "SFX" in component.upper():
            case_type = "SFX"
        elif "TFX" in component.upper():
            case_type = "TFX"
        else:
            case_type = "ATX"
        case_type_list.append(case_type)

        # 模組化
        if "全模組" in component or "全模" in component:
            modular = 2
        elif "半模組" in component or "半模" in component:
            modular = 1
        else:
            modular = 0
        modular_list.append(modular)

        # 價格
        price_match = re.search(r"\$(\d+)", component.replace(",", ""))
        price = price_match.group(1) if price_match else ""
        price_list.append(price)

    # 組成 DataFrame
    df = pd.DataFrame({
        "品牌": brand_list,
        "名稱": name_list,
        "型號": model_list,
        "瓦數": wattage_list,
        "適用機殼尺寸類型": case_type_list,
        "模組化": modular_list,
        "價格": price_list
    })

    df.to_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_psu_data_with_label_psu_test_clean.csv")




def OriginalPriceData_storage():
    data = pd.read_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_cpu_data_with_label_storage.csv")
    data_array = np.array(data)

    brand_list = []
    name_list = []
    model_list = []
    storage_type_list = []
    size_list = []
    capacity_list = []
    price_list = []

    for row in data_array:
        label, component = row[1], row[2]

        # 品牌
        brand_match = re.match(r"(威剛|金士頓|WD|Seagate|Toshiba|三星|美光|創見|PNY|固鋼|十銓|Crucial|Sabrent|Lexar|ADATA|Kingston|Intel)", component, re.IGNORECASE)
        brand = brand_match.group(1) if brand_match else ""
        brand_list.append(brand)

        # 名稱
        name_match = re.match(r"[^,（(]+", component)
        name = name_match.group(0).strip() if name_match else ""
        name_list.append(name)

        # 型號（用較長字串 + 數字組合來猜）
        model_match = re.search(r"\b([A-Z0-9\-]{4,})\b", component)
        model = model_match.group(1) if model_match else ""
        model_list.append(model)

        # 硬碟類型
        if "SSD" in label.upper() or "固態" in component:
            storage_type = "SSD"
        elif "HDD" in label.upper() or "硬碟" in component:
            storage_type = "HDD"
        else:
            storage_type = ""
        storage_type_list.append(storage_type)

        # 尺寸（M.2 / 2.5 / 3.5）
        if re.search(r"M\.?2", component, re.IGNORECASE):
            size = "M.2"
        elif "2.5" in component:
            size = "2.5"
        elif "3.5" in component:
            size = "3.5"
        else:
            size = ""
        size_list.append(size)

        # 容量（轉為 GB 數字）
        cap_match = re.search(r"(\d+(?:\.\d+)?)\s*(TB|GB)", component.upper())
        if cap_match:
            cap_value = float(cap_match.group(1))
            cap_unit = cap_match.group(2)
            cap_in_gb = int(cap_value * 1024) if cap_unit == "TB" else int(cap_value)
            capacity_list.append(str(cap_in_gb))
        else:
            capacity_list.append("")

        # 價格
        price_match = re.search(r"\$(\d+)", component.replace(",", ""))
        price = price_match.group(1) if price_match else ""
        price_list.append(price)

    df = pd.DataFrame({
        "品牌": brand_list,
        "名稱": name_list,
        "型號": model_list,
        "硬碟類型": storage_type_list,
        "尺寸": size_list,
        "容量(GB)": capacity_list,
        "價格": price_list
    })

    df.to_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_storage_data_with_label_storage_test_clean.csv")



def OriginalPriceData_case():
    data = pd.read_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_cpu_data_with_label_case.csv")
    data_array = np.array(data)

    brand_list = []
    name_list = []
    model_list = []
    case_type_list = []
    gpu_length_list = []
    psu_length_list = []
    cooler_height_list = []
    price_list = []

    for row in data_array:
        label, component = row[1], row[2]

        # 品牌
        brand_match = re.match(r"(酷碼|Apexgaming|BitFenix|XPG|COUGAR|喬思伯|darkFlash|亞碩|SAMA|旋剛|全漢|聯力|DEEPCOOL|海盜船|保銳|Fractal|LianLi|NZXT|Phanteks|Montech|曜越|銀欣|迎廣|be quiet|Antec|視博通|JONSBO|華碩|微星|技嘉)", component)
        brand = brand_match.group(1) if brand_match else ""
        brand_list.append(brand)

        # 名稱
        name_match = re.match(r"[^,（(]+", component)
        name = name_match.group(0).strip() if name_match else ""
        name_list.append(name)

        # 型號
        model_match = re.search(r"\b([A-Z0-9\-]{4,})\b", component)
        model = model_match.group(1) if model_match else ""
        model_list.append(model)

        # 主機板尺寸類型（例如：ATX、Micro ATX、ITX）
        case_type_match = re.search(r"(ATX|MATX|Micro-ATX|ITX|Mini-ITX)", component.upper())
        case_type = case_type_match.group(1) if case_type_match else ""
        case_type_list.append(case_type)

        # 支援顯卡最長長度（mm）
        gpu_match = re.search(r"顯卡.*?(\d+)\s*mm", component)
        gpu_length = gpu_match.group(1) if gpu_match else ""
        gpu_length_list.append(gpu_length)

        # 支援 PSU 最長長度（mm）
        psu_match = re.search(r"(電源|PSU).*?(\d+)\s*mm", component)
        psu_length = psu_match.group(2) if psu_match else ""
        psu_length_list.append(psu_length)

        # 支援 CPU 散熱器最高高度（mm）
        cooler_match = re.search(r"(CPU 散熱器|塔散).*?(\d+)\s*mm", component)
        cooler_height = cooler_match.group(2) if cooler_match else ""
        cooler_height_list.append(cooler_height)

        # 價格
        price_match = re.search(r"\$(\d+)", component.replace(",", ""))
        price = price_match.group(1) if price_match else ""
        price_list.append(price)

    df = pd.DataFrame({
        "品牌": brand_list,
        "名稱": name_list,
        "型號": model_list,
        "適用主機尺寸類型": case_type_list,
        "支援顯卡最長長度": gpu_length_list,
        "支援PSU最長長度": psu_length_list,
        "支援cpu散熱器最高高度": cooler_height_list,
        "價格": price_list
    })

    df.to_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_case_data_with_label_case_test_clean.csv")

# 範例呼叫方式






#刪除空值

# OriginalPriceData_CPU()
# OriginalPriceData_GPU()
# OriginalPriceData_MB()
# OriginalPriceData_RAM()
# OriginalPriceData_Cooler()
# OriginalPriceData_PSU()
# OriginalPriceData_PSU()
# OriginalPriceData_storage()
OriginalPriceData_case()



















def CPU_CSV_DataClean():
    data = pd.read_csv(r"G:\05_wehelp\03_week_work\03_stage3\Find_PC\web_crawler\coolpc_cpu_data_with_label_CPU.csv")
    data_array = np.array(data)
    # print(data.head(5))
    # data_clip = data["label"][0].split()
    # print(data_clip)

    #系列
    series_list = ["Intel Core Ultra 200S系列", 
                   "Intel Raptor Lake-s 14代",
                   "Intel Alder Lake-s 12代",
                   "Sapphire Rapids Xeon W",
                   "AMD AM4",
                   "AMD AM5 7000系列",
                   "AMD AM5 8000系列",
                   "AMD AM5 9000系列",
                   "AMD Ryzen Threadripper TRX50系列"]
    
    #品牌
    brand_list = ["Intel","Intel","Intel","Intel","AMD","AMD","AMD","AMD","AMD"]
    #腳位
    socket_list = ["1851", "1700","1700", "4677", "AM4","AM5","AM5","AM5","sTR5"]

    #名稱
    CPU_name_list = []
    cpu_data_name = data_array[0,2]
    cpu_data_name_clip = cpu_data_name.find("【")
    cpu_data_name_clip2 = cpu_data_name.find("aaa")

    cpu_clean_data_array = np.empty((len(data_array),9),dtype=object)
    # print(cpu_clean_data_array)


    all_cpu_data_set = set()


    # 所有的資料做清理
    for i in range(len(data_array)):
        #cpu名稱
        ## 篩選("【")
        cpu_data_name = data_array[i,2]
        cpu_data_name_filter1= cpu_data_name.find("【")
        cpu_clean_data_array[i,1]=cpu_data_name[:cpu_data_name_filter1]
        

        ## 篩選("]")
        cpu_data_name_filter2= cpu_data_name.find("]")
        if cpu_data_name_filter2 == -1:
            pass
        else:
            cpu_clean_data_array[i,1]=cpu_clean_data_array[i,1][cpu_data_name_filter2+1:]

        ## 篩選("(")
        cpu_data_name_filter3= cpu_data_name.find("(")
        if cpu_data_name_filter3 == -1:
            pass
        else:
            cpu_clean_data_array[i,1]=cpu_clean_data_array[i,1][:cpu_data_name_filter3]

        ## 篩選("任搭")
        cpu_data_name_filter4= cpu_data_name.find("任搭")
        if cpu_data_name_filter4 == -1:
            pass
        else:
            cpu_clean_data_array[i,1]=cpu_clean_data_array[i,1][:cpu_data_name_filter4]

        ## 篩選("代理")
        cpu_data_name_filter5= cpu_data_name.find(" 代理")
        if cpu_data_name_filter5 == -1:
            pass
        else:
            cpu_clean_data_array[i,1]=cpu_clean_data_array[i,1][:cpu_data_name_filter5]
        
        ## 篩選("代理")
        cpu_data_name_filter5= cpu_data_name.find("代理")
        if cpu_data_name_filter5 == -1:
            pass
        else:
            cpu_clean_data_array[i,1]=cpu_clean_data_array[i,1][:cpu_data_name_filter5]

        #第一個空格問題
        # print(cpu_clean_data_array[i,1][0])
        if cpu_clean_data_array[i,1]=="":
            pass
        elif cpu_clean_data_array[i,1][0] == " ":
            cpu_clean_data_array[i,1] = cpu_clean_data_array[i,1].replace(" ","")
        else:
            pass



        ## 篩選("盒")
        cpu_clean_data_array[i,1] = cpu_clean_data_array[i,1].replace("盒","")

        all_cpu_data_set.add(cpu_clean_data_array[i,1])
        all_cpu_data_set.discard("")


        #cpu系列資料
    # print(cpu_clean_data_array[:,1])
    print(all_cpu_data_set)






OriginalPriceData_CPU()



