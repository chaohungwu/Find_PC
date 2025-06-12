async function show_component_price_table_CPU(){

    document.querySelector(".right_content__img").style.display ='none'

    try{
        document.querySelector('.price_table_div').remove()
    }finally{
        let response = await fetch(`/api/cpu_data`,
            {
            method:'GET',
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            })
            let cpuData = await response.json();

        

        // 建立外層容器
        const wrapper = document.createElement("div");
        wrapper.className = "price_table_div";
        document.querySelector(".right_content").appendChild(wrapper);

        // 建立 table
        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        table.style.textAlign = "center";
        table.border = "1";
        wrapper.appendChild(table);

        // 建立 thead
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        // 欄位名稱順序
        const headers = ["名稱", "廠牌", "核心數", "腳位", "跑分", "價格"];
        const data_headers = ["name", "brand", "cores", "socket_type", "score", "price"];
        headers.forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // 建立 tbody 並加入每筆資料
        const tbody = document.createElement("tbody");
        cpuData.forEach(cpu => {
            const row = document.createElement("tr");

            data_headers.forEach(key => {
                const td = document.createElement("td");
                td.textContent = cpu[key];
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        }

    }



async function show_component_price_table_GPU(){
    document.querySelector(".right_content__img").style.display ='none'

    try{
        document.querySelector('.price_table_div').remove()
    }finally{
        let response = await fetch(`/api/gpu_data`,
            {
            method:'GET',
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            })
            let gpuData = await response.json();

        

        // 建立外層容器
        const wrapper = document.createElement("div");
        wrapper.className = "price_table_div";
        document.querySelector(".right_content").appendChild(wrapper);

        // 建立 table
        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        table.style.textAlign = "center";
        table.border = "1";
        wrapper.appendChild(table);

        // 建立 thead
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        // 欄位名稱順序
        const headers = ["名稱", "廠牌", "顯示卡系列","顯存", "跑分", "價格"];
        const data_headers = ["name", "brand", 'series', "VRAM", "score", "price"];
        headers.forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // 建立 tbody 並加入每筆資料
        const tbody = document.createElement("tbody");
        gpuData.forEach(gpu => {
            const row = document.createElement("tr");

            data_headers.forEach(key => {
                const td = document.createElement("td");
                td.textContent = gpu[key];
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        }

    }



async function show_component_price_table_RAM(){
    document.querySelector(".right_content__img").style.display ='none'

    try{
        document.querySelector('.price_table_div').remove()
    }finally{
        let response = await fetch(`/api/ram_data`,
            {
            method:'GET',
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            })
            let componmentData = await response.json();

        

        // 建立外層容器
        const wrapper = document.createElement("div");
        wrapper.className = "price_table_div";
        document.querySelector(".right_content").appendChild(wrapper);

        // 建立 table
        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        table.style.textAlign = "center";
        table.border = "1";
        wrapper.appendChild(table);

        // 建立 thead
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        // 欄位名稱順序
        const headers = ["名稱", "廠牌", "時脈","記憶體類型", "容量","雙通道" ,"價格"];
        const data_headers = ["name", "brand", 'clock', "type", "capacity", "dual_channel","price"];
        headers.forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // 建立 tbody 並加入每筆資料
        const tbody = document.createElement("tbody");
        componmentData.forEach(componment => {
            const row = document.createElement("tr");

            data_headers.forEach(key => {
                const td = document.createElement("td");
                if(componment[key]=='1'){
                    componment[key] = "是"
                }else if(componment[key]=='0'){
                    componment[key] = "否"
                }

                td.textContent = componment[key];
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        }

    }



async function show_component_price_table_MB(){
    document.querySelector(".right_content__img").style.display ='none'

    try{
        document.querySelector('.price_table_div').remove()
    }finally{
        let response = await fetch(`/api/mb_data`,
            {
            method:'GET',
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            })
            let componmentData = await response.json();

        

        // 建立外層容器
        const wrapper = document.createElement("div");
        wrapper.className = "price_table_div";
        document.querySelector(".right_content").appendChild(wrapper);

        // 建立 table
        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        table.style.textAlign = "center";
        table.border = "1";
        wrapper.appendChild(table);

        // 建立 thead
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        // 欄位名稱順序
        const headers = ["名稱", "廠牌", "晶片組","腳位","尺寸" ,"價格"];
        const data_headers = ["name", "brand", 'chipse', "socket_type", "form_factor",,"price"];
        headers.forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // 建立 tbody 並加入每筆資料
        const tbody = document.createElement("tbody");
        componmentData.forEach(componment => {
            const row = document.createElement("tr");

            data_headers.forEach(key => {
                const td = document.createElement("td");

                // componment[key] = componment[key].replace("腳位","")
                if (typeof componment[key] === 'string') {
                    componment[key] = componment[key].replace("腳位", "");
}
                // let fix_str = componment[key].replace("腳位","")
                
                td.textContent = componment[key];
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        }

    }


async function show_component_price_table_storage(){
    document.querySelector(".right_content__img").style.display ='none'

    try{
        document.querySelector('.price_table_div').remove()
    }finally{
        let response = await fetch(`/api/storage_data`,
            {
            method:'GET',
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            })
            let componmentData = await response.json();

        

        // 建立外層容器
        const wrapper = document.createElement("div");
        wrapper.className = "price_table_div";
        document.querySelector(".right_content").appendChild(wrapper);

        // 建立 table
        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        table.style.textAlign = "center";
        table.border = "1";
        wrapper.appendChild(table);

        // 建立 thead
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        // 欄位名稱順序
        const headers = ["名稱", "廠牌", "型號","硬碟類型", "尺寸","容量(MB)" ,"價格"];
        const data_headers = ["name", "brand", 'model', "type", "form", "capacity","price"];
        headers.forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // 建立 tbody 並加入每筆資料
        const tbody = document.createElement("tbody");
        componmentData.forEach(componment => {
            const row = document.createElement("tr");

            data_headers.forEach(key => {
                const td = document.createElement("td");

                td.textContent = componment[key];
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        }

    }



async function show_component_price_table_cooler(){
    document.querySelector(".right_content__img").style.display ='none'

    try{
        document.querySelector('.price_table_div').remove()
    }finally{
        let response = await fetch(`/api/cooler_data`,
            {
            method:'GET',
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            })
            let componmentData = await response.json();

        

        // 建立外層容器
        const wrapper = document.createElement("div");
        wrapper.className = "price_table_div";
        document.querySelector(".right_content").appendChild(wrapper);

        // 建立 table
        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        table.style.textAlign = "center";
        table.border = "1";
        wrapper.appendChild(table);

        // 建立 thead
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        // 欄位名稱順序
        const headers = ["名稱", "廠牌",'socket_type_w', "socket_type_x", "socket_type_h", "socket_type_y","socket_type_z","高度(mm)","價格"];
        const data_headers = ["name", "brand",'socket_type_w', "socket_type_x", "socket_type_h", "socket_type_y","socket_type_z","height","price"];
        headers.forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // 建立 tbody 並加入每筆資料
        const tbody = document.createElement("tbody");
        componmentData.forEach(componment => {
            const row = document.createElement("tr");

            data_headers.forEach(key => {
                const td = document.createElement("td");

                td.textContent = componment[key];
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        }

    }


async function show_component_price_table_PSU(){
    document.querySelector(".right_content__img").style.display ='none'

    try{
        document.querySelector('.price_table_div').remove()
    }finally{
        let response = await fetch(`/api/PSU_data`,
            {
            method:'GET',
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            })
            let componmentData = await response.json();

        

        // 建立外層容器
        const wrapper = document.createElement("div");
        wrapper.className = "price_table_div";
        document.querySelector(".right_content").appendChild(wrapper);

        // 建立 table
        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        table.style.textAlign = "center";
        table.border = "1";
        wrapper.appendChild(table);

        // 建立 thead
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        // 欄位名稱順序
        const headers = ["名稱", "廠牌", "瓦數","尺寸", "模組化" ,"價格"];
        const data_headers = ["name", "brand", 'wattage', "form", "modular","price"];
        headers.forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // 建立 tbody 並加入每筆資料
        const tbody = document.createElement("tbody");
        componmentData.forEach(componment => {
            const row = document.createElement("tr");

            data_headers.forEach(key => {
                const td = document.createElement("td");
                if(componment[key]=='0'){
                    componment[key] = "無"
                }else if(componment[key]=='1'){
                    componment[key] = "半模"
                }else if(componment[key]=='2'){
                    componment[key] = "全模"
                }


                td.textContent = componment[key];
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        }

    }


async function show_component_price_table_case(){
    document.querySelector(".right_content__img").style.display ='none'

    try{
        document.querySelector('.price_table_div').remove()
    }finally{
        let response = await fetch(`/api/case_data`,
            {
            method:'GET',
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            })
            let componmentData = await response.json();

        

        // 建立外層容器
        const wrapper = document.createElement("div");
        wrapper.className = "price_table_div";
        document.querySelector(".right_content").appendChild(wrapper);

        // 建立 table
        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        table.style.textAlign = "center";
        table.border = "1";
        wrapper.appendChild(table);

        // 建立 thead
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        // 欄位名稱順序
        const headers = ["名稱", "廠牌", "型號","尺寸","價格"];
        const data_headers = ["name", "brand", 'model', "motherboard_form","price"];
        headers.forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // 建立 tbody 並加入每筆資料
        const tbody = document.createElement("tbody");
        componmentData.forEach(componment => {
            const row = document.createElement("tr");

            data_headers.forEach(key => {
                const td = document.createElement("td");
                if(componment[key]=='0'){
                    componment[key] = "無"
                }else if(componment[key]=='1'){
                    componment[key] = "半模"
                }else if(componment[key]=='2'){
                    componment[key] = "全模"
                }


                td.textContent = componment[key];
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        }

    }