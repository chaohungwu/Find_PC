let nowPage = 1;
let newComponment_index = true;
let nowComponment_show = "cpu";



async function GetComponmentInit(){
    nowPage = 1;
    await new_componment_build_compent_but()
    await order_save_buttCreate()
    // await scroll2bottom()

    // 新增檢查機制
    document.querySelectorAll(".component_select_group_content_butt").forEach(button => {
    button.addEventListener("click", check_order_logic);
    });
}



GetComponmentInit()

function nextPage(){
    nowPage++
}
function nextPage_reflash(){
    console.log("重置nowPage")
    nowPage = 1
}

function newComponment_f(){
    newComponment_index = false
}
function newComponment_t(){
    newComponment_index = true
}

async function new_componment_build_compent_but(){
    // console.log("aaaaa")
    // console.log(nowPage)

    newComponment_t()
    nextPage_reflash()
    await build_compent_but()
    await scroll2bottom()

    await compent_filter_brand()
    // await Build_filter_select_componment()
    
    // 新增檢查機制
    document.querySelectorAll(".component_select_group_content_butt").forEach(button => {
    button.addEventListener("click", check_order_logic);
    });

}



// -------------------------- 取得各零件的資料 --------------------------
async function build_compent_but(){
    // console.log(nowPage)

    let filter_but_dom = document.querySelector(".radio_select:checked")
    nowComponment_show = filter_but_dom.value

    let response = await fetch(`/api/${filter_but_dom.value}_data?page=${nowPage}`,
        {
        method:'GET',
        headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        })
        let data = await response.json();
    
        console.log(data)

        await compent_view_build(data)


    nextPage()
}



async function compent_view_build(data) {
    let filter_but_dom = document.querySelector(".radio_select:checked")
    nowComponment_show = filter_but_dom.value

    if(newComponment_index==true){
        document.querySelector(".component_select_group_background").remove()
    }else{}

    newComponment_f()

    if (nowPage==1){
        // console.log("第一次新增零件資料")
        let component_select_group_background_dom = document.createElement("div");
        component_select_group_background_dom.className ='component_select_group_background'
        component_select_group_background_dom.id =`component_select_group_background`
        document.querySelector(".component_select_group").appendChild(component_select_group_background_dom)
    }else{}


    if(data==''){

        // 如果是空的，就移除事件
        function throttle(func, delay) {
            let lastCall = 0;
            return function (...args) {
                const now = new Date().getTime();
                if (now - lastCall < delay) return;
                lastCall = now;
                func.apply(this, args);
            };
        }

        async function onBoxScrollBottom() {
            if (scrollBox.scrollTop + scrollBox.clientHeight >= scrollBox.scrollHeight - 1) {
                await build_compent_but(nowPage)
            }
        }
        const scrollBox = document.getElementById("component_select_group_background");
        const throttledScrollHandler = throttle(onBoxScrollBottom, 500);
        scrollBox.removeEventListener("scroll", throttledScrollHandler);


    }else{
        for(let i=0; i < data.length; i++){
        // for(let i=0; i < 2; i++){
            let component_select_group_content_dom = document.createElement("div");
            component_select_group_content_dom.className ='component_select_group_content'
            component_select_group_content_dom.id =`component_select_group_content_${data[i]["id"]}`
            document.querySelector(".component_select_group_background").appendChild(component_select_group_content_dom)

            let component_select_group_content_background_dom = document.createElement("div");
            component_select_group_content_background_dom.className ='component_select_group_content_background'
            component_select_group_content_background_dom.id =`component_select_group_content_background_${data[i]["id"]}`
            document.querySelector(`#component_select_group_content_${data[i]["id"]}`).appendChild(component_select_group_content_background_dom)

            let component_select_group_content_img_dom = document.createElement("div");
            component_select_group_content_img_dom.className ='component_select_group_content_img'
            component_select_group_content_img_dom.id = `component_select_group_content_img_${data[i]["id"]}`
            document.querySelector(`#component_select_group_content_background_${data[i]["id"]}`).appendChild(component_select_group_content_img_dom)


            if(data[i]['brand']=="Intel"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/logo-intel-color.avif")`
            }else if(data[i]['brand']=="AMD"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/logo-amd-color_3-2-all-others.avif")`
            }else if(data[i]['brand']=="華碩"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/asus.webp")`
            }else if(data[i]['brand']=="華擎"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/ASRock.png")`
            }else if(data[i]['brand']=="ACER"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/acer.jpg")`
            }else if(data[i]['brand']=="微星"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/MSI.png")`
            }else if(data[i]['brand']=="技嘉"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/gigabyte.png")`
            }else if(data[i]['brand']=="INNO3D"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/INNO3D.png")`
            }else if(data[i]['brand']=="ZOTAC"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/ZOTAC.png")`
            }else if(data[i]['brand']=="麗臺"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/麗臺.png")`
            }else if(data[i]['brand']=="撼訊"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/撼訊.png")`
            }else if(data[i]['brand']=="威剛"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/ADATA.png")`
            }else if(data[i]['brand']=="金士頓"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/kingston.jpg")`
            }else if(data[i]['brand']=="KLEVV"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/klevv.jpg")`
            }else if(data[i]['brand']=="十銓"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/十銓.webp")`
            }else if(data[i]['brand']=="美光"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/micron.png")`
            }else if(data[i]['brand']=="酷碼"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/coolmaster.jpg")`
            }else if(data[i]['brand']=="Antec"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/antec.webp")`
            }else if(data[i]['brand']=="COUGAR"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/COUGAR.png")`
            }else if(data[i]['brand']=="銀欣"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/銀昕_1200x500px.jpg")`
            }else if(data[i]['brand']=="XPG"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/XPG.png")`
            }else if(data[i]['brand']=="BitFenix"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/BitFenix.png")`
            }else if(data[i]['brand']=="BitFenix"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/BitFenix.png")`
            }else if(data[i]['brand']=="Apexgaming"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/Apexgaming.webp")`
            }else if(data[i]['brand']=="曜越"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/曜越.png")`
            }else if(data[i]['brand']=="喬思伯"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/喬思伯.jpg")`
            }else if(data[i]['brand']=="聯力"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/聯力.webp")`
            }else if(data[i]['brand']=="全漢"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/全漢.png")`
            }else if(data[i]['brand']=="darkFlash"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/darkFlash.png")`
            }else if(data[i]['brand']=="Fractal"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/Fractal.png")`
            }else if(data[i]['brand']=="視博通"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/視博通.jpg")`
            }else if(data[i]['brand']=="亞碩"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/亞碩.jpg")`
            }else if(data[i]['brand']=="SAMA"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/SAMA_logo.webp")`
            }else if(data[i]['brand']=="旋剛"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/旋剛.png")`
            }else if(data[i]['brand']=="DEEPCOOL"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/DEEPCOOL.png")`
            }else if(data[i]['brand']=="海盜船"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/CORSAIRLogo2020_stack_K.avif")`
            }else if(data[i]['brand']=="保銳"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/保銳.png")`
            }else if(data[i]['brand']=="LianLi"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/聯力.webp")`
            }else if(data[i]['brand']=="NZXT"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/NZXT.png")`
            }else if(data[i]['brand']=="Phanteks"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/Phanteks.png")`
            }else if(data[i]['brand']=="Montech"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/Montech.webp")`
            }else if(data[i]['brand']=="迎廣"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/迎廣.jpg")`
            }else if(data[i]['brand']=="be quiet"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/be quiet.png")`
            }else if(data[i]['brand']=="JONSBO"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/喬思伯.jpg")`
            }else if(data[i]['brand']=="WD"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/WD.png")`
            }else if(data[i]['brand']=="三星"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/三星.avif")`
            }



            let component_select_group_content_name_dom = document.createElement("div");
            component_select_group_content_name_dom.className ='component_select_group_content_name'
            component_select_group_content_name_dom.id = `component_select_group_content_name_${data[i]["id"]}`
            component_select_group_content_name_dom.textContent = `${data[i]['name']}`
            document.querySelector(`#component_select_group_content_background_${data[i]["id"]}`).appendChild(component_select_group_content_name_dom)

            let component_select_group_content_price_dom = document.createElement("div");
            component_select_group_content_price_dom.className ='component_select_group_content_price'
            component_select_group_content_price_dom.id = `component_select_group_content_price_${data[i]["id"]}`
            component_select_group_content_price_dom.textContent = `${data[i]['price']}元`
            document.querySelector(`#component_select_group_content_background_${data[i]["id"]}`).appendChild(component_select_group_content_price_dom)


            let component_select_group_content_butt_dom = document.createElement("div");
            component_select_group_content_butt_dom.className ='component_select_group_content_butt'
            // id組成:  {零件}_{id}_{名稱}
            component_select_group_content_butt_dom.id = `${filter_but_dom.value}_${data[i]['id']}_${data[i]['name']}_${data[i]['price']}`
            component_select_group_content_butt_dom.textContent = `選擇`
            component_select_group_content_butt_dom.addEventListener('click', compent_select);
            document.querySelector(`#component_select_group_content_background_${data[i]["id"]}`).appendChild(component_select_group_content_butt_dom)
        }

    }

}







