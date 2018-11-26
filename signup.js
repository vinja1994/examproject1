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
   By using `1`, it means that the user can not pick the item 0 in the currencyselection, which is "choose your prefered currency"
*/

    if(document.getElementById('currencySelection').value != ''){
      var currency = new Currency(document.getElementById('currencySelection').value, '1');

    } else {
      alert('Please select your favorite currency')
      return false
    } 
  
/*  
 When the very first user signs up, the users key in local storage has not yet been created, which would prompt an error message.
 By creating this if statement we tell our function to create a key for users.
 If the user does not exist and is not the first registered user, we retrieve the already created list of users to check if the credentials match an existing user */
    
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
 By creating this if statement we tell our function to create a key for users.
 If the user is the first registered user, we retrieve the already created list of users to check if the credentials match an existing user */
    
      if(localStorage.getItem('users') == null) {
        var users = [];
      } else {
        var users = JSON.parse(localStorage.getItem('users'));

// We alert the user that the user is successfully signed up and is redirected to our mainpage
    alert("You successfully signed up and is redirected to our currency converter" )
  }

/* If all above criteria are met the program should save the new user in local storage.
 We push the newUser to the key called user in local storage.
 JSON.stringify is used to convert our users object into a string */

      newUser = new User(username, password, currency);
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
/* We create another key in local storage called activeUser - so we can connect the user class to the currency class and commentbox class.
After the user credentials has been pushed, we redirect the user to the main page */      
localStorage.setItem('activeUser', JSON.stringify(newUser));
      
      document.location.href = "mainpage.html" ; 
    } else {
      alert('Password and Repeat Password does not match!')
    }  
} 









