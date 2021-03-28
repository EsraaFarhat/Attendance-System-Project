 month= new URLSearchParams(window.location.search).get('month');
 btnval= new URLSearchParams(window.location.search).get('val');

 let All="",
Fullreport="",
Latereport="",
EmployessData="",
Alltable="",
Fullreporttable="",
Latereporttable="",
Excusereporttable="",
Employeesdatatable="",
reqs='',
usrname='',
pass='';
let     
    day = new Date().getDate();

    
window.addEventListener('load',function(){
    if(month == null){
        month = new Date().getMonth()+1;  
    }
    console.log(btnval);
    $.ajax({
        url: "../../Json_files/Data.json",
        method: "get",
        dataType: "json",
        success: function (data) {

            Alltable = $(`<table class="table"><thead><tr><th>Name</th><th>Attendance times</th><th>Late times</th><th>Absence times</th><th>Excuse times</th></tr></thead></table>`);
            Fullreporttable = $(`<table class="table"><tr><th>Name</th><th>Attendance time</th><th>Attendance times</th><th>Late times</th><th>Absence times</th><th>Excuse times</th></tr></table>`)
            Latereporttable = $(`<table class="table"><tr><th>Name</th><th>Late times</th></tr></table>`)
            Excusereporttable = $(`<table class="table"><tr><th>Name</th><th>Excuse times</th></tr></table>`)
            Employeesdatatable = $(`<table class="table"><tr><th>Name</th><th>ID</th><th>Username</th>
                                               <th>Address</th><th>Email</th><th>Age</th></tr></table>`)
            reqs = $(`<table class="table"><thead><tr><th>Name</th><th>Accept request</th><th>Delete request</th></tr></thead></table>`);

             for (var i = 1; i < data["data"].length; i++) {
                if(data[`month${month}`][i-1][day] == undefined){
                    time= '-:-';
                }
                else{
                    time = data[`month${month}`][i-1][day];
                }
                All = $(`<tr><td>${data["data"][i].fname +" "+ data["data"][i].lname}</td>
                        <td>${data[`month${month}`][i-1].attend}</td>
                            <td>${data[`month${month}`][i-1].late}</td><td>${data[`month${month}`][i-1].absent}</td>
                            <td>${data[`month${month}`][i-1].excuse}</td></tr>`)
                Alltable.append(All);

                Fullreport = $(`<tr><td>${data["data"][i].fname +" "+ data["data"][i].lname}</td><td>${time}</td>
                                <td>${data[`month${month}`][i-1].attend}</td><td>${data[`month${month}`][i-1].late}</td>
                                <td>${data[`month${month}`][i-1].absent}</td><td>${data[`month${month}`][i-1].excuse}</td></tr>`)
                Fullreporttable.append(Fullreport);

                Latereport = $(`<tr><td>${data["data"][i].fname +" "+ data["data"][i].lname}</td><td>${data[`month${month}`][i-1].late}</td></tr>`)
                Latereporttable.append(Latereport);

                Excusereport = $(`<tr><td>${data["data"][i].fname +" "+ data["data"][i].lname}</td><td>${data[`month${month}`][i-1].late}</td></tr>`)
                Excusereporttable.append(Excusereport);

                EmployessData = $(`<tr><td>${data["data"][i].fname +" "+ data["data"][i].lname}</td><td >${data["data"][i].id}</td>
                                       <td>${data["data"][i].username}</td><td>${data["data"][i].address}</td>
                                       <td>${data["data"][i].email}</td><td>${data["data"][i].age}</td></tr>`)
                Employeesdatatable.append(EmployessData);               
            }       
            

            for (var i=0; i<data["temp-data"].length; i++){
                tempEmp = 
                reqsRows = $(`<tr><td>${data["temp-data"][i].fname} ${data["temp-data"][i].lname}</td>
                              <td><button class="btn btn-success ml-2 mb-1" onclick="Accepted(${data["temp-data"][i].id});">Accept</button></td>
                              <td><button class="btn btn-danger ml-2 mb-1" onclick="deleteTemp(${data["temp-data"][i].id});">Delete</button></td></tr>`);
                (reqs).append(reqsRows); 
            }  
            if(month == null || btnval == null){
                $("#reports").append(Alltable);
            }
            else{
                if(btnval == 1 ) $("#reports").append(Alltable);
                else if(btnval == 2) $("#reports").append(Fullreporttable);
                else if(btnval == 3) $("#reports").append(Latereporttable);
                else if(btnval == 4) $("#reports").append(Excusereporttable);
                else if(btnval == 5) $("#reports").append(Employeesdatatable);
                else if(btnval == 6) $("#reports").append(reqs);
            }
}
,
    error: function (error) { console.log("Error");}
});

});//End of load

