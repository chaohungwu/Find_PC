async function get_order_detail_compent() {

    // 從URL取得訂單編號
    const order_id = location.href.split('=')[1]

    let response = await fetch(`/api/order_detail_compent/${order_id}`,
    {
        method:'GET',
        headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    let data = await response.json();

    console.log("order_data")
    console.log(data)

    // 取得的配單資料
    order_name = data['order_name']
    
    // 變成儲存的配單名稱
    document.querySelector(".order_build_name_input").value = order_name[0]['order_name']


    // 取得配單零件的詳細資訊
    let response_order_detail = await fetch(`/api/SearchDetailByOrderID?order_id=${order_id}`,
    {
    method:'GET',
    headers: {
    "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    })

    let order_detail_data = await response_order_detail.json();
    console.log(order_detail_data)


    // 依照配單取出資料
    for(let i=0; i<order_detail_data.length; i++){
        let order_detail_data_type = order_detail_data[i]['component_type']
        let order_detail_data_cid = order_detail_data[i]['id']
        let order_detail_data_name = order_detail_data[i]['name']
        let order_detail_data_price = order_detail_data[i]['price']
        let order_detail_data_quantity = order_detail_data[i]['quantity']

        
        if (order_detail_data_type=="CPU"){
                order_detail_data_type="cpu"
            }else if(order_detail_data_type=="GPU"){
                order_detail_data_type="gpu"
            }else if(order_detail_data_type=="RAM"){
                order_detail_data_type="ram"
            }else if(order_detail_data_type=="COOLER"){
                order_detail_data_type="cooler"
            }else if(order_detail_data_type=="psu"){
                order_detail_data_type="PSU"
            }else if(order_detail_data_type=="STORAGE"){
                order_detail_data_type="storage"
            }else if(order_detail_data_type=="CASE"){
                order_detail_data_type="case"
            }else if(order_detail_data_type=="MB"){
                order_detail_data_type="mb"}
                

        // cpu_1_Intel Core Ultra 5 225F_7650
        // type_id_name_price
        let component_group_dom = document.createElement('div');
        component_group_dom.className = 'component_group';
        component_group_dom.id = `select_${order_detail_data_type}_${order_detail_data_cid}_${order_detail_data_price}`;
        document.querySelector('.component_group_div_scoll').appendChild(component_group_dom);

        let component_group_background_dom = document.createElement('div');
        component_group_background_dom.className = 'component_group_background';
        component_group_background_dom.id = `select2_select_${order_detail_data_type}_${order_detail_data_cid}`;
        document.querySelector(`#select_${order_detail_data_type}_${order_detail_data_cid}_${order_detail_data_price}`).appendChild(component_group_background_dom);

        let component_group_background_component_dom = document.createElement('div');
        component_group_background_component_dom.className = 'component_group_background_component';
        
        let show_class_name = '';
        if (order_detail_data_type=='cpu'){
            show_class_name='CPU'
        }else if(order_detail_data_type=='gpu'){
            show_class_name='GPU'
        }else if(order_detail_data_type=='ram'){
            show_class_name='記憶體'
        }else if(order_detail_data_type=='mb'){
            show_class_name='主機板'
        }else if(order_detail_data_type=='PSU'){
            show_class_name='PSU'
        }else if(order_detail_data_type=='storage'){
            show_class_name='硬碟'
        }else if(order_detail_data_type=='cooler'){
            show_class_name='散熱器'
        }else if(order_detail_data_type=='case'){
            show_class_name='機殼'
        }

        component_group_background_component_dom.textContent=`${show_class_name}`
        document.querySelector(`#select2_select_${order_detail_data_type}_${order_detail_data_cid}`).appendChild(component_group_background_component_dom);

        let component_group_background_name_dom = document.createElement('div');
        component_group_background_name_dom.className = 'component_group_background_name';
        component_group_background_name_dom.textContent=`${order_detail_data_name} | ${order_detail_data_price}元`
        document.querySelector(`#select2_select_${order_detail_data_type}_${order_detail_data_cid}`).appendChild(component_group_background_name_dom);

        let component_group_background_num_dom = document.createElement('input');
        component_group_background_num_dom.className = 'component_group_background_num';
        component_group_background_num_dom.id = `num__select_${order_detail_data_type}_${order_detail_data_cid}_${order_detail_data_price}`;
        component_group_background_num_dom.value = order_detail_data_quantity;
        component_group_background_num_dom.addEventListener('change', price_change_listen);
        component_group_background_num_dom.addEventListener('focus', function () {oldValue = this.value;});

        document.querySelector(`#select2_select_${order_detail_data_type}_${order_detail_data_cid}`).appendChild(component_group_background_num_dom);

        let delete_component_group_butt_dom = document.createElement('button');
        delete_component_group_butt_dom.className = 'delete_component_group_butt';
        // delete_component_group_butt_dom.id = 'x_delete_component_group_butt';
        delete_component_group_butt_dom.id=`x__${order_detail_data_type}_${order_detail_data_cid}_${order_detail_data_price}`
        delete_component_group_butt_dom.textContent=`x`
        delete_component_group_butt_dom.addEventListener('click', delete_compent_select);
        document.querySelector(`#select2_select_${order_detail_data_type}_${order_detail_data_cid}`).appendChild(delete_component_group_butt_dom);
    
    
        // 更新價格
        let price_dom = document.querySelector('.total_price_number');
        price_dom.value = Number(price_dom.value) + Number(order_detail_data_price)













    }

}

get_order_detail_compent()


// 更新既有的訂單
async function update_order_detail_compent(){

    const order_id = location.href.split('=')[1]

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




    let response = await fetch(`/api/update_order_detail_compent/${order_id}`,
    {
        method:'PUT',
        headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify({
                                "order_name": order_name,
                                "compent_type_list":compent_type_list,
                                "compent_id_list":compent_id_list,
                                "compent_num_list":compent_num_list,
                                })
    })

    let result = await response.json();

    let response2 = await fetch(`/api/auth`,
    {
        method:'GET',
        headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    let user_info = await response2.json();
    let user_id = user_info['id']

    window.location.href=`/user_info?userid=${user_id}`

    // return result



    // 再做儲存
    // console.log(result)

}
