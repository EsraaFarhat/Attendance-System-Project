const id= new URLSearchParams(window.location.search).get('id');
let temp='',
    time='',
day='',
month='',
empAttend='',
empLate='',
empAbsent='';
window.addEventListener('load', function() {
  if(id == null){
     location.href = "Home.html";
     alert("Please login first");
  }
     month = new Date().getMonth()+1,        
      day = new Date().getDate();  
    let form = document.getElementsByTagName('form')[0];
    
      form.addEventListener('submit', function(event) {
        
        event.preventDefault();
        event.stopPropagation();
        
        $.ajax({
          url: "../../Json_files/Data.json",
          method: "get",
          dataType: "json",
          success: function (data) {
           
            let Err = `<p style="color:red" class="ml-4">Username is incorrect</p>`;
            let warning = `<p style="color:yellow" class="ml-4">You have already confirmed your attendance today</p>`;
            if(username.value == data["data"][id].username){
             
                if(data[`month${month}`][id-1][day] == undefined){
                  time=new Date().toLocaleTimeString();
                  dayProperty = new Date().getDate();
                  ////////////////////////////
                  attendTime = new Date().setHours(8,0,0);
                  lateTime = new Date().setHours(9,15,0);
                  absentTime = new Date().setHours(10,0,0);
                  empAttendTime =  new Date().getTime();
                  /////////////////////////////////
                   $(".modal-body").append(`<p><b>Employee Name:  </b>${data["data"][id].fname} ${data["data"][id].lname}</p>`);
                   $(".modal-body").append(`<p><b>Attendance Time:  </b>${time}</p>`);
                   $("#Confirmed").modal();
                  //////////////////////////////////
                  empAttend = data[`month${month}`][id-1].attend;
                  empLate = data[`month${month}`][id-1].late;
                  empAbsent = data[`month${month}`][id-1].absent;
                  if(empAttendTime >= attendTime && empAttendTime < lateTime){
                    empAttend++;
                    empLate = empLate;
                    empAbsent = empAbsent;
                  }
                  else if (empAttendTime >= lateTime && empAttendTime < absentTime){
                    empLate++;
                    empAttend = empAttend;
                    empAbsent = empAbsent;
                  }
                  else{
                    empAbsent++;
                    empAttend = empAttend;
                    empLate = empLate;
                  }
                }
                else{
                  
                  if($("form p:first")){
                    form.removeChild(form.firstChild);
                  }
                  $("form:first").prepend(warning);
        
              } 
          }
          else{
            if($("form p:first")){
              form.removeChild(form.firstChild);
            }
            $("form:first").prepend(Err);
          }
  }
  ,
      error: function (error) { console.log("Error");}
  });
        
      }, false);
  }, false);


  redirect = async(event)=>{
    obj = {
      [dayProperty] :  time,
      attend : empAttend,
      late : empLate,
      absent : empAbsent
  };
    await fetch(`http://localhost:3000/month${month}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(obj),     
            headers: { 'Content-Type': 'application/json' }
            
          })
    location.href =  `Employee.html?id=${id}`;
  }

  const origin = window.location.origin;
  function logout(){
      localStorage.removeItem("loggedUser");
      window.location.replace(`${origin}/Attendance%20system/HTML_files/Home.html`);
  }