const id= new URLSearchParams(window.location.search).get('id');

let Monthlyreport="",
    Dailyreport="",
    month = new Date().getMonth()+1,       
    day = new Date().getDate(),
    year =  new Date().getFullYear();
        window.addEventListener('load', function(){
            if(id == null){
                location.href = "Home.html";
                alert("Please login first");
             }
            
            $.ajax({
                url: "../../Json_files/Data.json",
                method: "get",
                dataType: "json",
                success: function (data) {
                    
                    
                    let datatable = $(`<table class="table table-borderless" style="background-color: rgb(236, 235, 235)"><tr style="font-size:25px"><th colspan="2">${data["data"][id].fname +" "+ data["data"][id].lname}</th></tr>
                                              <tr><th>ID: </th><td>${data["data"][id].id}</td><th>Email: </th><td>${data["data"][id].email}</th></tr>
                                              <tr><th>username: </th><td>${data["data"][id].username}</td><th>Age: </td><td>${data["data"][id].age}</th></tr>
                                              <tr><th>Address: </th><td>${data["data"][id].address}</td><th>Date of Employment: </td><td>${data["data"][id].dateofemp}</th></tr>
                                              </table>`)
                    
                     Monthlyreport = $(`<table class="table report"><tr ><th colspan="2">Monthly report</th><tr>
                                         <tr><td>Attendance times </td><td>${data[`month${month}`][id-1].attend}</td></tr>
                                         <tr><td>Late times </td><td>${data[`month${month}`][id-1].late}</td></tr>
                                         <tr><td>Absence times </td><td>${data[`month${month}`][id-1].absent}</td>
                                         <tr><td>Excuse times </td><td>${data[`month${month}`][id-1].excuse}</td></tr></table>`)
                    
                    
                    if(data[`month${month}`][id-1][day] == undefined){
                            time= '-:-';
                    }
                    else{
                        time = data[`month${month}`][id-1][day];
                    }
                    
                     Dailyreport = $(`<table class="table report"><tr ><th colspan="2">Daily report</th><tr>
                                           <tr><td>Day </td><td>${day}-${month}-${year}</td></tr>
                                           <tr><td>Attendance time </td><td>${time}</td></tr></table>`)

                    $("#personalData").append(datatable);
                    
                    $("#reports").append(Monthlyreport);
        }
        ,
            error: function (error) { console.log("Error");}
        });
        
        });//End of load

        function getMonthlyReport(){
            if(window.innerWidth <= 768 && window.innerHeight <= 438){
                document.querySelector(".navbar-toggler").click();
            }
            reports.removeChild(reports.lastChild);
            $("#reports").append(Monthlyreport);
        }
        function getDailyReport(){
            if(window.innerWidth <= 768 && window.innerHeight <= 438){
                document.querySelector(".navbar-toggler").click();
            }
             reports.removeChild(reports.lastChild);
             $("#reports").append(Dailyreport);
        }

        function confirmAtt(){
            location.href = `ConfirmAttendance.html?id=${id}`;
        }

        const origin = window.location.origin;
        function logout(){
            localStorage.removeItem("loggedUser");
            window.location.replace(`${origin}/Attendance%20system/HTML_files/Home.html`);
        }