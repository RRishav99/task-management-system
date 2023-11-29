
// FUnction to login 
function LoginUser(){

let username=document.getElementById('username').value;
let password=document.getElementById('password').value;

// console.log(username,password);

//Checking with db
const bodyData = JSON.stringify({
   username:username,
   password:password,
   email:username,
  });
// console.log(bodyData);
  const url = "http://localhost:3000/login";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: bodyData,
  })
    .then((response) => {
      // console.log(response);
      if (!response.ok) {
        let content='<p id="message">Invalid Credentials</p>'
        document.getElementById("message").innerHTML=content;
        throw new Error("Network Response was not ok");
        
      }
      if(response.redirected){
        window.location.href=response.url;
    }
    
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      // let content=`<p id="msg">${data.message}</p>`;
      // document.getElementById('message').innerHTML=content;
      
      localStorage.setItem("credentials",data.token);
      localStorage.setItem("username",data.username);

      if(data.role=="admin"){

        location.href="./adminpage.html"
      }
     
      if(data.role=="user"){

        location.href="./userDashboard.html"
      }

     
      
    })
    .catch((error) => {
      console.log(error);
    });

  event.preventDefault();


}