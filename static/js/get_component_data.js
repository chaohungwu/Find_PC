

async function build_compent_but(){
    let filter_but_dom = document.querySelector(".radio_select:checked")

    let response = await fetch(`/api/${filter_but_dom.value}_data`,
        {
        method:'GET',
        headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        })
        let data = await response.json();

    console.log(data)

    document.querySelector(".component_select_group_background").remove()

    let component_select_group_background_dom = document.createElement("div");
    component_select_group_background_dom.className ='component_select_group_background'
    component_select_group_background_dom.id =`component_select_group_background`
    document.querySelector(".component_select_group").appendChild(component_select_group_background_dom)

    for(let i=0; i < data.length; i++){
    // for(let i=0; i < 2; i++){

        let component_select_group_content_dom = document.createElement("div");
        component_select_group_content_dom.className ='component_select_group_content'
        component_select_group_content_dom.id =`component_select_group_content_${i}`
        document.querySelector(".component_select_group_background").appendChild(component_select_group_content_dom)

        let component_select_group_content_background_dom = document.createElement("div");
        component_select_group_content_background_dom.className ='component_select_group_content_background'
        component_select_group_content_background_dom.id =`component_select_group_content_background_${i}`
        document.querySelector(`#component_select_group_content_${i}`).appendChild(component_select_group_content_background_dom)

        let component_select_group_content_img_dom = document.createElement("div");
        component_select_group_content_img_dom.className ='component_select_group_content_img'
        component_select_group_content_img_dom.id = `component_select_group_content_img_${i}`
        document.querySelector(`#component_select_group_content_background_${i}`).appendChild(component_select_group_content_img_dom)

        if(data[i]['brand']=="Intel"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/logo-intel-color.avif")`
        }else if(data[i]['brand']=="AMD"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/logo-amd-color_3-2-all-others.avif")`
        }else if(data[i]['brand']=="華碩"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/asus.webp")`
        }else if(data[i]['brand']=="華擎"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/ASRock.png")`
        }else if(data[i]['brand']=="ACER"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/acer.jpg")`
        }else if(data[i]['brand']=="微星"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/MSI.png")`
        }else if(data[i]['brand']=="技嘉"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/gigabyte.png")`
        }else if(data[i]['brand']=="INNO3D"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/INNO3D.png")`
        }else if(data[i]['brand']=="ZOTAC"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/ZOTAC.png")`
        }else if(data[i]['brand']=="麗臺"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/麗臺.png")`
        }else if(data[i]['brand']=="撼訊"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/撼訊.png")`
        }else if(data[i]['brand']=="威剛"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/ADATA.png")`
        }else if(data[i]['brand']=="金士頓"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/kingston.jpg")`
        }else if(data[i]['brand']=="KLEVV"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/klevv.jpg")`
        }else if(data[i]['brand']=="十銓"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/十銓.webp")`
        }else if(data[i]['brand']=="美光"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/micron.png")`
        }else if(data[i]['brand']=="酷碼"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/coolmaster.jpg")`
        }else if(data[i]['brand']=="Antec"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/antec.webp")`
        }else if(data[i]['brand']=="COUGAR"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/COUGAR.png")`
        }else if(data[i]['brand']=="銀欣"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/銀昕_1200x500px.jpg")`
        }else if(data[i]['brand']=="XPG"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/XPG.png")`
        }else if(data[i]['brand']=="BitFenix"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/BitFenix.png")`
        }else if(data[i]['brand']=="BitFenix"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/BitFenix.png")`
        }else if(data[i]['brand']=="Apexgaming"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/Apexgaming.webp")`
        }else if(data[i]['brand']=="曜越"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/曜越.png")`
        }else if(data[i]['brand']=="喬思伯"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/喬思伯.jpg")`
        }else if(data[i]['brand']=="聯力"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/聯力.webp")`
        }else if(data[i]['brand']=="全漢"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/全漢.png")`
        }else if(data[i]['brand']=="darkFlash"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/darkFlash.png")`
        }else if(data[i]['brand']=="Fractal"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/Fractal.png")`
        }else if(data[i]['brand']=="視博通"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/視博通.jpg")`
        }else if(data[i]['brand']=="亞碩"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/亞碩.jpg")`
        }else if(data[i]['brand']=="SAMA"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/SAMA_logo.webp")`
        }else if(data[i]['brand']=="旋剛"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/旋剛.png")`
        }else if(data[i]['brand']=="DEEPCOOL"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/DEEPCOOL.png")`
        }else if(data[i]['brand']=="海盜船"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/CORSAIRLogo2020_stack_K.avif")`
        }else if(data[i]['brand']=="保銳"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/保銳.png")`
        }else if(data[i]['brand']=="LianLi"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/聯力.webp")`
        }else if(data[i]['brand']=="NZXT"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/NZXT.png")`
        }else if(data[i]['brand']=="Phanteks"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/Phanteks.png")`
        }else if(data[i]['brand']=="Montech"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/Montech.webp")`
        }else if(data[i]['brand']=="迎廣"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/迎廣.jpg")`
        }else if(data[i]['brand']=="be quiet"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/be quiet.png")`
        }else if(data[i]['brand']=="JONSBO"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/喬思伯.jpg")`
        }else if(data[i]['brand']=="WD"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/WD.png")`
        }else if(data[i]['brand']=="三星"){
            img_dom = document.querySelector(`#component_select_group_content_img_${i}`)
            img_dom.style.backgroundImage= `url("./static/img/三星.avif")`
        }





        let component_select_group_content_name_dom = document.createElement("div");
        component_select_group_content_name_dom.className ='component_select_group_content_name'
        component_select_group_content_name_dom.id = `component_select_group_content_name_${i}`
        component_select_group_content_name_dom.textContent = `${data[i]['name']}`
        document.querySelector(`#component_select_group_content_background_${i}`).appendChild(component_select_group_content_name_dom)

        let component_select_group_content_price_dom = document.createElement("div");
        component_select_group_content_price_dom.className ='component_select_group_content_price'
        component_select_group_content_price_dom.id = `component_select_group_content_price_${i}`
        component_select_group_content_price_dom.textContent = `${data[i]['price']}元`
        document.querySelector(`#component_select_group_content_background_${i}`).appendChild(component_select_group_content_price_dom)


        let component_select_group_content_butt_dom = document.createElement("div");
        component_select_group_content_butt_dom.className ='component_select_group_content_butt'
        // id組成:  {零件}_{id}_{名稱}
        component_select_group_content_butt_dom.id = `${filter_but_dom.value}_${data[i]['id']}_${data[i]['name']}_${data[i]['price']}`
        component_select_group_content_butt_dom.textContent = `選擇`
        component_select_group_content_butt_dom.addEventListener('click', compent_select);
        document.querySelector(`#component_select_group_content_background_${i}`).appendChild(component_select_group_content_butt_dom)
    }

}

build_compent_but()


// 將資料匯到訂單中
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
        }else if(parts[0]=='PSU'){
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


        // 沒登入的話，跳登入框
        if(user_info==null){
            // document.querySelector(".build_order_butt").addEventListener("click", order_save)
            // document.querySelector(".build_order_butt").disabled = true;
            document.querySelector(".build_order_butt").className = "build_order_butt_notLogin";
            // document.querySelector(".build_order_butt").title = "登入後可以儲存訂單";

        
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

order_save_buttCreate()




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

        // console.log(compent_type_list)
        // console.log(compent_id_list)
        // console.log(compent_num_list)
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
    window.location.href = `/`

}







