// Sign up form

// We create a class for users

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
    //var username = ValidatEmail(username);




    if(!username.includes("@")) {

    alert("E-mail must contain a @")
    return false;
    }

    if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/.test(password)) {

    alert("Must contain at least one number and one uppercase and lowercase letter, and at least 5 characters")
    return false;

    }





    
    
    password = hashPassword(password);
    repeatpw = hashPassword(repeatpw)
    console.log(username, password, repeatpw)
    
// We create an if statement that forces the user to pick a preffered currency. 
//If the user tries to create account without selecting currency alert will appear 


    if(document.getElementById('currencySelection').value != ''){
      var currency = new Currency(document.getElementById('currencySelection').value, '1');

    } else {
      alert('Please select your favorite currency')
      return false
    } 
  

    

    //loops through the already existing users, and check if the username input already exist. If it does, user is stopped
  
  // We parse the list of users into our function
    var users = JSON.parse(localStorage.getItem("users"))

  for(var i=0; i < users.length; i++) {
    if (users[i].username == username) {
    alert("Username already exists");
    return false;               
   }
  }
    


    
   
    
  if (password === repeatpw) {

      // If all above criteria are met the program should save the new user in local storage


      if(localStorage.getItem('users') == null) {
        var users = [];
      } else {
        var users = JSON.parse(localStorage.getItem('users'));

        // We alert the user about that he or she successfully is signed up and is redirected to our currency converter
        alert("You successfully signed up and is redirected to our currency converter" )
      }



     // We push the newUser to local storage array callled user
      newUser = new User(username, password, currency);
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      

      // Creates key in local storage with activeUser
      
      localStorage.setItem('activeUser', JSON.stringify(newUser));


      console.log(users)
      
      document.location.href = "mainpage.html" ; 
    } else {
      alert('Password and Repeat Password does not match!')
    }

     //USERNAME DOES NOT EXIST ALREADY

  
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
} }







