async function message_build() {
    let title_text = document.querySelector(".publish_butt_div_input_title").value;
    let message_text = document.querySelector(".publish_butt_div_input").value;

    // 用POST發送請求到連結
    let response = await fetch("/api/InsertMessageData",
        {
            method:"POST",
            //發送請求到後方並戴上這些json
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({"title":title_text,
                                 "message":message_text})
            })

            //從後端接資料過來
            let data =await response.json();
            if(data["ok"]==true){
            window.alert("上傳成功");
            location.reload();
            //   setTimeout("window.location.href = `/`",1000)
            //   window.location.href = `/`

            }else{

            }
      }


async function show_all_message() {
    let title_text = document.querySelector(".publish_butt_div_input_title").value;
    let message_text = document.querySelector(".publish_butt_div_input").value;

    let response = await fetch("/api/MessageData",
        {
            method:"GET",
            //發送請求到後方並戴上這些json
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            })

            //從後端接資料過來
            let data =await response.json();
            console.log(data)

            for(let i=0; i<data.length; i++){
                let message_div_dom = document.createElement("div")
                message_div_dom.className = 'message_div'
                message_div_dom.addEventListener("click", function () {
                    window.location.href = `/message/${data[i]['id']}`
                });
                document.querySelector(".messageboard_background").appendChild(message_div_dom)


                let message_img_dom = document.createElement("div")
                message_img_dom.className = 'message_img'
                message_div_dom.appendChild(message_img_dom)

                let message_title_dom = document.createElement("div")
                message_title_dom.className = 'message_title'
                message_title_dom.textContent = data[i]['title']
                message_div_dom.appendChild(message_title_dom)      
                
                let message_time_dom = document.createElement("div")
                message_time_dom.className = 'message_time'
                message_time_dom.textContent = data[i]['create_at']
                message_div_dom.appendChild(message_time_dom)      
            }
            console.log('aaaaa')



    }

show_all_message()