// ------------------------------ 新增滾動到底的事件 ------------------------------
async function scroll2bottom(isBottomTriggered) {

    function throttle(func, delay) {
        let lastCall = 0;
        return function (...args) {
            const now = new Date().getTime();
            if (now - lastCall < delay) return;
            lastCall = now;
            func.apply(this, args);
        };
    }

    async function onBoxScrollBottom() {
        if (scrollBox.scrollTop + scrollBox.clientHeight >= scrollBox.scrollHeight - 1) {
            // console.log("區塊已滾到底部");
            await build_compent_but(nowPage)
        }
    }

    const scrollBox = document.getElementById("component_select_group_background");
    const throttledScrollHandler = throttle(onBoxScrollBottom, 500);
    scrollBox.addEventListener("scroll", throttledScrollHandler);
}





// ---------------------------- 零件篩選功能 ----------------------------
// 零件品牌選項值
async function compent_filter_brand(){
    let componment_name_list = {"cpu":1,"gpu":2,"mb":3,"ram":4,"psu":5,"storage":6,"cooler":7,"case":8}
    let response = await fetch(`/api/componment_filter_option?column_index=1&table_index=${componment_name_list[nowComponment_show]}`,
    {
    method:'GET',
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    })
    let data = await response.json();

    console.log(data)

    try{
        console.log("移除   ")
        document.querySelectorAll(".componment_filter_content_filter_div").forEach(el => el.remove());
        document.querySelectorAll(".filter_submit_div").forEach(el => el.remove());
    }catch{}

    // 新增品牌的篩選下拉式選單容器
    let componment_filter_content_filter_div_dom =  document.createElement("div")
    componment_filter_content_filter_div_dom.className = 'componment_filter_content_filter_div'
    document.querySelector(".componment_filter_content_backgroud").appendChild(componment_filter_content_filter_div_dom)
    
    // 新增品牌的篩選下拉式選單標題
    let componment_filter_content_filter_text_dom =  document.createElement("div")
    componment_filter_content_filter_text_dom.className = 'componment_filter_content_filter_text'
    componment_filter_content_filter_text_dom.textContent = '品牌：'
    componment_filter_content_filter_div_dom.appendChild(componment_filter_content_filter_text_dom)
    
    // 新增品牌的篩選下拉式選單本身
    let componment_filter_content_filter_select_dom =  document.createElement("select")
    componment_filter_content_filter_select_dom.className = 'componment_filter_content_filter_select'
    componment_filter_content_filter_select_dom.id = 'brand_select'
    componment_filter_content_filter_div_dom.appendChild(componment_filter_content_filter_select_dom)

    // 新增品牌的篩選下拉式選單本身
    let first_option_dom =  document.createElement("option")
    first_option_dom.textContent='請選擇'
    componment_filter_content_filter_select_dom.appendChild(first_option_dom)
    

    // 新增品牌篩選下拉式選單的選項
    for(let i =0; i<data.length; i++){
        let new_option = document.createElement("option")
        new_option.textContent = data[i]['brand']
        new_option.value = data[i]['brand']
        document.querySelector("#brand_select").appendChild(new_option)
    }

    // 價格
    componment_filter_content_filter_div_dom =  document.createElement("div")
    componment_filter_content_filter_div_dom.className = 'componment_filter_content_filter_div'
    document.querySelector(".componment_filter_content_backgroud").appendChild(componment_filter_content_filter_div_dom)
    
    // 新增核心數的篩選下拉式選單標題
    componment_filter_content_filter_text_dom =  document.createElement("div")
    componment_filter_content_filter_text_dom.className = 'componment_filter_content_filter_text'
    componment_filter_content_filter_text_dom.textContent = `價格：`
    componment_filter_content_filter_div_dom.appendChild(componment_filter_content_filter_text_dom)


    let componment_price_filter_select_dom =  document.createElement("input")
    componment_price_filter_select_dom.className = 'price_filter_input'
    componment_price_filter_select_dom.id = "price_filter_input_min"
    componment_price_filter_select_dom.placeholder = "最低價"
    componment_filter_content_filter_div_dom.appendChild(componment_price_filter_select_dom)


    componment_price_filter_select_dom =  document.createElement("input")
    componment_price_filter_select_dom.className = 'price_filter_input'
    componment_price_filter_select_dom.id = "price_filter_input_max"
    componment_price_filter_select_dom.placeholder = "最高價"
    componment_filter_content_filter_div_dom.appendChild(componment_price_filter_select_dom)



    // 依照各別零件新增零件篩選的下拉式選單
    if(nowComponment_show=='cpu'){
        //------------------------------------ cpu腳位篩選選單 ------------------------------------
        await Build_filter_select("腳位", "socket_type")

        let response = await fetch(`/api/componment_filter_option?column_index=2&table_index=${componment_name_list[nowComponment_show]}`,
        {
        method:'GET',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }})
        let data = await response.json();
        console.log(data)

        for(let i =0; i<data.length; i++){
        let new_option = document.createElement("option")
        new_option.textContent = data[i]['socket_type']
        new_option.value = data[i]['socket_type']
        document.querySelector("#socket_type").appendChild(new_option)
        }


        //------------------------------------ cpu核心數篩選選單 ------------------------------------
        // 新增核心數的篩選下拉式選單容器 
        let componment_filter_content_filter_div_dom =  document.createElement("div")
        componment_filter_content_filter_div_dom.className = 'componment_filter_content_filter_div'
        document.querySelector(".componment_filter_content_backgroud").appendChild(componment_filter_content_filter_div_dom)
        
        // 新增核心數的篩選下拉式選單標題
        let componment_filter_content_filter_text_dom =  document.createElement("div")
        componment_filter_content_filter_text_dom.className = 'componment_filter_content_filter_text'
        componment_filter_content_filter_text_dom.textContent = `核心數：`
        componment_filter_content_filter_div_dom.appendChild(componment_filter_content_filter_text_dom)
        
        // 新增核心數的篩選下拉式選單本身
        let componment_filter_content_filter_select_dom =  document.createElement("input")
        componment_filter_content_filter_select_dom.className = 'filter_input'
        componment_filter_content_filter_select_dom.id = "core_num"
        componment_filter_content_filter_select_dom.placeholder = "最低的核心數"
        componment_filter_content_filter_div_dom.appendChild(componment_filter_content_filter_select_dom)


    }else if(nowComponment_show=='gpu'){
        await Build_filter_select("晶片廠", "chipset_brand_select")
        let response = await fetch(`/api/componment_filter_option?column_index=3&table_index=${componment_name_list[nowComponment_show]}`,
        {
        method:'GET',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }})
        let data = await response.json();
        console.log(data)

        for(let i =0; i<data.length; i++){
        let new_option = document.createElement("option")
        new_option.textContent = data[i]['chipset_brand']
        new_option.value = data[i]['chipset_brand']
        document.querySelector("#chipset_brand_select").appendChild(new_option)
        }


        await Build_filter_select("型號", "series_select")
        response = await fetch(`/api/componment_filter_option?column_index=4&table_index=${componment_name_list[nowComponment_show]}`,
        {
        method:'GET',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }})
        data = await response.json();
        console.log(data)

        for(let i =0; i<data.length; i++){
        let new_option = document.createElement("option")
        new_option.textContent = data[i]['series']
        new_option.value = data[i]['series']
        document.querySelector("#series_select").appendChild(new_option)
        }


        //------------------------------------ 顯卡顯存篩選選單 ------------------------------------
        // 新增顯卡顯存input容器 
        let componment_filter_content_filter_div_dom =  document.createElement("div")
        componment_filter_content_filter_div_dom.className = 'componment_filter_content_filter_div'
        document.querySelector(".componment_filter_content_backgroud").appendChild(componment_filter_content_filter_div_dom)
        
        // 新增顯卡顯存input標題
        let componment_filter_content_filter_text_dom =  document.createElement("div")
        componment_filter_content_filter_text_dom.className = 'componment_filter_content_filter_text'
        componment_filter_content_filter_text_dom.textContent = `顯存：`
        componment_filter_content_filter_div_dom.appendChild(componment_filter_content_filter_text_dom)
        
        // 新增顯卡顯存input本身
        let componment_filter_content_filter_select_dom =  document.createElement("input")
        componment_filter_content_filter_select_dom.className = 'filter_input'
        componment_filter_content_filter_select_dom.id = "vram"
        componment_filter_content_filter_select_dom.placeholder = "最少顯存 ex:16"
        componment_filter_content_filter_div_dom.appendChild(componment_filter_content_filter_select_dom)

    }else if(nowComponment_show=='mb'){
        await Build_filter_select("晶片組", "chipse_select")
        response = await fetch(`/api/componment_filter_option?column_index=5&table_index=${componment_name_list[nowComponment_show]}`,
        {
        method:'GET',
        headers: {  
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }})
        data = await response.json();
        console.log(data)

        for(let i =0; i<data.length; i++){
        let new_option = document.createElement("option")
        new_option.textContent = data[i]['chipse']
        new_option.value = data[i]['chipse']
        document.querySelector("#chipse_select").appendChild(new_option)
        }

        await Build_filter_select("腳位", "mb_socket_type_select")
        response = await fetch(`/api/componment_filter_option?column_index=6&table_index=${componment_name_list[nowComponment_show]}`,
        {
        method:'GET',
        headers: {  
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }})
        data = await response.json();
        console.log(data)

        for(let i =0; i<data.length; i++){
        let new_option = document.createElement("option")
        new_option.textContent = data[i]['socket_type']
        new_option.value = data[i]['socket_type']
        document.querySelector("#mb_socket_type_select").appendChild(new_option)
        }


        await Build_filter_select("尺寸", "mb_form_factor_select")
        response = await fetch(`/api/componment_filter_option?column_index=7&table_index=${componment_name_list[nowComponment_show]}`,
        {
        method:'GET',
        headers: {  
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }})
        data = await response.json();

        for(let i =0; i<data.length; i++){
        let new_option = document.createElement("option")
        new_option.textContent = data[i]['form_factor']
        new_option.value = data[i]['form_factor']
        document.querySelector("#mb_form_factor_select").appendChild(new_option)
        }

    }else if(nowComponment_show=='ram'){

        await Build_filter_select("頻率", "ram_clock_select")
        response = await fetch(`/api/componment_filter_option?column_index=8&table_index=${componment_name_list[nowComponment_show]}`,
        {
        method:'GET',
        headers: {  
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }})
        data = await response.json();

        for(let i =0; i<data.length; i++){
        let new_option = document.createElement("option")
        new_option.textContent = data[i]['clock']
        new_option.value = data[i]['clock']
        document.querySelector("#ram_clock_select").appendChild(new_option)
        }
        
        await Build_filter_select("大小", "ram_capacity_select")
        response = await fetch(`/api/componment_filter_option?column_index=9&table_index=${componment_name_list[nowComponment_show]}`,
        {
        method:'GET',
        headers: {  
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }})
        data = await response.json();

        for(let i =0; i<data.length; i++){
        let new_option = document.createElement("option")
        new_option.textContent = data[i]['capacity']
        new_option.value = data[i]['capacity']
        document.querySelector("#ram_capacity_select").appendChild(new_option)
        }

        await Build_filter_select("雙通道", "ram_dual_channel_select")
        response = await fetch(`/api/componment_filter_option?column_index=10&table_index=${componment_name_list[nowComponment_show]}`,
        {
        method:'GET',
        headers: {  
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }})
        data = await response.json();

        for(let i =0; i<data.length; i++){
        let new_option = document.createElement("option")
        if(data[i]['dual_channel']=="0"){
            new_option.textContent = "單通道"
        }else{
            new_option.textContent = "雙通道"
        }
        new_option.value = data[i]['dual_channel']
        document.querySelector("#ram_dual_channel_select").appendChild(new_option)
        }


    }else if(nowComponment_show=='psu'){
        await Build_filter_select("瓦數", "psu_wattage_select")
        response = await fetch(`/api/componment_filter_option?column_index=11&table_index=${componment_name_list[nowComponment_show]}`,
        {
        method:'GET',
        headers: {  
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }})
        data = await response.json();

        for(let i =0; i<data.length; i++){
        let new_option = document.createElement("option")
        new_option.textContent = data[i]['wattage']
        new_option.value = data[i]['wattage']
        document.querySelector("#psu_wattage_select").appendChild(new_option)
        }

        await Build_filter_select("尺寸", "psu_form_select")
        response = await fetch(`/api/componment_filter_option?column_index=12&table_index=${componment_name_list[nowComponment_show]}`,
        {
        method:'GET',
        headers: {  
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }})
        data = await response.json();

        for(let i =0; i<data.length; i++){
        let new_option = document.createElement("option")
        new_option.textContent = data[i]['form']
        new_option.value = data[i]['form']
        document.querySelector("#psu_form_select").appendChild(new_option)
        }

        await Build_filter_select("模組化", "psu_modular_select")
        response = await fetch(`/api/componment_filter_option?column_index=13&table_index=${componment_name_list[nowComponment_show]}`,
        {
        method:'GET',
        headers: {  
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }})
        data = await response.json();

        for(let i =0; i<data.length; i++){
        let new_option = document.createElement("option")
        if(data[i]['modular']=="0"){
            new_option.textContent = "無模"
        }else if(data[i]['modular']=="1"){
            new_option.textContent = "半模"
        }else{
            new_option.textContent = "全模"
        }
        new_option.value = data[i]['modular']
        document.querySelector("#psu_modular_select").appendChild(new_option)
        }

    }else if(nowComponment_show=='storage'){

        await Build_filter_select("容量(MB)", "storage_capacity_select")
        response = await fetch(`/api/componment_filter_option?column_index=14&table_index=${componment_name_list[nowComponment_show]}`,
        {
        method:'GET',
        headers: {  
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }})
        data = await response.json();

        for(let i =0; i<data.length; i++){
        let new_option = document.createElement("option")
        new_option.textContent = data[i]['capacity']
        new_option.value = data[i]['capacity']
        document.querySelector("#storage_capacity_select").appendChild(new_option)
        }

    }else if(nowComponment_show=='cooler'){

        await Build_filter_select("高度(mm)", "cooler_height_select")
        response = await fetch(`/api/componment_filter_option?column_index=15&table_index=${componment_name_list[nowComponment_show]}`,
        {
        method:'GET',
        headers: {  
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }})
        data = await response.json();

        for(let i =0; i<data.length; i++){
        let new_option = document.createElement("option")
        new_option.textContent = data[i]['height']
        new_option.value = data[i]['height']
        document.querySelector("#cooler_height_select").appendChild(new_option)
        }
    }else if(nowComponment_show=='case'){

        await Build_filter_select("尺寸", "case_motherboard_form_select")
        response = await fetch(`/api/componment_filter_option?column_index=16&table_index=${componment_name_list[nowComponment_show]}`,
        {
        method:'GET',
        headers: {  
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }})
        data = await response.json();

        for(let i =0; i<data.length; i++){
        let new_option = document.createElement("option")
        new_option.textContent = data[i]['motherboard_form']
        new_option.value = data[i]['motherboard_form']
        document.querySelector("#case_motherboard_form_select").appendChild(new_option)
        }
    }



    // 
    // 新增篩選搜尋按鈕容器
    let button_div_dom =  document.createElement("div")
    button_div_dom.className = 'filter_submit_div'
    document.querySelector(".componment_filter_content_backgroud").appendChild(button_div_dom)
    
    // 新增篩選搜尋按鈕
    let button_dom =  document.createElement("button")
    button_dom.className = 'filter_submit'
    button_dom.textContent = '搜尋'
    button_div_dom.appendChild(button_dom)
    button_div_dom.addEventListener("click", await Build_filter_select_componment)
}





