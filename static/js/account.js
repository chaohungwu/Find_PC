
// 1. 登入頁面
async function show_login_table() {

    try{
    document.querySelector(".account_content").remove();
    }catch  (error) {}


    let account_content_dom = document.createElement("div");
    account_content_dom.className = "account_content";
    account_content_dom.addEventListener('click', function(event) {
    if (event.target === account_content_dom) { // 確保是點擊 account_content_dom
        close_login_table();
        }
    });
    document.querySelector("#body").prepend(account_content_dom);

    let account_content_background_dom = document.createElement("div");
    account_content_background_dom.className = "account_content_background";
    document.querySelector(".account_content").appendChild(account_content_background_dom);


    let account_content_login_title_div_dom = document.createElement("div");
    account_content_login_title_div_dom.className = "account_content_login_title_div";
    document.querySelector(".account_content_background").appendChild(account_content_login_title_div_dom);


    let account_content_login_title_dom = document.createElement("div");
    account_content_login_title_dom.className = "account_content_login_title";
    account_content_login_title_dom.textContent = "登入 Find-PC"
    document.querySelector(".account_content_login_title_div").appendChild(account_content_login_title_dom);
    

    let account_content_login_colse_butt_dom = document.createElement("button");
    account_content_login_colse_butt_dom.className = "account_content_login_colse_butt";
    account_content_login_colse_butt_dom.textContent = "x"
    account_content_login_colse_butt_dom.addEventListener('click', close_login_table);
    document.querySelector(".account_content_login_title_div").appendChild(account_content_login_colse_butt_dom);


    let title_hr_dom = document.createElement("hr");
    title_hr_dom.className = "title_hr";
    document.querySelector(".account_content_background").appendChild(title_hr_dom);


    let account_content_login_group_dom = document.createElement("div");
    account_content_login_group_dom.className = "account_content_login_group";
    document.querySelector(".account_content_background").appendChild(account_content_login_group_dom);

    let account_content_login_email_dom = document.createElement("div");
    account_content_login_email_dom.className = "account_content_login_email";
    account_content_login_email_dom.textContent='使用者信箱：'
    document.querySelector(".account_content_login_group").appendChild(account_content_login_email_dom);

    let account_content_login_email_input_dom = document.createElement("input");
    account_content_login_email_input_dom.className = "account_content_login_email_input";
    account_content_login_email_input_dom.id = "login_email_input";
    document.querySelector(".account_content_login_group").appendChild(account_content_login_email_input_dom);


    let account_content_login_group_dom2 = document.createElement("div");
    account_content_login_group_dom2.className = "account_content_login_group";
    account_content_login_group_dom2.id ="account_content_login_group_dom2"
    document.querySelector(".account_content_background").appendChild(account_content_login_group_dom2);

    let account_content_login_password_dom = document.createElement("div");
    account_content_login_password_dom.className = "account_content_login_email";
    account_content_login_password_dom.textContent='使用者密碼：'
    document.querySelector("#account_content_login_group_dom2").appendChild(account_content_login_password_dom);

    let account_content_login_password_input_dom = document.createElement("input");
    account_content_login_password_input_dom.type='password'
    account_content_login_password_input_dom.id = "login_password_input";
    account_content_login_password_input_dom.className = "account_content_login_password_input";
    document.querySelector("#account_content_login_group_dom2").appendChild(account_content_login_password_input_dom);


    let login_butt_dom = document.createElement("button");
    login_butt_dom.className = "login_butt";
    login_butt_dom.textContent='登入'
    login_butt_dom.addEventListener('click', signin);
    document.querySelector(".account_content_background").appendChild(login_butt_dom);

    // 錯誤訊息
    let stutas_dom = document.createElement("div");
    stutas_dom.className = "stutas";
    document.querySelector(".account_content_background").appendChild(stutas_dom);

    let register_butt_div_dom = document.createElement("div");
    register_butt_div_dom.className = "register_butt_div";
    document.querySelector(".account_content_background").appendChild(register_butt_div_dom);

    let register_butt_div_text_dom = document.createElement("div");
    register_butt_div_text_dom.className = "register_butt_div_text";
    register_butt_div_text_dom.textContent='我沒有帳號，我要註冊'
    register_butt_div_text_dom.addEventListener('click', show_register_table);
    document.querySelector(".register_butt_div").appendChild(register_butt_div_text_dom);
}