function searchfun(event){
    searchbtn= document.getElementById("search");
    event.preventDefault();
    event.stopPropagation();
    val = document.getElementById("selectMonth");
    val = val.value;
    if(val>=1 && val <= 12){
        month = val;
        console.log(btnval);
        location.href = `Admin.html?val=${btnval}&month=${month}`;
    }
    else{
        alert("Incorrect choice");
    }
}


function getAll(){
    if(window.innerWidth <= 768 && window.innerHeight <= 438){
        document.querySelector(".navbar-toggler").click();
    }
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?val=1';
        window.history.pushState({path:newurl},'',newurl);
        btnval = 1;
    }
    //location.href = `Admin.html?val=1`;
    reports.removeChild(reports.lastChild);
    $("#reports").append(Alltable);
}

function getFullReport(){
    if(window.innerWidth <= 768 && window.innerHeight <= 438){
        document.querySelector(".navbar-toggler").click();
    }
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?val=2';
        window.history.pushState({path:newurl},'',newurl);
        btnval = 2;
    }
    reports.removeChild(reports.lastChild);
    $("#reports").append(Fullreporttable);
}
function getLateReport(){
    if(window.innerWidth <= 768 && window.innerHeight <= 438){
        document.querySelector(".navbar-toggler").click();
    }
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?val=3';
        window.history.pushState({path:newurl},'',newurl);
        btnval = 3;
    }
    reports.removeChild(reports.lastChild);
    $("#reports").append(Latereporttable);
}

function getExcuseReport(){
    if(window.innerWidth <= 768 && window.innerHeight <= 438){
        document.querySelector(".navbar-toggler").click();
    }
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?val=4';
        window.history.pushState({path:newurl},'',newurl);
        btnval = 4;
    }
    reports.removeChild(reports.lastChild);
    $("#reports").append(Excusereporttable);
}

function getEmployessData(){
    if(window.innerWidth <= 768 && window.innerHeight <= 438){
        document.querySelector(".navbar-toggler").click();
    }
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?val=5';
        window.history.pushState({path:newurl},'',newurl);
        btnval = 5;
    }
    reports.removeChild(reports.lastChild);
    $("#reports").append(Employeesdatatable);
}

function Requests(){
    if(window.innerWidth <= 768 && window.innerHeight <= 438){
        document.querySelector(".navbar-toggler").click();
    }
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?val=6';
        window.history.pushState({path:newurl},'',newurl);
        btnval = 6;
    }
    reports.removeChild(reports.lastChild);
    $("#reports").append(reqs);
}

function generateUsername_Pass(fname){
    nameSub = fname.substr(0,2);
    codeRandom = Math.floor(Math.random() * 1001);    
    usrname = nameSub.concat(codeRandom);
    pass = generatePassword();
}
function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

function sendEmailUser(username,password, email){
    Email.send({
        Host : "smtp.gmail.com",
        Username : "esraafarhat97@gmail.com",
        Password : "ixjjwwbuvabqgsky",
        To : `${email}`,
        From : "esraafarhat97@gmail.com",
        Subject : `Admin sent you a message`,
        Body : `User Name: ${username} <br>
                Password: ${password}`
    }).then(message => console.log(message)
    );
}