// 各項篩選傳值
async function Build_filter_select_componment() {
    
    let componment_name_list = {"cpu":1,"gpu":2,"mb":3,"ram":4,"psu":5,"storage":6,"cooler":7,"case":8}

    // cpu篩選傳值取值傳後端
    if(nowComponment_show=="cpu"){
        // console.log("cpu_go")
        let brand_value = document.querySelector(".componment_filter_content_filter_select").value
        if(brand_value=="請選擇"){
            brand_value=false
        }else if(brand_value==""){
            brand_value=false
        }
        let min_price_value = document.querySelector("#price_filter_input_min").value
        if(min_price_value=="請選擇"){
            min_price_value=false
        }else if(min_price_value==""){
            min_price_value=false
        }
        let max_price_value = document.querySelector("#price_filter_input_max").value
        if(max_price_value=="請選擇"){
            max_price_value=false
        }else if(max_price_value==""){
            max_price_value=false
        }
        let socket_type_value = document.querySelector("#socket_type").value
        if(socket_type_value=="請選擇"){
            socket_type_value=false
        }else if(socket_type_value==""){
            socket_type_value=false
        }
        let core_num_value = document.querySelector("#core_num").value
        if(core_num_value=="請選擇"){
            core_num_value=false
        }else if(core_num_value==""){
            core_num_value=false
        }

        let send_data = {
                        "table_index":componment_name_list[nowComponment_show],
                        "brand_value":brand_value,
                        "min_price_value":min_price_value,
                        "max_price_value":max_price_value,
                        "socket_type_value":socket_type_value,
                        "core_num_value":core_num_value,
                        }
        await search_compent_filterData_and_view_build(send_data)


    }else if(nowComponment_show=="gpu"){
        // 品牌篩選
        let brand_value = document.querySelector(".componment_filter_content_filter_select").value
        if(brand_value=="請選擇"){
            brand_value=false
        }else if(brand_value==""){
            brand_value=false
        }

        // 最低價格篩選
        let min_price_value = document.querySelector("#price_filter_input_min").value
        if(min_price_value=="請選擇"){
            min_price_value=false
        }else if(min_price_value==""){
            min_price_value=false
        }

        // 最高價格篩選
        let max_price_value = document.querySelector("#price_filter_input_max").value
        if(max_price_value=="請選擇"){
            max_price_value=false
        }else if(max_price_value==""){
            max_price_value=false
        }

        // 晶片廠篩選
        let chipset_brand_value = document.querySelector("#chipset_brand_select").value
        if(chipset_brand_value=="請選擇"){
            chipset_brand_value=false
        }else if(chipset_brand_value==""){
            chipset_brand_value=false
        }

        // 型號篩選
        let series_value = document.querySelector("#series_select").value
        if(series_value=="請選擇"){
            series_value=false
        }else if(series_value==""){
            series_value=false
        }

        // 顯存篩選
        let vram_value = document.querySelector("#vram").value
        if(vram_value=="請選擇"){
            vram_value=false
        }else if(vram_value==""){
            vram_value=false
        }



        let send_data = {
                        "table_index":componment_name_list[nowComponment_show],
                        "brand_value":brand_value,
                        "min_price_value":min_price_value,
                        "max_price_value":max_price_value,
                        "chipset_brand_value":chipset_brand_value,
                        "series_value":series_value,
                        "vram_value":vram_value,
                        }


        await search_compent_filterData_and_view_build(send_data)


    }else if(nowComponment_show=="mb"){
        // 品牌篩選
        let brand_value = document.querySelector(".componment_filter_content_filter_select").value
        if(brand_value=="請選擇"){
            brand_value=false
        }else if(brand_value==""){
            brand_value=false
        }

        // 最低價格篩選
        let min_price_value = document.querySelector("#price_filter_input_min").value
        if(min_price_value=="請選擇"){
            min_price_value=false
        }else if(min_price_value==""){
            min_price_value=false
        }

        // 最高價格篩選
        let max_price_value = document.querySelector("#price_filter_input_max").value
        if(max_price_value=="請選擇"){
            max_price_value=false
        }else if(max_price_value==""){
            max_price_value=false
        }

        // 晶片組篩選
        let chipse_value = document.querySelector("#chipse_select").value
        if(chipse_value=="請選擇"){
            chipse_value=false
        }else if(chipse_value==""){
            chipse_value=false
        }

        // 主板腳位篩選
        let mb_socket_type_value = document.querySelector("#mb_socket_type_select").value
        if(mb_socket_type_value=="請選擇"){
            mb_socket_type_value=false
        }else if(mb_socket_type_value==""){
            mb_socket_type_value=false
        }
        // 尺寸篩選
        let form_value = document.querySelector("#mb_form_factor_select").value
        if(form_value=="請選擇"){
            form_value=false
        }else if(form_value==""){
            form_value=false
        }

        let send_data = {
                        "table_index":componment_name_list[nowComponment_show],
                        "brand_value":brand_value,
                        "min_price_value":min_price_value,
                        "max_price_value":max_price_value,
                        "chipse_value":chipse_value,
                        "mb_socket_type_value":mb_socket_type_value,
                        "form_value":form_value,

                        }

        await search_compent_filterData_and_view_build(send_data)
        
        
    }else if(nowComponment_show=="ram"){
        // 品牌篩選
        let brand_value = document.querySelector(".componment_filter_content_filter_select").value
        if(brand_value=="請選擇"){
            brand_value=false
        }else if(brand_value==""){
            brand_value=false
        }

        // 最低價格篩選
        let min_price_value = document.querySelector("#price_filter_input_min").value
        if(min_price_value=="請選擇"){
            min_price_value=false
        }else if(min_price_value==""){
            min_price_value=false
        }

        // 最高價格篩選
        let max_price_value = document.querySelector("#price_filter_input_max").value
        if(max_price_value=="請選擇"){
            max_price_value=false
        }else if(max_price_value==""){
            max_price_value=false
        }

        // 頻率篩選
        let clock_value = document.querySelector("#ram_clock_select").value
        if(clock_value=="請選擇"){
            clock_value=false
        }else if(clock_value==""){
            clock_value=false
        }

        // ram大小篩選
        let ram_capacity_value = document.querySelector("#ram_capacity_select").value
        if(ram_capacity_value=="請選擇"){
            ram_capacity_value=false
        }else if(ram_capacity_value==""){
            ram_capacity_value=false
        }

        // ram大小篩選
        let ram_dual_channel_value = document.querySelector("#ram_dual_channel_select").value
        if(ram_dual_channel_value=="請選擇"){
            ram_dual_channel_value=false
        }else if(ram_dual_channel_value==""){
            ram_dual_channel_value=false
        }

        let send_data = {
                        "table_index":componment_name_list[nowComponment_show],
                        "brand_value":brand_value,
                        "min_price_value":min_price_value,
                        "max_price_value":max_price_value,
                        "clock_value":clock_value,
                        "ram_capacity_value":ram_capacity_value,
                        "ram_dual_channel_value":ram_dual_channel_value,
                        }

        await search_compent_filterData_and_view_build(send_data)


    }else if(nowComponment_show=="psu"){
        // 品牌篩選
        let brand_value = document.querySelector(".componment_filter_content_filter_select").value
        if(brand_value=="請選擇"){
            brand_value=false
        }else if(brand_value==""){
            brand_value=false
        }

        // 最低價格篩選
        let min_price_value = document.querySelector("#price_filter_input_min").value
        if(min_price_value=="請選擇"){
            min_price_value=false
        }else if(min_price_value==""){
            min_price_value=false
        }

        // 最高價格篩選
        let max_price_value = document.querySelector("#price_filter_input_max").value
        if(max_price_value=="請選擇"){
            max_price_value=false
        }else if(max_price_value==""){
            max_price_value=false
        }

        // 瓦數篩選
        let wattage_value = document.querySelector("#psu_wattage_select").value
        if(wattage_value=="請選擇"){
            wattage_value=false
        }else if(wattage_value==""){
            wattage_value=false
        }

        // 尺寸篩選
        let form_value = document.querySelector("#psu_form_select").value
        if(form_value=="請選擇"){
            form_value=false
        }else if(form_value==""){
            form_value=false
        }

        // 模組化篩選
        let modular_value = document.querySelector("#psu_modular_select").value
        if(modular_value=="請選擇"){
            modular_value=false
        }else if(modular_value==""){
            modular_value=false
        }

        let send_data = {
                        "table_index":componment_name_list[nowComponment_show],
                        "brand_value":brand_value,
                        "min_price_value":min_price_value,
                        "max_price_value":max_price_value,
                        "wattage_value":wattage_value,
                        "form_value":form_value,
                        "modular_value":modular_value,
                        }

        await search_compent_filterData_and_view_build(send_data)
    }else if(nowComponment_show=="storage"){
        // 品牌篩選
        let brand_value = document.querySelector(".componment_filter_content_filter_select").value
        if(brand_value=="請選擇"){
            brand_value=false
        }else if(brand_value==""){
            brand_value=false
        }

        // 最低價格篩選
        let min_price_value = document.querySelector("#price_filter_input_min").value
        if(min_price_value=="請選擇"){
            min_price_value=false
        }else if(min_price_value==""){
            min_price_value=false
        }

        // 最高價格篩選
        let max_price_value = document.querySelector("#price_filter_input_max").value
        if(max_price_value=="請選擇"){
            max_price_value=false
        }else if(max_price_value==""){
            max_price_value=false
        }

        // 瓦數篩選
        let capacity_value = document.querySelector("#storage_capacity_select").value
        if(capacity_value=="請選擇"){
            capacity_value=false
        }else if(capacity_value==""){
            capacity_value=false
        }


        let send_data = {
                        "table_index":componment_name_list[nowComponment_show],
                        "brand_value":brand_value,
                        "min_price_value":min_price_value,
                        "max_price_value":max_price_value,
                        "capacity_value":capacity_value,
                        }

        await search_compent_filterData_and_view_build(send_data)
    }else if(nowComponment_show=="cooler"){
        // 品牌篩選
        let brand_value = document.querySelector(".componment_filter_content_filter_select").value
        if(brand_value=="請選擇"){
            brand_value=false
        }else if(brand_value==""){
            brand_value=false
        }

        // 最低價格篩選
        let min_price_value = document.querySelector("#price_filter_input_min").value
        if(min_price_value=="請選擇"){
            min_price_value=false
        }else if(min_price_value==""){
            min_price_value=false
        }

        // 最高價格篩選
        let max_price_value = document.querySelector("#price_filter_input_max").value
        if(max_price_value=="請選擇"){
            max_price_value=false
        }else if(max_price_value==""){
            max_price_value=false
        }

        // 瓦數篩選
        let height_value = document.querySelector("#cooler_height_select").value
        if(height_value=="請選擇"){
            height_value=false
        }else if(height_value==""){
            height_value=false
        }


        let send_data = {
                        "table_index":componment_name_list[nowComponment_show],
                        "brand_value":brand_value,
                        "min_price_value":min_price_value,
                        "max_price_value":max_price_value,
                        "height_value":height_value,
                        }

        await search_compent_filterData_and_view_build(send_data)

    }else if(nowComponment_show=="case"){
        // 品牌篩選
        let brand_value = document.querySelector(".componment_filter_content_filter_select").value
        if(brand_value=="請選擇"){
            brand_value=false
        }else if(brand_value==""){
            brand_value=false
        }

        // 最低價格篩選
        let min_price_value = document.querySelector("#price_filter_input_min").value
        if(min_price_value=="請選擇"){
            min_price_value=false
        }else if(min_price_value==""){
            min_price_value=false
        }

        // 最高價格篩選
        let max_price_value = document.querySelector("#price_filter_input_max").value
        if(max_price_value=="請選擇"){
            max_price_value=false
        }else if(max_price_value==""){
            max_price_value=false
        }

        // 尺寸篩選
        let motherboard_form_value = document.querySelector("#case_motherboard_form_select").value
        if(motherboard_form_value=="請選擇"){
            motherboard_form_value=false
        }else if(motherboard_form_value==""){
            motherboard_form_value=false
        }


        let send_data = {
                        "table_index":componment_name_list[nowComponment_show],
                        "brand_value":brand_value,
                        "min_price_value":min_price_value,
                        "max_price_value":max_price_value,
                        "motherboard_form_value":motherboard_form_value,
                        }

        await search_compent_filterData_and_view_build(send_data)
    }

}




