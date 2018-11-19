// Sign up form

class User{

  constructor(username, password, currency){
    this.username = username;
    this.password = password;
    this.currency = currency;
  }
}



function safeInput() {
  console.log('safeINput called')

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var repeatpw = document.getElementById("repeatpw").value;
    //var validpw = ValidatePw(password);
    //var validMail = ValidateMail(username);

    
    
    password = hashPassword(password);
    repeatpw = hashPassword(repeatpw)
    console.log(username, password, repeatpw)
    
    if(document.getElementById('currencySelection').value != ''){
      var currency = new Currency(document.getElementById('currencySelection').value, '1');

    } else {
      alert('Please select your favorite currency')
      return false
    }
  
    
    
    
  if (password === repeatpw) {

      
      // Save your new user


      if(localStorage.getItem('users') == null) {
        var users = [];
      } else {
        var users = JSON.parse(localStorage.getItem('users'));
      }

     // newUser
      newUser = new User(username, password, currency);
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      

      // Creates key with activeUser
      
      localStorage.setItem('activeUser', JSON.stringify(newUser));


      console.log(users)
      
      document.location.href = "mainpage.html" ; 
    } else {
      alert('Password and Repeat Password does not match!')
    }


/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
if (!event.target.matches('.dropbtn')) {

  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }
}
}}