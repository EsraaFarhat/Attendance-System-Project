
window.addEventListener('load', function() {
    let container = document.getElementsByTagName('div')[0];
    let form = document.getElementsByTagName('form')[0];
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add('was-validated');
        }
        else{
        event.preventDefault();

        $.ajax({
          url: "../../Json_files/Data.json",
          method: "get",
          dataType: "json",
          success: function (data) {
            let Err = `<p class="text-danger ml-3">Username or password incorrect</p>`;
            let flag=0;
            let id=-1;
            if(username.value == data["data"][0].username){
              if(password.value == data["data"][0].password){
                localStorage.setItem('loggedUser', JSON.stringify({
                  'fname':data["data"][0].fname,
                  'lname':data["data"][0].lname,
                  'email':data["data"][0].email,
                  'username':data["data"][0].username,
                  'id':data["data"][0].id,
                  'admin': false
                }));
                location.href = `Admin.html?id=0`;
              }
              else{
                if($("form p:first")){
                  form.removeChild(form.firstChild);
                }
                $("form:first").prepend(Err);
              }
            }
          else{
            for(var i=1;i<data["data"].length;i++){
              if(username.value == data["data"][i].username && password.value == data["data"][i].password){
                localStorage.setItem('loggedUser', JSON.stringify({
                  'fname':data["data"][i].fname,
                  'lname':data["data"][i].lname,
                  'email':data["data"][i].email,
                  'username':data["data"][i].username,
                  'id':data["data"][i].id,
                  'admin': false
                }));
                id=data["data"][i].id;
                flag=1;
                break;
              }
            }
            if(flag){
              location.href = `Employee.html?id=${id}`;
            }
            else{
              if($("form p:first")){
                form.removeChild(form.firstChild);
              }
              $("form:first").prepend(Err);
            }
              
          }
  }
  ,
      error: function (error) { console.log("Error");}
  });
        
       
    }
      }, false);
  }, false);//ENd of load
