//Login function. In this case we need to check if the password and username is valid 
function loginFunction() {

  // We retrieve the values the user enters in the user login and password via the login form from HTML and creates related variables 
    
  var usr = document.getElementById("usrLogin").value
  var pw = document.getElementById("pwLogin").value

  // We have created a function where we hash the password.
  // We therefore need to define pw to hashPassword. 

  pw = hashPassword(pw);


  // To ensure that the user cannot login before typing valid credentials we declare the login variable to false.
  // Once the required conditions are met we set the variable to true, which allows the user to login. 

  var enableLogin = false;
  
  /*
 We retrieve the key "users" using getItem() if the key do not exist we create an list of users in local storage. 
 Otherwise we use JSON.parse to transform the string of information into an object in local storage  
 */  

  if(localStorage.getItem('users') == 'undefined') {
    var users = []
  } else {
    var users = JSON.parse(localStorage.getItem('users'))
  }

  // Looping thorugh our users list

  for(var i=0; i<users.length; i++) {
    

    // If both username and password match one of the users in local storage then we add the user to the activeUser key. 
    // JSON.stringify transforms the key activeUser from an object to a string using JSON.stringify.
    // This will only happen if enableLogin equals true 

      if (users[i].password == pw && users[i].username == usr) {
          localStorage.setItem('activeUser', JSON.stringify(users[i]))
          enableLogin = true;
      }
    }
// If the user credentials are incorrect, the user will be alerted and access will not be granted

    if (enableLogin === false){
        alert("Password or email is incorrect - try again or sign up")
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








