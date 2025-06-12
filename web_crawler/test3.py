# -*- coding: utf-8 -*-
"""
Created on Fri Jun  6 10:24:56 2025

@author: asp54
"""

import pandas as pd
import numpy as np
import re

##GPU
# 載入兩份 CSV
coolpc_df = pd.read_csv("g:/05_wehelp/03_week_work/03_stage3/find_pc/web_crawler/clean_coolpc_cpu_data_new.csv")
benchmark_df = pd.read_csv("g:/05_wehelp/03_week_work/03_stage3/find_pc/web_crawler/cpu_mark.csv")

# 整理欄位名稱
coolpc_df.columns = ['id', 'name', 'cores', 'brand', 'socket_type', 'price']
benchmark_df.columns = ['cpu_name', 'mark', 'rank', 'value', 'price', 'cpu_type']
