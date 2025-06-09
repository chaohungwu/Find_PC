document.addEventListener("DOMContentLoaded", async function () {
    // __init__
    // console.log("頁面架構載入完成，初始化開始");
    initvalue()
    await BuildMessageBoard()
});


function initvalue() {
    document.querySelector('.submit_but').addEventListener('click', async () => {
        await UploadInputMessage();
        window.location.reload();
        }
    )
    document.querySelector('.message_content__input_text').addEventListener('input', () => {
        if (document.querySelector('.message_content__input_text').value !== '') {
            document.querySelector('.submit_but').disabled = false;
            document.querySelector('.submit_but').classList.add('enabled');
        } else {
            document.querySelector('.submit_but').disabled = true;
            document.querySelector('.submit_but').classList.remove('enabled');
        }
      });

    document.querySelector('.submit_but').disabled = true;
}


async function GetMessage_data() {
    let response = await fetch(`/api/getmessage`,
        {
            method:'GET',
        })
    let message_data = await response.json();
    // console.log(message_data)
    return message_data
    }


async function BuildMessageBoard() {
    message_data = await GetMessage_data();

    for(i=0;i<message_data.length;i++){        
        message_data_text = message_data[i][1]
        message_data_img = message_data[i][2]
        let content_num2_child_dom = document.querySelector(".content").children[1]

        if(content_num2_child_dom){
            let BuildMessageBoard_dom = document.createElement("div");
            BuildMessageBoard_dom.className='message_board';
            BuildMessageBoard_dom.id=`message_board_${i}`;
            document.querySelector(".content").insertBefore(BuildMessageBoard_dom, content_num2_child_dom);
        }else{
            let BuildMessageBoard_dom = document.createElement("div");
            BuildMessageBoard_dom.className='message_board';
            BuildMessageBoard_dom.id=`message_board_${i}`;
            document.querySelector(".content").appendChild(BuildMessageBoard_dom);
        }


        let message_dom_dom = document.createElement("div");
        message_dom_dom.className='message_dom';
        message_dom_dom.id=`message_dom_${i}`;
        document.querySelector(`#message_board_${i}`).appendChild(message_dom_dom);


        let message_text_dom = document.createElement("div");
        message_text_dom.className='message_text';
        message_text_dom.id=`message_text_dom_${i}`;
        message_text_dom.textContent=message_data_text
        document.querySelector(`#message_dom_${i}`).appendChild(message_text_dom);


        let message_img_div_dom = document.createElement("div");
        message_img_div_dom.className='message_img_div';
        message_img_div_dom.id=`message_img_div_${i}`;
        document.querySelector(`#message_dom_${i}`).appendChild(message_img_div_dom);

        let message_img_dom = document.createElement("img");
        message_img_dom.className='message_img';
        message_img_dom.id=`message_img_${i}`;
        message_img_dom.src=`${message_data_img}`
        // message_img_dom.style.backgroundImage=`url("${message_data_img}")`;
        document.querySelector(`#message_img_div_${i}`).appendChild(message_img_dom);
    }
}

