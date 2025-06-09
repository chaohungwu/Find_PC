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