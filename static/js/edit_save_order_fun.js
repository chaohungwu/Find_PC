async function get_order_detail_compent() {

    // 從URL取得訂單編號
    const order_id = location.href.split('=')[1]
    // console.log(order_id)

    let response = await fetch(`/api/order_detail_compent/${order_id}`,
    {
        method:'GET',
        headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    let data = await response.json();

    // console.log(data)
    order_deetail_data = data['data']
    order_name = data['order_name']
    // console.log( data['order_name'])

    document.querySelector(".order_build_name_input").value = order_name[0]['order_name']

    for(let i=0; i<order_deetail_data.length; i++){
        
        let order_deetail_data_orderid = order_deetail_data[i]['order_id']
        let order_deetail_data_component_id = order_deetail_data[i]['component_id']
        let order_deetail_data_component_type = order_deetail_data[i]['component_type']
        
        if (order_deetail_data_component_type=="CPU"){
                order_deetail_data_component_type="cpu"
            }else if(order_deetail_data_component_type=="GPU"){
                order_deetail_data_component_type="gpu"
            }else if(order_deetail_data_component_type=="RAM"){
                order_deetail_data_component_type="ram"
            }else if(order_deetail_data_component_type=="COOLER"){
                order_deetail_data_component_type="cooler"
            }else if(order_deetail_data_component_type=="psu"){
                order_deetail_data_component_type="PSU"
            }else if(order_deetail_data_component_type=="STORAGE"){
                order_deetail_data_component_type="storage"
            }else if(order_deetail_data_component_type=="CASE"){
                order_deetail_data_component_type="case"
            }else if(order_deetail_data_component_type=="MB"){
                order_deetail_data_component_type="mb"}
                
        
        let order_deetail_data_quantity = order_deetail_data[i]['quantity']

        let response = await fetch(`/api/${order_deetail_data_component_type}_data`,
            {
            method:'GET',
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
            })

        let component_data = await response.json();
        // console.log(component_data)

        // 每個該id零件的資料
        let pre_component = component_data.filter(item => item.id === order_deetail_data_component_id);
        // console.log(pre_component)
        // console.log(pre_component[0]['name'])

        
        // cpu_1_Intel Core Ultra 5 225F_7650
        let component_group_dom = document.createElement('div');
        component_group_dom.className = 'component_group';
        component_group_dom.id = `select_${order_deetail_data_component_type}_${pre_component[0]['id']}_${pre_component[0]['price']}`;
        document.querySelector('.component_group_div_scoll').appendChild(component_group_dom);

        let component_group_background_dom = document.createElement('div');
        component_group_background_dom.className = 'component_group_background';
        component_group_background_dom.id = `select2_select_${order_deetail_data_component_type}_${pre_component[0]['id']}`;
        document.querySelector(`#select_${order_deetail_data_component_type}_${pre_component[0]['id']}_${pre_component[0]['price']}`).appendChild(component_group_background_dom);

        let component_group_background_component_dom = document.createElement('div');
        component_group_background_component_dom.className = 'component_group_background_component';
        
        let show_class_name = '';
        if (order_deetail_data_component_type=='cpu'){
            show_class_name='CPU'
        }else if(order_deetail_data_component_type=='gpu'){
            show_class_name='GPU'
        }else if(order_deetail_data_component_type=='ram'){
            show_class_name='記憶體'
        }else if(order_deetail_data_component_type=='mb'){
            show_class_name='主機板'
        }else if(order_deetail_data_component_type=='PSU'){
            show_class_name='PSU'
        }else if(order_deetail_data_component_type=='storage'){
            show_class_name='硬碟'
        }else if(order_deetail_data_component_type=='cooler'){
            show_class_name='散熱器'
        }else if(order_deetail_data_component_type=='case'){
            show_class_name='機殼'
        }
        

        component_group_background_component_dom.textContent=`${show_class_name}`
        document.querySelector(`#select2_select_${order_deetail_data_component_type}_${pre_component[0]['id']}`).appendChild(component_group_background_component_dom);

        let component_group_background_name_dom = document.createElement('div');
        component_group_background_name_dom.className = 'component_group_background_name';
        component_group_background_name_dom.textContent=`${pre_component[0]['name']} | ${pre_component[0]['price']}元`
        document.querySelector(`#select2_select_${order_deetail_data_component_type}_${pre_component[0]['id']}`).appendChild(component_group_background_name_dom);

        let component_group_background_num_dom = document.createElement('input');
        component_group_background_num_dom.className = 'component_group_background_num';
        component_group_background_num_dom.id = `num__select_${order_deetail_data_component_type}_${pre_component[0]['id']}_${pre_component[0]['price']}`;
        component_group_background_num_dom.value = 1;
        component_group_background_num_dom.addEventListener('change', price_change_listen);
        component_group_background_num_dom.addEventListener('focus', function () {oldValue = this.value;});

        document.querySelector(`#select2_select_${order_deetail_data_component_type}_${pre_component[0]['id']}`).appendChild(component_group_background_num_dom);

        let delete_component_group_butt_dom = document.createElement('button');
        delete_component_group_butt_dom.className = 'delete_component_group_butt';
        // delete_component_group_butt_dom.id = 'x_delete_component_group_butt';
        delete_component_group_butt_dom.id=`x__${order_deetail_data_component_type}_${pre_component[0]['id']}_${pre_component[0]['price']}`
        delete_component_group_butt_dom.textContent=`x`
        delete_component_group_butt_dom.addEventListener('click', delete_compent_select);
        document.querySelector(`#select2_select_${order_deetail_data_component_type}_${pre_component[0]['id']}`).appendChild(delete_component_group_butt_dom);
    
    
        // 更新價格
        let price_dom = document.querySelector('.total_price_number');
        price_dom.value = Number(price_dom.value) + Number(pre_component[0]['price'])

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