// 根據篩選回傳的資料重新刷新零件列表
async function search_compent_filterData_and_view_build(send_data) {

    let response = await fetch(`/api/componment_filter_data_search`,
    {
    method:'POST',
    headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body:JSON.stringify(send_data)
    })
    let data = await response.json();
    // console.log(data)
    await compent_filterData_view_build(data)

}







// 點選篩選搜尋後的零件表更新
async function compent_filterData_view_build(data) {
    newComponment_t()
    let filter_but_dom = document.querySelector(".radio_select:checked")
    nowComponment_show = filter_but_dom.value

    // 辨識需不需要清空重建
    if(newComponment_index==true){
        document.querySelector(".component_select_group_background").remove()
    }else{}

    if (nowPage==1){
        // console.log("第一次新增零件資料")
    }else{}
    console.log("fgk")
    console.log(data)
    data = data["data"]

    let component_select_group_background_dom = document.createElement("div");
    component_select_group_background_dom.className ='component_select_group_background'
    component_select_group_background_dom.id =`component_select_group_background`
    document.querySelector(".component_select_group").appendChild(component_select_group_background_dom)

    if(data=='獲取失敗'){

        await new_componment_build_compent_but()

    }else{
        for(let i=0; i < data.length; i++){
            // console.log(data)
            let component_select_group_content_dom = document.createElement("div");
            component_select_group_content_dom.className ='component_select_group_content'
            component_select_group_content_dom.id =`component_select_group_content_${data[i]["id"]}`
            document.querySelector(".component_select_group_background").appendChild(component_select_group_content_dom)

            let component_select_group_content_background_dom = document.createElement("div");
            component_select_group_content_background_dom.className ='component_select_group_content_background'
            component_select_group_content_background_dom.id =`component_select_group_content_background_${data[i]["id"]}`
            document.querySelector(`#component_select_group_content_${data[i]["id"]}`).appendChild(component_select_group_content_background_dom)

            let component_select_group_content_img_dom = document.createElement("div");
            component_select_group_content_img_dom.className ='component_select_group_content_img'
            component_select_group_content_img_dom.id = `component_select_group_content_img_${data[i]["id"]}`
            document.querySelector(`#component_select_group_content_background_${data[i]["id"]}`).appendChild(component_select_group_content_img_dom)


            if(data[i]['brand']=="Intel"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/logo-intel-color.avif")`
            }else if(data[i]['brand']=="AMD"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/logo-amd-color_3-2-all-others.avif")`
            }else if(data[i]['brand']=="華碩"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/asus.webp")`
            }else if(data[i]['brand']=="華擎"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/ASRock.png")`
            }else if(data[i]['brand']=="ACER"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/acer.jpg")`
            }else if(data[i]['brand']=="微星"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/MSI.png")`
            }else if(data[i]['brand']=="技嘉"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/gigabyte.png")`
            }else if(data[i]['brand']=="INNO3D"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/INNO3D.png")`
            }else if(data[i]['brand']=="ZOTAC"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/ZOTAC.png")`
            }else if(data[i]['brand']=="麗臺"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/麗臺.png")`
            }else if(data[i]['brand']=="撼訊"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/撼訊.png")`
            }else if(data[i]['brand']=="威剛"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/ADATA.png")`
            }else if(data[i]['brand']=="金士頓"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/kingston.jpg")`
            }else if(data[i]['brand']=="KLEVV"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/klevv.jpg")`
            }else if(data[i]['brand']=="十銓"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/十銓.webp")`
            }else if(data[i]['brand']=="美光"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/micron.png")`
            }else if(data[i]['brand']=="酷碼"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/coolmaster.jpg")`
            }else if(data[i]['brand']=="Antec"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/antec.webp")`
            }else if(data[i]['brand']=="COUGAR"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/COUGAR.png")`
            }else if(data[i]['brand']=="銀欣"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/銀昕_1200x500px.jpg")`
            }else if(data[i]['brand']=="XPG"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/XPG.png")`
            }else if(data[i]['brand']=="BitFenix"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/BitFenix.png")`
            }else if(data[i]['brand']=="BitFenix"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/BitFenix.png")`
            }else if(data[i]['brand']=="Apexgaming"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/Apexgaming.webp")`
            }else if(data[i]['brand']=="曜越"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/曜越.png")`
            }else if(data[i]['brand']=="喬思伯"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/喬思伯.jpg")`
            }else if(data[i]['brand']=="聯力"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/聯力.webp")`
            }else if(data[i]['brand']=="全漢"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/全漢.png")`
            }else if(data[i]['brand']=="darkFlash"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/darkFlash.png")`
            }else if(data[i]['brand']=="Fractal"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/Fractal.png")`
            }else if(data[i]['brand']=="視博通"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/視博通.jpg")`
            }else if(data[i]['brand']=="亞碩"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/亞碩.jpg")`
            }else if(data[i]['brand']=="SAMA"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/SAMA_logo.webp")`
            }else if(data[i]['brand']=="旋剛"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/旋剛.png")`
            }else if(data[i]['brand']=="DEEPCOOL"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/DEEPCOOL.png")`
            }else if(data[i]['brand']=="海盜船"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/CORSAIRLogo2020_stack_K.avif")`
            }else if(data[i]['brand']=="保銳"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/保銳.png")`
            }else if(data[i]['brand']=="LianLi"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/聯力.webp")`
            }else if(data[i]['brand']=="NZXT"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/NZXT.png")`
            }else if(data[i]['brand']=="Phanteks"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/Phanteks.png")`
            }else if(data[i]['brand']=="Montech"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/Montech.webp")`
            }else if(data[i]['brand']=="迎廣"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/迎廣.jpg")`
            }else if(data[i]['brand']=="be quiet"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/be quiet.png")`
            }else if(data[i]['brand']=="JONSBO"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/喬思伯.jpg")`
            }else if(data[i]['brand']=="WD"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/WD.png")`
            }else if(data[i]['brand']=="三星"){
                img_dom = document.querySelector(`#component_select_group_content_img_${data[i]["id"]}`)
                img_dom.style.backgroundImage= `url("./static/img/三星.avif")`
            }



            let component_select_group_content_name_dom = document.createElement("div");
            component_select_group_content_name_dom.className ='component_select_group_content_name'
            component_select_group_content_name_dom.id = `component_select_group_content_name_${data[i]["id"]}`
            component_select_group_content_name_dom.textContent = `${data[i]['name']}`
            document.querySelector(`#component_select_group_content_background_${data[i]["id"]}`).appendChild(component_select_group_content_name_dom)

            let component_select_group_content_price_dom = document.createElement("div");
            component_select_group_content_price_dom.className ='component_select_group_content_price'
            component_select_group_content_price_dom.id = `component_select_group_content_price_${data[i]["id"]}`
            component_select_group_content_price_dom.textContent = `${data[i]['price']}元`
            document.querySelector(`#component_select_group_content_background_${data[i]["id"]}`).appendChild(component_select_group_content_price_dom)


            let component_select_group_content_butt_dom = document.createElement("div");
            component_select_group_content_butt_dom.className ='component_select_group_content_butt'
            // id組成:  {零件}_{id}_{名稱}
            component_select_group_content_butt_dom.id = `${filter_but_dom.value}_${data[i]['id']}_${data[i]['name']}_${data[i]['price']}`
            component_select_group_content_butt_dom.textContent = `選擇`
            component_select_group_content_butt_dom.addEventListener('click', compent_select);
            document.querySelector(`#component_select_group_content_background_${data[i]["id"]}`).appendChild(component_select_group_content_butt_dom)
        }

    }



}











