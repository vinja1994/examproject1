//Login function. In this case we need to check if the password and username is valid 
function loginFunction() {

  // We retrieve the values the user enters in the user login and password via the login form from HTML 
    
  var usr = document.getElementById("usrLogin").value
  var pw = document.getElementById("pwLogin").value

  // We have created a function where we hash the password.
  // We therefore need to define pw to hashPassword. This ensures that the loop checks through the hashPasswords

  pw = hashPassword(pw);


  // To ensure that the user cannot login before typing valid credentials we declare the login variable to false.
  // Once the required conditions are met we set the variable to true, which allows the user to login. 
  var enableLogin = false;
  
  // Universal function to retrieve user Array from LocalStorage
  
  // Undefined is used to make a simple check to see if their are any user in local storage. Back up if it is the first customer
  // When the very first user signs up the local storage array has not yet been created, which would prompt an error message.
  // By creating this if statement we tell our function to create an array of users or else getting the item from local storage
  if(localStorage.getItem('users') == 'undefined') {
    var users = []
  } else {
    var users = JSON.parse(localStorage.getItem('users'))
  }

  // For the function above: We use localstoreage.getItem() to retirve the user from local storage
  // We use JSON.parse to turn the user into a js object


  // Looping thorugh our user

  for(var i=0; i<users.length; i++) {
    

    // If both username and password match our array of users in local storage then make the user to activeUser and assign activeUser the values from the key user
    // The activeUser key will only be created if enableLogin equals true 
      if (users[i].password == pw && users[i].username == usr) {
          localStorage.setItem('activeUser', JSON.stringify(users[i]))
          enableLogin = true;
      }
    }
// If the user credentials are incorrect, the user will be alerted and access will not be granted
    if (enableLogin === false){
        alert("Password or email is not correct - try again or sign up")
    } else if (enableLogin === true) {
         window.location.href="mainpage.html";
    }
  }
    
  // We use a function to hash our passwords in order to make sure they are not stored in clear text
function hashPassword(rawPassword){
  var a = 1, c = 0, h, o;
  if (rawPassword) {
    a = 0;

    //This is a loop that goes through all passwords and emails
    for (h = rawPassword.length - 1; h >= 0; h--) {
      o = rawPassword.charCodeAt(h);
      a = (a<<6&268435455) + o + (o<<14);
      c = a & 266338304;
      a = c!==0?a^c>>21:a;
    }
  }
  return String(a);
}








