async function get_order_data() {

    let response = await fetch(`/api/user_order_info`,
    {
        method:'GET',
        headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    let data = await response.json();

    try{
        document.querySelector(".user_order_content").remove()

        let user_order_content = document.createElement("div")
        user_order_content.className='user_order_content'
        document.querySelector(".user_order").appendChild(user_order_content)

        
        for(let i=0; i < data.length; i++){
            
            let order_background = document.createElement("div")
            order_background.className='order_background'
            order_background.id=`order_background_${i}`
            document.querySelector(".user_order_content").appendChild(order_background)

            let order_del_butt_div = document.createElement("div")
            order_del_butt_div.className='order_del_butt_div'
            order_del_butt_div.id=`order_del_butt_div_${i}`
            document.querySelector(`#order_background_${i}`).appendChild(order_del_butt_div)

            let order_del_butt = document.createElement("button")
            order_del_butt.className='order_del_butt'
            order_del_butt.id=`order_del_butt_${i}`
            order_del_butt.textContent='x'
            document.querySelector(`#order_del_butt_div_${i}`).appendChild(order_del_butt)

            let order_name_div = document.createElement("div")
            order_name_div.className='order_name_div'
            order_name_div.id=`order_name_div_${i}`
            document.querySelector(`#order_background_${i}`).appendChild(order_name_div)

            let order_name_div_title = document.createElement("div")
            order_name_div_title.className='order_name_div_title'
            order_name_div_title.id=`order_name_div_title_${i}`
            order_name_div_title.textContent='配單名稱：'
            document.querySelector(`#order_name_div_${i}`).appendChild(order_name_div_title)

            let order_name_div_text = document.createElement("div")
            order_name_div_text.className='order_name_div_text'
            order_name_div_text.id=`order_name_div_text_${i}`
            order_name_div_text.textContent=`${data[i]['order_name']}`
            document.querySelector(`#order_name_div_${i}`).appendChild(order_name_div_text)

            let order_select_butt = document.createElement("button")
            order_select_butt.className='order_select_butt'
            order_select_butt.id=`order_select_butt_${data[i]['id']}_${i}`
            order_select_butt.value=`${data[i]['id']}`
            order_select_butt.textContent='選擇'
            order_select_butt.addEventListener('click', read_order_data);
            document.querySelector(`#order_name_div_${i}`).appendChild(order_select_butt)

            let order_builed_time = document.createElement("div")
            order_builed_time.className='order_builed_time'
            order_builed_time.id=`order_builed_time_${i}`
            order_builed_time.textContent = `${data[i]['created_at']}`
            document.querySelector(`#order_background_${i}`).appendChild(order_builed_time)
        }
    }catch{
        
    }
    
}

get_order_data()


// 跳轉到那個配單的頁面
async function read_order_data() {
    
    let order_id = this.value;
    console.log(order_id)
    window.location.href=`/order?number=${order_id}`

}


// 跳轉到那個配單的頁面
async function read_order_data() {
    
    let order_id = this.value;
    console.log(order_id)
    window.location.href=`/order?number=${order_id}`

}

async function to_message_page() {
    let message_id = this.value;
    // console.log(message_id)
    window.location.href=`/message/${message_id}`

}



async function get_message_data() {
    let response = await fetch(`/api/MessageDataByUserID`,
    {
        method:'GET',
        headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    let MessageData = await response.json();

    console.log(MessageData)

    for(let i=0; i<MessageData.length; i++){
        // console.log(i)
        // 
        let MessageData_background = document.createElement("div")
        MessageData_background.className='MessageData_background'
        MessageData_background.id=`MessageData_background_${i}`
        document.querySelector(".user_message_content").appendChild(MessageData_background)

        //
        let MessageData_del_butt_div = document.createElement("div")
        MessageData_del_butt_div.className='MessageData_del_butt_div'
        MessageData_del_butt_div.id=`MessageData_del_butt_div_${i}`
        MessageData_background.appendChild(MessageData_del_butt_div)

        // 
        let MessageData_del_butt = document.createElement("button")
        MessageData_del_butt.className='MessageData_del_butt'
        MessageData_del_butt.id=`MessageData_del_butt_${i}`
        MessageData_del_butt.textContent='x'
        MessageData_del_butt_div.appendChild(MessageData_del_butt)

        // 
        let MessageData_name_div = document.createElement("div")
        MessageData_name_div.className='MessageData_name_div'
        MessageData_name_div.id=`MessageData_name_div_${i}`
        MessageData_background.appendChild(MessageData_name_div)

        // 
        let MessageData_name_div_title = document.createElement("div")
        MessageData_name_div_title.className='MessageData_name_div_title'
        MessageData_name_div_title.id=`MessageData_name_div_title_${i}`
        MessageData_name_div_title.textContent='討論標題：'
        MessageData_name_div.appendChild(MessageData_name_div_title)

        // 
        let MessageData_name_div_text = document.createElement("div")
        MessageData_name_div_text.className='MessageData_name_div_text'
        MessageData_name_div_text.id=`MessageData_name_div_text_${i}`
        MessageData_name_div_text.textContent=`${MessageData[i]['title']}`
        MessageData_name_div.appendChild(MessageData_name_div_text)

        // 
        let MessageData_select_butt = document.createElement("button")
        MessageData_select_butt.className='MessageData_select_butt'
        MessageData_select_butt.id=`MessageData_select_butt_${MessageData[i]['id']}_${i}`
        MessageData_select_butt.value=`${MessageData[i]['id']}`
        MessageData_select_butt.textContent='選擇'
        MessageData_select_butt.addEventListener('click', to_message_page);
        MessageData_name_div.appendChild(MessageData_select_butt)


        let MessageData_builed_time = document.createElement("div")
        MessageData_builed_time.className='MessageData_builed_time'
        MessageData_builed_time.id=`MessageData_builed_time_${i}`
        MessageData_builed_time.textContent = `${MessageData[i]['create_at']}`
        MessageData_background.appendChild(MessageData_builed_time)

    }

}
get_message_data()





async function user_data() {
    let response = await fetch(`/api/auth`,
    {
        method:'GET',
        headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
    })
    let singinData = await response.json();

    console.log(singinData)
    console.log(singinData['data'])

    let user_name_group_email_title_dom = document.querySelector(".user_name_group_email_text")
    user_name_group_email_title_dom.textContent = singinData['data']['email']
    
    let user_name_group_name_text_dom = document.querySelector(".user_name_group_name_text")
    user_name_group_name_text_dom.textContent = singinData['data']['name']

    }

user_data()