// 建立篩選下拉式選單函數
async function Build_filter_select(filter_name, filter_id) {
        // 新增品牌的篩選下拉式選單容器 
        let componment_filter_content_filter_div_dom =  document.createElement("div")
        componment_filter_content_filter_div_dom.className = 'componment_filter_content_filter_div'
        document.querySelector(".componment_filter_content_backgroud").appendChild(componment_filter_content_filter_div_dom)
        
        // 新增品牌的篩選下拉式選單標題
        let componment_filter_content_filter_text_dom =  document.createElement("div")
        componment_filter_content_filter_text_dom.className = 'componment_filter_content_filter_text'
        componment_filter_content_filter_text_dom.textContent = `${filter_name}：`
        componment_filter_content_filter_div_dom.appendChild(componment_filter_content_filter_text_dom)
        
        // 新增品牌的篩選下拉式選單本身
        let componment_filter_content_filter_select_dom =  document.createElement("select")
        componment_filter_content_filter_select_dom.className = 'componment_filter_content_filter_select'
        componment_filter_content_filter_select_dom.id = filter_id
        componment_filter_content_filter_div_dom.appendChild(componment_filter_content_filter_select_dom)

        // 新增品牌的篩選下拉式選單本身
        let first_option_dom =  document.createElement("option")
        first_option_dom.textContent='請選擇'
        componment_filter_content_filter_select_dom.appendChild(first_option_dom)
}




























