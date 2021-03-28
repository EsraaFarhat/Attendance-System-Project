let form='',
    fname='',
    lname='',
    address='',
    email='',
    age='',
    usrname='',
    pass=''; 



    function sendEmail(fname,lname, address, email, age){
      // alert("Sending mail to admin...");
      Email.send({
          Host : "smtp.gmail.com",
          Username : "esraafarhat97@gmail.com",
          Password : "ixjjwwbuvabqgsky",
          To : "esraafarhat97@gmail.com",
          From : "esraafarhat97@gmail.com",
          Subject : `${fname} sent you a message`,
          Body : `First Name: ${fname} <br>
                  Last Name: ${lname} <br>
                  Address: ${address} <br>
                  Email: ${email} <br>
                  Age: ${age}`
      }).then(
      );
    }


window.addEventListener('load', function() {
            
    form = document.getElementsByTagName('form')[0];
    fname = document.getElementById('fname'),
    lname = document.getElementById('lname'),
    address = document.getElementById('address'),
    email = document.getElementById('email'),
    age = document.getElementById('age');
    
      form.addEventListener('submit', function (event){
          
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add('was-validated');
        }
        else{
          
          event.preventDefault();
          
          sendEmail(fname.value,lname.value, address.value, email.value, age.value);  
          alert("Mail has been sent to the admin"); 
          addData(event);
    }
      }, false);
  }, false); //End of load


addData =  async (e) =>{
  const emp = {
    admin: "",
    fname: form.fname.value,
    lname: form.lname.value,
    address: form.address.value,
    email: form.email.value,
    age: form.age.value,
  }
  
  await fetch('http://localhost:3000/temp-data', {
          method: 'POST',
          body: JSON.stringify(emp),     
          headers: { 'Content-Type': 'application/json' }
        })

        location.href = "Home.html";
}