// 2. 註冊頁面
async function show_register_table() {
    document.querySelector(".account_content").remove()

    let account_content_dom = document.createElement("div");
    account_content_dom.className = "account_content";
    account_content_dom.addEventListener('click', function(event) {
    if (event.target === account_content_dom) { // 確保是點擊 account_content_dom
        close_login_table();
        }
    });
    document.querySelector("#body").prepend(account_content_dom);

    let account_content_background_dom = document.createElement("div");
    account_content_background_dom.className = "account_content_background";
    account_content_background_dom.style.height='480px'
    document.querySelector(".account_content").appendChild(account_content_background_dom);



    
    let account_content_login_title_div_dom = document.createElement("div");
    account_content_login_title_div_dom.className = "account_content_login_title_div";
    document.querySelector(".account_content_background").appendChild(account_content_login_title_div_dom);


    let account_content_login_title_dom = document.createElement("div");
    account_content_login_title_dom.className = "account_content_login_title";
    account_content_login_title_dom.textContent = "註冊 Find-PC"
    document.querySelector(".account_content_login_title_div").appendChild(account_content_login_title_dom);
    

    let account_content_login_colse_butt_dom = document.createElement("button");
    account_content_login_colse_butt_dom.className = "account_content_login_colse_butt";
    account_content_login_colse_butt_dom.textContent = "x"
    account_content_login_colse_butt_dom.addEventListener('click', close_login_table);
    document.querySelector(".account_content_login_title_div").appendChild(account_content_login_colse_butt_dom);


    let title_hr_dom = document.createElement("hr");
    title_hr_dom.className = "title_hr";
    document.querySelector(".account_content_background").appendChild(title_hr_dom);


    let account_content_login_group_dom = document.createElement("div");
    account_content_login_group_dom.className = "account_content_login_group";
    document.querySelector(".account_content_background").appendChild(account_content_login_group_dom);

    let account_content_login_email_dom = document.createElement("div");
    account_content_login_email_dom.className = "account_content_login_email";
    account_content_login_email_dom.textContent='註冊信箱：'
    document.querySelector(".account_content_login_group").appendChild(account_content_login_email_dom);

    let account_content_login_email_input_dom = document.createElement("input");
    account_content_login_email_input_dom.id = "register_email_input";
    account_content_login_email_input_dom.className = "account_content_login_email_input";
    document.querySelector(".account_content_login_group").appendChild(account_content_login_email_input_dom);




    let account_content_login_group_dom1 = document.createElement("div");
    account_content_login_group_dom1.className = "account_content_login_group";
    account_content_login_group_dom1.id ="account_content_login_group_dom1"
    document.querySelector(".account_content_background").appendChild(account_content_login_group_dom1);

    let account_content_login_name_dom = document.createElement("div");
    account_content_login_name_dom.className = "account_content_login_email";
    account_content_login_name_dom.textContent='輸入註冊名稱：'
    document.querySelector("#account_content_login_group_dom1").appendChild(account_content_login_name_dom);


    let account_content_login_name_input_dom = document.createElement("input");
    account_content_login_name_input_dom.className = "account_content_login_email_input";
    account_content_login_name_input_dom.id = "register_name_input";
    document.querySelector("#account_content_login_group_dom1").appendChild(account_content_login_name_input_dom);



    let account_content_login_group_dom2 = document.createElement("div");
    account_content_login_group_dom2.className = "account_content_login_group";
    account_content_login_group_dom2.id ="account_content_login_group_dom2"
    document.querySelector(".account_content_background").appendChild(account_content_login_group_dom2);

    let account_content_login_password_dom = document.createElement("div");
    account_content_login_password_dom.className = "account_content_login_email";
    account_content_login_password_dom.textContent='註冊新密碼：'
    document.querySelector("#account_content_login_group_dom2").appendChild(account_content_login_password_dom);

    let account_content_login_password_input_dom = document.createElement("input");
    account_content_login_password_input_dom.type='password'
    account_content_login_password_input_dom.className = "account_content_login_password_input";
    account_content_login_password_input_dom.id = "register_password_input";
    document.querySelector("#account_content_login_group_dom2").appendChild(account_content_login_password_input_dom);



    let account_content_login_group_dom3 = document.createElement("div");
    account_content_login_group_dom3.className = "account_content_login_group";
    account_content_login_group_dom3.id ="account_content_login_group_dom2"
    document.querySelector(".account_content_background").appendChild(account_content_login_group_dom3);

    let account_content_login_password_dom2 = document.createElement("div");
    account_content_login_password_dom2.className = "account_content_login_email";
    account_content_login_password_dom2.id = "register_password_input_sec";
    account_content_login_password_dom2.textContent='再次輸入密碼：'
    document.querySelector("#account_content_login_group_dom2").appendChild(account_content_login_password_dom2);

    let account_content_login_password_input_dom2 = document.createElement("input");
    account_content_login_password_input_dom2.type='password'
    account_content_login_password_input_dom2.className = "account_content_login_password_input";
    document.querySelector("#account_content_login_group_dom2").appendChild(account_content_login_password_input_dom2);




    let login_butt_dom = document.createElement("button");
    login_butt_dom.className = "login_butt";
    login_butt_dom.textContent='註冊'
    login_butt_dom.addEventListener('click', signup);
    document.querySelector(".account_content_background").appendChild(login_butt_dom);

    // 錯誤訊息
    let stutas_dom = document.createElement("div");
    stutas_dom.className = "stutas";
    document.querySelector(".account_content_background").appendChild(stutas_dom);


    let register_butt_div_dom = document.createElement("div");
    register_butt_div_dom.className = "register_butt_div";
    document.querySelector(".account_content_background").appendChild(register_butt_div_dom);

    let register_butt_div_text_dom = document.createElement("div");
    register_butt_div_text_dom.className = "register_butt_div_text";
    register_butt_div_text_dom.textContent='我有帳號，我要登入'
    register_butt_div_text_dom.addEventListener('click', show_login_table);
    document.querySelector(".register_butt_div").appendChild(register_butt_div_text_dom);
}



