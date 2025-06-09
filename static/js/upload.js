async function UploadInputMessage() {
    let upload_text = document.querySelector(".message_content__input_text").value 
    const fileUploader = document.querySelector("#image")
    const upload_image = fileUploader.files[0]; 
    const SendBackendData = new FormData();
    SendBackendData.append('message', upload_text); //留言文字

    if (upload_image){
        SendBackendData.append('file', upload_image); //檔案byte
    }

    let response = await fetch(`/upload`,
        {
            method:'POST',
            body:SendBackendData
        })

        let data = await response.json();
        console.log(data)
    }