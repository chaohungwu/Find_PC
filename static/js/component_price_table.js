
let nowPage = 1;
let new_componment = true

async function show_load_data_butt() {
    let load_data_butt_dom = document.createElement("button")
    load_data_butt_dom.textContent="載入更多"
    load_data_butt_dom.className="load_data_butt"
    document.querySelector(".right_content").appendChild(load_data_butt_dom)


}

// 如果有新的零件的話就變成 true
async function new_componment_t(){
    new_componment = true
}

// 如果是載入既有的零件列表的話就變成 false
async function new_componment_f(){
    new_componment = false
}


async function CPU_prcie(){
    try{
        if (document.querySelector(".price_table_div") !== null) {
            document.querySelector(".price_table_div").remove()
        }
        if (document.querySelector(".load_data_butt") !== null) {
            document.querySelector(".load_data_butt").remove()
        }
    }finally{
        nowPage=1
        show_component_price_table_CPU()
    }
}

async function GPU_prcie(){
    try{
        if (document.querySelector(".price_table_div") !== null) {
            document.querySelector(".price_table_div").remove()
        }
        if (document.querySelector(".load_data_butt") !== null) {
            document.querySelector(".load_data_butt").remove()
        }
    }finally{
        nowPage=1
        show_component_price_table_GPU()
    }
}

async function RAM_prcie(){
    try{
        if (document.querySelector(".price_table_div") !== null) {
            document.querySelector(".price_table_div").remove()
        }
        if (document.querySelector(".load_data_butt") !== null) {
            document.querySelector(".load_data_butt").remove()
        }
    }finally{
        nowPage=1
        show_component_price_table_RAM()
    }
}

async function MB_prcie(){
    try{
        if (document.querySelector(".price_table_div") !== null) {
            document.querySelector(".price_table_div").remove()
        }
        if (document.querySelector(".load_data_butt") !== null) {
            document.querySelector(".load_data_butt").remove()
        }
    }finally{
        nowPage=1
        show_component_price_table_MB()
    }
}

async function storage_prcie(){
    try{
        if (document.querySelector(".price_table_div") !== null) {
            document.querySelector(".price_table_div").remove()
        }
        if (document.querySelector(".load_data_butt") !== null) {
            document.querySelector(".load_data_butt").remove()
        }
    }finally{
        nowPage=1
        show_component_price_table_storage()
    }
}


async function cooler_prcie(){
    try{
        if (document.querySelector(".price_table_div") !== null) {
            document.querySelector(".price_table_div").remove()
        }
        if (document.querySelector(".load_data_butt") !== null) {
            document.querySelector(".load_data_butt").remove()
        }
    }finally{
        nowPage=1
        show_component_price_table_cooler()
    }
}

async function PSU_prcie(){
    try{
        if (document.querySelector(".price_table_div") !== null) {
            document.querySelector(".price_table_div").remove()
        }
        if (document.querySelector(".load_data_butt") !== null) {
            document.querySelector(".load_data_butt").remove()
        }
    }finally{
        nowPage=1
        show_component_price_table_psu()
    }
}

async function case_prcie(){
    try{
        if (document.querySelector(".price_table_div") !== null) {
            document.querySelector(".price_table_div").remove()
        }
        if (document.querySelector(".load_data_butt") !== null) {
            document.querySelector(".load_data_butt").remove()
        }
    }finally{
        nowPage=1
        show_component_price_table_case()
    }
}


