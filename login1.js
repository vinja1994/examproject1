//Login function. In this case we need to check if the password and username is valid
function loginFunction() {

  // 1. Use localstoreage.getItem() to retirve your user from LS
  // 2. use JSON.parse to turn your user into js object
    
  var usr = document.getElementById("usrLogin").value
  var pw = document.getElementById("pwLogin").value

  pw = hashPassword(pw);

  var enableLogin = false;
  console.log(enableLogin)


  // Universal function to retrieve user Array from LocalStorage
  if(localStorage.getItem('users') == 'undefined') {
    var users = []
  } else {
    var users = JSON.parse(localStorage.getItem('users'))
  }

  for(let i=0; i<users.length; i++) {
    console.log(users[i].username)
    console.log(users[i].password)
    console.log(usr)
    console.log(pw)


      if (users[i].password == pw && users[i].username == usr) {
        console.log('Test')
          localStorage.setItem('activeUser', JSON.stringify(users[i]))
          enableLogin = true;
      }
  
    }

    console.log('enableLogin = ' + enableLogin)
    if (enableLogin === false){
        alert("Password or email is not correct - try again or sign up")
    } else if (enableLogin === true) {
        //document.getElementById("login").disabled = true;
        
        window.location.href="mainpage.html";
    }
    
    }
    

function hashPassword(rawPassword){
  var a = 1, c = 0, h, o;
  if (rawPassword) {
    a = 0;
    /*jshint plusplus:false bitwise:false*/
    //This is a loop that goes through all passwords and emails
    for (h = rawPassword.length - 1; h >= 0; h--) {
      o = rawPassword.charCodeAt(h);
      a = (a<<6&268435455) + o + (o<<14);
      c = a & 266338304;
      a = c!==0?a^c>>21:a;
    }
  }else {
    // If the password is not valid, we'll throw and error we're able to catch
    alert("Please type in your username and password")
    throw new Error("Password or email is not correct - try again or sign up");
  }
  return String(a);
}








