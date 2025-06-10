async function get_MessageResponseData() {

    let message_id = location.href.split('/')[4]
    console.log(message_id)

    // 1.討論串資料
    let response = await fetch(`/api/MessageDataByMessageID?message_id=${message_id}`,
    {
        method:'GET',
        headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    let message_data = await response.json();
    // console.log(message_data)

    // 標題文字
    let title_dom = document.querySelector(".title_message_block_title")
    title_dom.textContent = message_data[0]['title']

    // 討論文字
    let message_text_background_text_dom = document.querySelector(".message_text_background_text")
    message_text_background_text_dom.textContent=message_data[0]['message']

    // 留言帳號名稱
    let title_message_block_user = document.querySelector(".title_message_block_user")
    title_message_block_user.textContent=message_data[0]['member_name']



    // 2.討論串回覆資料
    let response2 = await fetch(`/api/MessageResponseData?message_id=${message_id}`,
    {
        method:'GET',
        headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    let message_response_data = await response2.json();
    console.log(message_response_data)

    
    for(let i = 0; i<message_response_data.length; i++){
        // 動態建立
        let message_block_content_dom = document.createElement("div")
        message_block_content_dom.className = 'message_block_content'
        document.querySelector(".message_block_content_group").appendChild(message_block_content_dom)

        let message_user_block_dom = document.createElement("div")
        message_user_block_dom.className = 'message_user_block'
        message_block_content_dom.appendChild(message_user_block_dom)

        let message_block_content_user_dom = document.createElement("div")
        message_block_content_user_dom.className = 'message_block_content_user'
        message_block_content_user_dom.textContent = message_response_data[i]['member_name']
        message_user_block_dom.appendChild(message_block_content_user_dom)

        let message_dom = document.createElement("div")
        message_dom.className = 'message'
        message_dom.textContent = message_response_data[i]['resoponse']
        message_block_content_dom.appendChild(message_dom)
    }

}
get_MessageResponseData()




async function message_response_build() {
    
    let message_id = location.href.split('/')[4]
    let response_text = document.querySelector(".message_respond_input").value;

    // 用POST發送請求到連結
    let response = await fetch("/api/InsertMessageResponseData",
        {
            method:"POST",
            //發送請求到後方並戴上這些json
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({"response_text":response_text,
                                 "message_id":message_id
                                 })
            })


            //從後端接資料過來
            let data =await response.json();
            if(data["ok"]==true){

                
            window.alert("回覆成功");
            location.reload();

            }else{
            window.alert("回覆失敗");

            }
      }