async function close_login_table() {
    document.querySelector(".account_content").remove()
}


//01.送出資料註冊新會員
async function signup(){
    let signup_name = document.querySelector("#register_name_input").value;
    let signup_email = document.querySelector("#register_email_input").value;
    let signup_password = document.querySelector("#register_password_input").value;
  

    // 用POST發送請求到連結
    let response = await fetch("/api/user",
        {
            method:"POST",
            //發送請求到後方並戴上這些json
            body:JSON.stringify({"name":signup_name,
                                 "email":signup_email,
                                 "password":signup_password})
            })
            //從後端接資料過來
            let data =await response.json();
            if(data["ok"]==true){
              // window.alert("註冊成功");
              document.querySelector('.stutas').textContent = `註冊成功`
              setTimeout("window.location.href = `/`",1000)
            //   window.location.href = `/`

            }else{
              document.querySelector('.stutas').textContent = data["message"]
            //   document.querySelector('.stutas').textContent = "aaa"

            }
      }




// 02.登入會員
async function signin(){
    let signin_email = document.querySelector("#login_email_input").value;
    let signin_password = document.querySelector("#login_password_input").value;
  
    let response = await fetch("/api/user_signin",
        {
          method:"PUT",
          //發送請求到後方並戴上這些json
          //加上這一串後會將BODY中的東西以json格式傳到後端，但是在fastapi中會自動轉為dict，這邊要注意
          headers: {
          'Content-Type': 'application/json', // 指定發送的資料格式為 JSON
          },
  
          body:JSON.stringify({"email":signin_email,
                               "password":signin_password})
        })
  
        let data = await response.json();
  

        if(data['error']==true){
          document.querySelector('.stutas').textContent = `${data['message']}`
          // alert(data['message']);
  
        }else if(data['token']!= undefined){
          let token = data['token'];
          // sessionStorage.setItem('token', token);
          localStorage.setItem('token', token);
          document.querySelector('.stutas').textContent = `登入成功`
            
          setTimeout("window.location.reload();",1000)
          // alert('登入成功');
          // window.location.href = `/`
  
        }
      }


// 03.確認登入狀態
//03.登入狀態確認
async function signin_license_check_OtherPage(){
    let response = await fetch(`/api/auth`,
        {
          method:'GET',
          headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        let data = await response.json();
        let user_info = data['data']


        // 登入失敗就回到首頁
        if(user_info==null){
            singin_dom = document.querySelector("#singin_singup_text")
            singin_dom.textContent='登入/註冊'
            singin_dom.addEventListener('click', show_login_table)      
            
            // let currentUrl = window.location.href;
            // console.log(currentUrl)
            // window.location.href='/'


        }else{
            // 將使用者名稱也存在localstorage(booking頁面使用)
            localStorage.setItem('user_name', user_info["name"]);

            user_center_dom = document.querySelector("#singin_singup_text");
            user_center_dom.textContent= user_info['name']

            //移除先前的listen監視器
            user_center_dom.removeEventListener("click", show_login_table);

            // 出現使用者帳號名稱，點擊後可進入使用者資料頁面
            user_center_dom.addEventListener('click', () => {
              window.location.href = `/user_info?userid=${user_info['id']}`;
            })          

            let singout_dom = document.createElement("div")
            singout_dom.textContent='登出系統'
            singout_dom.className='singout'
            document.querySelector(".nav_right_login").appendChild(singout_dom)

            singout_dom.addEventListener('click', () => {
            localStorage.clear('token')
            window.location.reload();
            })

        }
        
        return user_info
    }


signin_license_check_OtherPage()