// ------------------------------ 訂單功能 ------------------------------
async function compent_select(){

    let parts = this.id.split('_');
    
    try{
        document.querySelector(`#select_${parts[0]}_${parts[1]}`);
        document.querySelector(`#num__select_${parts[0]}_${parts[1]}_${parts[3]}`).value ++ ;

        // 更新價格
        let price_dom = document.querySelector('.total_price_number');
        price_dom.value = Number(price_dom.value) + Number(parts[3])

    }catch{

        let component_group_dom = document.createElement('div');
        component_group_dom.className = 'component_group';
        component_group_dom.id = `select_${parts[0]}_${parts[1]}_${parts[3]}`;
        document.querySelector('.component_group_div_scoll').appendChild(component_group_dom);

        let component_group_background_dom = document.createElement('div');
        component_group_background_dom.className = 'component_group_background';
        component_group_background_dom.id = `select2_select_${parts[0]}_${parts[1]}`;
        document.querySelector(`#select_${parts[0]}_${parts[1]}_${parts[3]}`).appendChild(component_group_background_dom);

        let component_group_background_component_dom = document.createElement('div');
        component_group_background_component_dom.className = 'component_group_background_component';
        
        let show_class_name = '';
        if (parts[0]=='cpu'){
            show_class_name='CPU'
        }else if(parts[0]=='gpu'){
            show_class_name='GPU'
        }else if(parts[0]=='ram'){
            show_class_name='記憶體'
        }else if(parts[0]=='mb'){
            show_class_name='主機板'
        }else if(parts[0]=='psu'){
            show_class_name='PSU'
        }else if(parts[0]=='storage'){
            show_class_name='硬碟'
        }else if(parts[0]=='cooler'){
            show_class_name='散熱器'
        }else if(parts[0]=='case'){
            show_class_name='機殼'
        }
        
        component_group_background_component_dom.textContent=`${show_class_name}`
        document.querySelector(`#select2_select_${parts[0]}_${parts[1]}`).appendChild(component_group_background_component_dom);

        let component_group_background_name_dom = document.createElement('div');
        component_group_background_name_dom.className = 'component_group_background_name';
        component_group_background_name_dom.textContent=`${parts[2]} | ${parts[3]}元`
        document.querySelector(`#select2_select_${parts[0]}_${parts[1]}`).appendChild(component_group_background_name_dom);

        let component_group_background_num_dom = document.createElement('input');
        component_group_background_num_dom.className = 'component_group_background_num';
        component_group_background_num_dom.id = `num__select_${parts[0]}_${parts[1]}_${parts[3]}`;
        component_group_background_num_dom.value = 1;
        component_group_background_num_dom.addEventListener('change', price_change_listen);
        component_group_background_num_dom.addEventListener('focus', function () {oldValue = this.value;});

        document.querySelector(`#select2_select_${parts[0]}_${parts[1]}`).appendChild(component_group_background_num_dom);

        let delete_component_group_butt_dom = document.createElement('button');
        delete_component_group_butt_dom.className = 'delete_component_group_butt';
        delete_component_group_butt_dom.id=`x__${parts[0]}_${parts[1]}_${parts[3]}`
        delete_component_group_butt_dom.textContent=`x`
        delete_component_group_butt_dom.addEventListener('click', delete_compent_select);
        document.querySelector(`#select2_select_${parts[0]}_${parts[1]}`).appendChild(delete_component_group_butt_dom);
    
    
        // 更新價格
        let price_dom = document.querySelector('.total_price_number');
        price_dom.value = Number(price_dom.value) + Number(parts[3])

    }
}