async function show_component_price_table_CPU(){
    document.querySelector(".right_content__img").style.display ='none'


    // 欄位名稱順序
    const headers = ["名稱", "廠牌", "核心數", "腳位", "跑分", "價格"];
    const data_headers = ["name", "brand", "cores", "socket_type", "score", "price"];


    try{
    }catch{}

    finally{
        let response = await fetch(`/api/cpu_data?page=${nowPage}`,
            {
            method:'GET',
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            })
        let cpuData  = await response.json();
        
        if(cpuData==""){
            // 如果沒資料的話就變成新零件，並移除按鈕
            await new_componment_t()
            document.querySelector(".load_data_butt").remove()
        }

        if(nowPage==1){

            // 建立外層容器與標題
            const wrapper = document.createElement("div");
            wrapper.className = "price_table_div";
            document.querySelector(".right_content").appendChild(wrapper);

            // 建立 table
            const table = document.createElement("table");
            table.style.borderCollapse = "collapse";
            table.style.textAlign = "center";
            table.border = "1";
            table.className='price_table'
            wrapper.appendChild(table);

            // 建立 thead
            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");

            headers.forEach(text => {
                const th = document.createElement("th");
                th.textContent = text;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            await new_componment_f()
        }


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
        document.querySelector(".price_table").appendChild(tbody);
        }

    // 如果是第一次的畫新增按鈕
    if(nowPage==1){
        show_load_data_butt()
        document.querySelector(".load_data_butt").addEventListener("click", () => {
        show_component_price_table_CPU();
        });

    }else{}
        nowPage++
    }


async function show_component_price_table_GPU(){
    document.querySelector(".right_content__img").style.display ='none'


    // 欄位名稱順序
    const headers = ["名稱", "廠牌", "顯示卡系列","顯存", "跑分", "價格"];
    const data_headers = ["name", "brand", 'series', "VRAM", "score", "price"];


    try{
    }catch{}

    finally{
        let response = await fetch(`/api/gpu_data?page=${nowPage}`,
            {
            method:'GET',
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            })
        let cpuData  = await response.json();
        
        if(cpuData==""){
            // 如果沒資料的話就變成新零件，並移除按鈕
            await new_componment_t()
            document.querySelector(".load_data_butt").remove()
        }

        if(nowPage==1){

            // 建立外層容器與標題
            const wrapper = document.createElement("div");
            wrapper.className = "price_table_div";
            document.querySelector(".right_content").appendChild(wrapper);

            // 建立 table
            const table = document.createElement("table");
            table.style.borderCollapse = "collapse";
            table.style.textAlign = "center";
            table.border = "1";
            table.className='price_table'
            wrapper.appendChild(table);

            // 建立 thead
            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");

            headers.forEach(text => {
                const th = document.createElement("th");
                th.textContent = text;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            await new_componment_f()
        }


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
        document.querySelector(".price_table").appendChild(tbody);
        }

    // 如果是第一次的畫新增按鈕
    if(nowPage==1){
        show_load_data_butt()
        document.querySelector(".load_data_butt").addEventListener("click", () => {
        show_component_price_table_GPU();
        });

    }else{}
        nowPage++
    }



async function show_component_price_table_RAM(){
    document.querySelector(".right_content__img").style.display ='none'


    // 欄位名稱順序
    const headers = ["名稱", "廠牌", "時脈","記憶體類型", "容量","雙通道" ,"價格"];
    const data_headers = ["name", "brand", 'clock', "type", "capacity", "dual_channel","price"];


    try{
    }catch{}

    finally{
        let response = await fetch(`/api/ram_data?page=${nowPage}`,
            {
            method:'GET',
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            })
        let cpuData  = await response.json();
        
        if(cpuData==""){
            // 如果沒資料的話就變成新零件，並移除按鈕
            await new_componment_t()
            document.querySelector(".load_data_butt").remove()
        }

        if(nowPage==1){

            // 建立外層容器與標題
            const wrapper = document.createElement("div");
            wrapper.className = "price_table_div";
            document.querySelector(".right_content").appendChild(wrapper);

            // 建立 table
            const table = document.createElement("table");
            table.style.borderCollapse = "collapse";
            table.style.textAlign = "center";
            table.border = "1";
            table.className='price_table'
            wrapper.appendChild(table);

            // 建立 thead
            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");

            headers.forEach(text => {
                const th = document.createElement("th");
                th.textContent = text;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            await new_componment_f()
        }


        // 建立 tbody 並加入每筆資料
        const tbody = document.createElement("tbody");
        cpuData.forEach(cpu => {
            const row = document.createElement("tr");

            data_headers.forEach(key => {
                const td = document.createElement("td");

                if(cpu[key]=='1'){
                    cpu[key] = "是"
                }else if(cpu[key]=='0'){
                    cpu[key] = "否"
                }


                td.textContent = cpu[key];
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });
        document.querySelector(".price_table").appendChild(tbody);
        }

    // 如果是第一次的畫新增按鈕
    if(nowPage==1){
        show_load_data_butt()
        document.querySelector(".load_data_butt").addEventListener("click", () => {
        show_component_price_table_RAM();
        });

    }else{}
        nowPage++
    }


async function show_component_price_table_MB(){
    document.querySelector(".right_content__img").style.display ='none'


    // 欄位名稱順序
    const headers = ["名稱", "廠牌", "晶片組","腳位","尺寸" ,"價格"];
    const data_headers = ["name", "brand", 'chipse', "socket_type", "form_factor",,"price"];


    try{
    }catch{}

    finally{
        let response = await fetch(`/api/mb_data?page=${nowPage}`,
            {
            method:'GET',
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            })
        let cpuData  = await response.json();
        
        if(cpuData==""){
            // 如果沒資料的話就變成新零件，並移除按鈕
            await new_componment_t()
            document.querySelector(".load_data_butt").remove()
        }

        if(nowPage==1){

            // 建立外層容器與標題
            const wrapper = document.createElement("div");
            wrapper.className = "price_table_div";
            document.querySelector(".right_content").appendChild(wrapper);

            // 建立 table
            const table = document.createElement("table");
            table.style.borderCollapse = "collapse";
            table.style.textAlign = "center";
            table.border = "1";
            table.className='price_table'
            wrapper.appendChild(table);

            // 建立 thead
            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");

            headers.forEach(text => {
                const th = document.createElement("th");
                th.textContent = text;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            await new_componment_f()
        }


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
        document.querySelector(".price_table").appendChild(tbody);
        }

    // 如果是第一次的畫新增按鈕
    if(nowPage==1){
        show_load_data_butt()
        document.querySelector(".load_data_butt").addEventListener("click", () => {
        show_component_price_table_MB();
        });

    }else{}
        nowPage++
    }


async function show_component_price_table_storage(){
    document.querySelector(".right_content__img").style.display ='none'


    // 欄位名稱順序
    const headers = ["名稱", "廠牌", "型號","硬碟類型", "尺寸","容量(MB)" ,"價格"];
    const data_headers = ["name", "brand", 'model', "type", "form", "capacity","price"];


    try{
    }catch{}

    finally{
        let response = await fetch(`/api/storage_data?page=${nowPage}`,
            {
            method:'GET',
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            })
        let cpuData  = await response.json();
        
        if(cpuData==""){
            // 如果沒資料的話就變成新零件，並移除按鈕
            await new_componment_t()
            document.querySelector(".load_data_butt").remove()
        }

        if(nowPage==1){

            // 建立外層容器與標題
            const wrapper = document.createElement("div");
            wrapper.className = "price_table_div";
            document.querySelector(".right_content").appendChild(wrapper);

            // 建立 table
            const table = document.createElement("table");
            table.style.borderCollapse = "collapse";
            table.style.textAlign = "center";
            table.border = "1";
            table.className='price_table'
            wrapper.appendChild(table);

            // 建立 thead
            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");

            headers.forEach(text => {
                const th = document.createElement("th");
                th.textContent = text;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            await new_componment_f()
        }


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
        document.querySelector(".price_table").appendChild(tbody);
        }

    // 如果是第一次的畫新增按鈕
    if(nowPage==1){
        show_load_data_butt()
        document.querySelector(".load_data_butt").addEventListener("click", () => {
        show_component_price_table_storage();
        });

    }else{}
        nowPage++
    }



async function show_component_price_table_cooler(){
    document.querySelector(".right_content__img").style.display ='none'


    // 欄位名稱順序
    const headers = ["名稱", "廠牌",'socket_type_w', "socket_type_x", "socket_type_h", "socket_type_y","socket_type_z","高度(mm)","價格"];
    const data_headers = ["name", "brand",'socket_type_w', "socket_type_x", "socket_type_h", "socket_type_y","socket_type_z","height","price"];

    try{
    }catch{}

    finally{
        let response = await fetch(`/api/cooler_data?page=${nowPage}`,
            {
            method:'GET',
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            })
        let cpuData  = await response.json();
        
        if(cpuData==""){
            // 如果沒資料的話就變成新零件，並移除按鈕
            await new_componment_t()
            document.querySelector(".load_data_butt").remove()
        }

        if(nowPage==1){

            // 建立外層容器與標題
            const wrapper = document.createElement("div");
            wrapper.className = "price_table_div";
            document.querySelector(".right_content").appendChild(wrapper);

            // 建立 table
            const table = document.createElement("table");
            table.style.borderCollapse = "collapse";
            table.style.textAlign = "center";
            table.border = "1";
            table.className='price_table'
            wrapper.appendChild(table);

            // 建立 thead
            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");

            headers.forEach(text => {
                const th = document.createElement("th");
                th.textContent = text;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            await new_componment_f()
        }


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
        document.querySelector(".price_table").appendChild(tbody);
        }

    // 如果是第一次的畫新增按鈕
    if(nowPage==1){
        show_load_data_butt()
        document.querySelector(".load_data_butt").addEventListener("click", () => {
        show_component_price_table_cooler();
        });

    }else{}
        nowPage++
    }


async function show_component_price_table_psu(){
    document.querySelector(".right_content__img").style.display ='none'


    // 欄位名稱順序
    const headers = ["名稱", "廠牌", "瓦數","尺寸", "模組化" ,"價格"];
    const data_headers = ["name", "brand", 'wattage', "form", "modular","price"];

    try{
    }catch{}

    finally{
        let response = await fetch(`/api/psu_data?page=${nowPage}`,
            {
            method:'GET',
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            })
        let cpuData  = await response.json();
        
        if(cpuData==""){
            // 如果沒資料的話就變成新零件，並移除按鈕
            await new_componment_t()
            document.querySelector(".load_data_butt").remove()
        }

        if(nowPage==1){

            // 建立外層容器與標題
            const wrapper = document.createElement("div");
            wrapper.className = "price_table_div";
            document.querySelector(".right_content").appendChild(wrapper);

            // 建立 table
            const table = document.createElement("table");
            table.style.borderCollapse = "collapse";
            table.style.textAlign = "center";
            table.border = "1";
            table.className='price_table'
            wrapper.appendChild(table);

            // 建立 thead
            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");

            headers.forEach(text => {
                const th = document.createElement("th");
                th.textContent = text;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            await new_componment_f()
        }


        // 建立 tbody 並加入每筆資料
        const tbody = document.createElement("tbody");
        cpuData.forEach(cpu => {
            const row = document.createElement("tr");

            data_headers.forEach(key => {
                const td = document.createElement("td");

                if(cpu[key]=='0'){
                    cpu[key] = "無"
                }else if(cpu[key]=='1'){
                    cpu[key] = "半模"
                }else if(cpu[key]=='2'){
                    cpu[key] = "全模"
                }

                td.textContent = cpu[key];
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });
        document.querySelector(".price_table").appendChild(tbody);
        }

    // 如果是第一次的畫新增按鈕
    if(nowPage==1){
        show_load_data_butt()
        document.querySelector(".load_data_butt").addEventListener("click", () => {
        show_component_price_table_psu();
        });

    }else{}
        nowPage++
    }



async function show_component_price_table_case(){
    document.querySelector(".right_content__img").style.display ='none'


    // 欄位名稱順序
    const headers = ["名稱", "廠牌", "型號","尺寸","價格"];
    const data_headers = ["name", "brand", 'model', "motherboard_form","price"];

    try{
    }catch{}

    finally{
        let response = await fetch(`/api/case_data?page=${nowPage}`,
            {
            method:'GET',
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            })
        let cpuData  = await response.json();
        
        if(cpuData==""){
            // 如果沒資料的話就變成新零件，並移除按鈕
            await new_componment_t()
            document.querySelector(".load_data_butt").remove()
        }

        if(nowPage==1){

            // 建立外層容器與標題
            const wrapper = document.createElement("div");
            wrapper.className = "price_table_div";
            document.querySelector(".right_content").appendChild(wrapper);

            // 建立 table
            const table = document.createElement("table");
            table.style.borderCollapse = "collapse";
            table.style.textAlign = "center";
            table.border = "1";
            table.className='price_table'
            wrapper.appendChild(table);

            // 建立 thead
            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");

            headers.forEach(text => {
                const th = document.createElement("th");
                th.textContent = text;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            await new_componment_f()
        }


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
        document.querySelector(".price_table").appendChild(tbody);
        }

    // 如果是第一次的畫新增按鈕
    if(nowPage==1){
        show_load_data_butt()
        document.querySelector(".load_data_butt").addEventListener("click", () => {
        show_component_price_table_case();
        });

    }else{}
        nowPage++
    }



