import requests
from bs4 import BeautifulSoup

url = "https://www.videocardbenchmark.net/gpu.php?gpu=Radeon+RX+9070+XT&id=5956"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}

response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, 'html.parser')

# 取得硬體資訊區塊
desc_body = soup.find('div', class_='desc-body')

data = {}

# 顯示卡名稱
name_tag = desc_body.find('span', class_='cpuname')
data["Name"] = name_tag.text.strip() if name_tag else None


# 主要硬體規格（左邊）
left_info = desc_body.find('em', class_='left-desc-cpu')
if left_info:
    for p in left_info.find_all('p'):
        label = p.find('strong')
        if label:
            key = label.text.strip(': ')
            value = label.next_sibling.strip()
            data[key] = value

# 其他資訊（下方）
desc_footer = desc_body.find('div', class_='desc-foot')
if desc_footer:
    for p in desc_footer.find_all('p'):
        label = p.find('strong')
        if label:
            key = label.text.strip(': ')
            value = label.next_sibling.strip()
            data[key] = value

# 顯示結果
print("顯示卡資訊：\n")
for k, v in data.items():
    print(f"{k}: {v}")