async function delete_compent_select(){
    console.log("這是按下的按鈕 ID：", this.id);

    let delete_compent_id_part = this.id.split('__')
    let delete_compent_id_part2 = delete_compent_id_part[1]

    let price_dom = document.querySelector('.total_price_number');
    let o_price = price_dom.value //原本價格
    let delete_num = document.querySelector(`#num__select_${delete_compent_id_part2}`).value //刪掉的數量
    let delete_pre_price = delete_compent_id_part2.split('_')[2] //刪掉的零件單價

    price_dom.value = Number(o_price) - (Number(delete_num*delete_pre_price))
    document.querySelector(`#select_${delete_compent_id_part2}`).remove()
}


async function price_change_listen(){
    let newValue = this.value //變更後的新數量
    let price_dom = document.querySelector('.total_price_number'); //現在的總價
    let o_price = price_dom.value //原本總價
    let pre_price = this.id.split('_')[5] //單價

    let price_diff = (Number(pre_price)*Number(oldValue)) - (Number(pre_price)*Number(this.value))
    price_dom.value = Number(o_price)- Number(price_diff)
    oldValue = this.value; // 更新舊值
}






// 如果有登入的話可以直接儲存，如果是沒登入的話點擊後跳登入框
async function order_save_buttCreate(){
    // 先做驗證登入狀態
    let response = await fetch(`/api/auth`,
        {
          method:'GET',
          headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        let data = await response.json();
        let user_info = data['data']


        // 沒登入的話
        if(user_info==null){
            document.querySelector(".build_order_butt").className = "build_order_butt_notLogin";

        
        // 有登入的話，可以直接儲存
        }else{

            try{
                document.querySelector(".login_hint_text").style.display = "None";
            }catch{}
            document.querySelector(".build_order_butt").className = "build_order_butt";
            document.querySelector(".build_order_butt").addEventListener("click", order_save)
            document.querySelector(".build_order_butt").textContent='儲存配單'
        }
}





async function order_save(){
    // 先將所有選擇的內容整理，然後傳到後端存到後面資料庫
    let select_compent_all_dom = document.querySelectorAll(".component_group_background")
    console.log(select_compent_all_dom)

    let order_name = document.querySelector(".order_build_name_input").value
    let compent_type_list= []
    let compent_id_list= []
    let compent_num_list= []

    for(let i=0; i < select_compent_all_dom.length; i++){
        console.log(select_compent_all_dom[i]['id'])

        let compent_type = select_compent_all_dom[i]['id'].split("_")[2]
        let compent_id = select_compent_all_dom[i]['id'].split("_")[3]
        let compent_num = select_compent_all_dom[i].querySelector(".component_group_background_num").value
        
        compent_type_list.push(compent_type)
        compent_id_list.push(compent_id)
        compent_num_list.push(compent_num)
    }

    let response = await fetch("/api/order_save",// 要連結的連結
        {
            method:"POST",
            headers:{"Authorization": `Bearer ${localStorage.getItem('token')}`},

            //發送請求到後方並戴上這些json
            body:JSON.stringify({
                                "order_name": order_name,
                                "compent_type_list":compent_type_list,
                                "compent_id_list":compent_id_list,
                                "compent_num_list":compent_num_list,
                                })
        });

    let data =await response.json();

    console.log(data)
    window.alert(data["msg"])
    let Authresponse = await fetch(`/api/auth`,
    {
        method:'GET',
        headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    let user_info_data = await Authresponse.json();
    let user_info = user_info_data['data']

    window.location.href = `/user_info?userid=${user_info['id']}`;


}


// 檢查機制
// 1:cpu個數
// 2:gpu個數
// 2:mb個數
// 3:ram個數
// 4:psu個數
// 5:storage個數
// 6:case個數
// 7:cooler個數


async function check_order_logic(){
    // console.log("check_order_logic")
    // console.log(document.querySelectorAll(".component_group"))

    let all_check_dom = document.querySelectorAll(".component_group")

    componment_num_dict = {
        "cpu":0,
        "gpu":0,
        "mb":0,
        "ram":0,
        "psu":0,
        "storage":0,
        "cooler":0,
        "case":0,
    } 

    // 檢查各零件個數
    for(let i=0; i<all_check_dom.length; i++){
        let part = all_check_dom[i]["id"].split("_")
        let partType = part[1].toLowerCase();
        // console.log(partType)

        if (componment_num_dict.hasOwnProperty(partType)) {
            componment_num_dict[partType] += 1;
        }
    }

    try{
        let all_check_dom = document.querySelectorAll(".componment_logic_content_div")
        // document.querySelector("#first_tip").remove()
        for (let dom of all_check_dom) {
            dom.remove();
        }
    }catch{}


    for (let key in componment_num_dict) {
        let count = componment_num_dict[key];

        if (count === 0) {
            console.log(`${key}-1`);
            await logic_text_build(`您沒有選擇 ${key.toUpperCase()}`, `${key}-1`);
        } else if (count > 1) {
            console.log(`${key}-2`);
            await logic_text_build(`您選擇的 ${key.toUpperCase()} 多餘 1`, `${key}-2`);
        }
    }

    console.log(componment_num_dict)

}



// 新增文字
async function logic_text_build(text, logic_type){

    let new_componment_logic_content_div = document.createElement("div")
    new_componment_logic_content_div.className ='componment_logic_content_div'
    document.querySelector(".componment_logic_content_div_group").appendChild(new_componment_logic_content_div)

    let new_componment_logic_content_div_text = document.createElement("div")
    new_componment_logic_content_div_text.className ='componment_logic_content_div_text'
    new_componment_logic_content_div_text.textContent =text
    new_componment_logic_content_div_text.value = logic_type
    console.log(new_componment_logic_content_div_text.value)
    new_componment_logic_content_div.appendChild(new_componment_logic_content_div_text)

}
// logic_text_build("新增零件來幫您檢查~",0)
// logic_text_build("bbb",1)

// check_order_logic()