const Accepted = async (id) => {
   
    let uri = `http://localhost:3000/temp-data/${id}`;
    const res = await fetch(uri);

    const tempEmp = await res.json();
    id = tempEmp.id;
    fname = tempEmp.fname;
    username = usrname;
    password = pass;
    email = tempEmp.email;
    generateUsername_Pass(fname);

    AcceptedEmp={
        "admin": "",
        "fname": tempEmp.fname,
        "lname": tempEmp.lname,
        "username": usrname,
        "password": pass,
        "address": tempEmp.address,
        "email": email,
        "age": tempEmp.age,
        "dateofemp": new Date().toGMTString()
    }

    sendEmailUser(usrname,pass,email);
    //alert("Mail sending...");

    AddData(AcceptedEmp);
    alert("Employee Accepted");
    deleteTemp(id);
    //alert("Data deleting...");   
    AddAttend1(); 
    AddAttend2();
    
    AddAttend3();
    AddAttend4();
    // alert("Employee Accepted");
    AddAttend5();
    alert("Adding Data...");
    AddAttend6();
    AddAttend7();
    AddAttend8();
    
    AddAttend9();
    AddAttend10();
    AddAttend11();
    AddAttend12();
    
}

AddData = async(emp) =>{
    
    await fetch('http://localhost:3000/data', {
           method: 'POST',
           body: JSON.stringify(emp),     
           headers: { 'Content-Type': 'application/json' }
        })
                                           
    }


const empAtt = {
    attend: 0,
    late: 0,
    absent: 0,
    excuse: 0,
}
      
AddAttend1 = async (e) =>{
    await fetch(`http://localhost:3000/month1`, {
          method: 'POST',
          body: JSON.stringify(empAtt),     
          headers: { 'Content-Type': 'application/json' }
        })

}
AddAttend2 = async (e) =>{
    await fetch(`http://localhost:3000/month2`, {
          method: 'POST',
          body: JSON.stringify(empAtt),     
          headers: { 'Content-Type': 'application/json' }
        })

}
AddAttend3 = async (e) =>{
    await fetch(`http://localhost:3000/month3`, {
          method: 'POST',
          body: JSON.stringify(empAtt),     
          headers: { 'Content-Type': 'application/json' }
        })

}
AddAttend4 = async (e) =>{
    await fetch(`http://localhost:3000/month4`, {
          method: 'POST',
          body: JSON.stringify(empAtt),     
          headers: { 'Content-Type': 'application/json' }
        })

}
AddAttend5 = async (e) =>{
    await fetch(`http://localhost:3000/month5`, {
          method: 'POST',
          body: JSON.stringify(empAtt),     
          headers: { 'Content-Type': 'application/json' }
        })

}
AddAttend6 = async (e) =>{
    await fetch(`http://localhost:3000/month6`, {
          method: 'POST',
          body: JSON.stringify(empAtt),     
          headers: { 'Content-Type': 'application/json' }
        })

}
AddAttend7 = async (e) =>{
    await fetch(`http://localhost:3000/month7`, {
          method: 'POST',
          body: JSON.stringify(empAtt),     
          headers: { 'Content-Type': 'application/json' }
        })

}
AddAttend8 = async (e) =>{
    await fetch(`http://localhost:3000/month8`, {
          method: 'POST',
          body: JSON.stringify(empAtt),     
          headers: { 'Content-Type': 'application/json' }
        })

}
AddAttend9 = async (e) =>{
    await fetch(`http://localhost:3000/month9`, {
          method: 'POST',
          body: JSON.stringify(empAtt),     
          headers: { 'Content-Type': 'application/json' }
        })

}
AddAttend10 = async (e) =>{
    await fetch(`http://localhost:3000/month10`, {
          method: 'POST',
          body: JSON.stringify(empAtt),     
          headers: { 'Content-Type': 'application/json' }
        })

}
AddAttend11 = async (e) =>{
    await fetch(`http://localhost:3000/month11`, {
          method: 'POST',
          body: JSON.stringify(empAtt),     
          headers: { 'Content-Type': 'application/json' }
        })

}
AddAttend12 = async (e) =>{
   
    await fetch(`http://localhost:3000/month12`, {
          method: 'POST',
          body: JSON.stringify(empAtt),     
          headers: { 'Content-Type': 'application/json' }
        })

}

deleteTemp =  async (id) =>{ 
    //await AddAttend12();
    await fetch(`http://localhost:3000/temp-data/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
    })
}

const origin = window.location.origin;
        function logout(){
            localStorage.removeItem("loggedUser");
            window.location.replace(`${origin}/Attendance%20system/HTML_files/Home.html`);
        }