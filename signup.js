// Sign up form

// We retrieve the information that the user inputs in the registration form and create variables based on that specific value

function safeInput() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var repeatpw = document.getElementById("repeatpw").value;
    
// We make an if statement to ensure that the user uses an valid email. 
// If the username does not contain an @ sign the function will stop executing and the user will get an alert.
    if(!username.includes("@")) {

    alert("E-mail must contain a @")
    return false;
    }

// We make an if statement to ensure that the user registers with a safe password. 
// If the password does not contain the required figures, the function will stop executing and the user will get an alert.

    if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/.test(password)) {

    alert("Must contain at least one number and one uppercase and lowercase letter, and at least 5 characters")
    return false;
  }
  
  // This ensures that the values of the password and repeatpw are hashed.
    password = hashPassword(password);
    repeatpw = hashPassword(repeatpw)
      
/* We create an if statement that requires the user to pick a preffered currency. 
   If the user tries to create account without selecting currency an alert will appear and the function will stop exectuting.
   
*/

    if(document.getElementById('currencySelection').value != ''){
      var currency = new Currency(document.getElementById('currencySelection').value, '1');

    } else {
      alert('Please select your favorite currency')
      return false
    } 
  
/* 
We retrieve the key users in local storage to check if the username already exists. The function will stop if this is the case and an alert will appear informing the user 
 We retrieve the key "users" using getItem() if the key users do not exist we create an list of users in local storage. 
 Otherwise we get the list of users from localstorage 
*/ 
  if(localStorage.getItem('users') == null) {
    var users = [];
  } else {
  var users = JSON.parse(localStorage.getItem('users'))
  
  for(var i=0; i < users.length; i++) {
    if (users[i].username == username) {
    alert("Username already exists");
    return false;               
   }
  }}
    
// If user does not exist, the next step is to check if the password equals the repeatpw.   
  if (password === repeatpw) {

/*
 We retrieve the key "users" using getItem() if the key users do not exist we create an list of users in local storage. 
 Otherwise we get the list of users from localstorage   
 */  
 
      if(localStorage.getItem('users') == null) {
        var users = [];
        alert("You successfully signed up and is redirected to our currency converter" )
      } else {
        var users = JSON.parse(localStorage.getItem('users'));
        alert("You successfully signed up and is redirected to our currency converter" )
  }

/* If all above criteria are met the code should push the variable newUser to the key called users in local storage.
 JSON.stringify is used to convert our users object into a string in local storage */

      newUser = new User(username, password, currency);
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
/* When the user sign up we add a list called activeUser as a key in local storage and transforms the user object into a string using JSON.stringify 
After the user credentials has been pushed, we redirect the user to the main page if the user has met all the required specifications */      
localStorage.setItem('activeUser', JSON.stringify(newUser));
      
      document.location.href = "mainpage.html" ; 
    } else {
      alert('Password and Repeat Password does not match!')
    }  
} 









