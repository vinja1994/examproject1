// We create a class for commentbox

class CommentBox{

  constructor(username, comment){
    this.username = username;
    this.comment = comment;
  }
}
// The preventDefault will prevent the default event from occuring. The preventDefault shares similar features to the return false in JavaScript
$(document).ready(function(){
    $(".editor-header a").click(function(e){
      e.preventDefault();

// We create a comment box.
var _val = $(this).data("role"),
_sizeValIn = parseInt($(this).data("size-val") + 1),
_sizeValRe = parseInt($(this).data("size-val") - 1),
_size = $(this).data("size");
if(_size == "in-size"){
document.execCommand(_val, false, _sizeValIn + "px");
} else{
document.execCommand(_val, false, _sizeValRe + "px");
}
});
});

// Universal function to retrieve user Array from LocalStorage
var activeUser = JSON.parse(localStorage.getItem('activeUser'))

var username = activeUser.username

// Define comment
/*  
 We retrieve the key "comments" using getItem()in local storage. If the key do not exist we create an list of comments in local storage. 
 Otherwise we use JSON.parse to transform the string of information into an object in local storage  
 */ 

if(localStorage.getItem('comments') == null) {
  var comments = [];
} else {
  var comments = JSON.parse(localStorage.getItem('comments'));
}

// Variables below are linked to HTML
            
$(document).ready(function(){
  var $text = $("#text"),
      $submit = $("input[type='submit']"),
      $listComment = $(".listComments"),
      $loading = $(".loading"),
      $totalCom = $(".total-comment");
      $totalCom.text($(".listComments > div").length);

// If the user does not type any text in the commentbox an alert will appear. Else the comment will be published and showed below commentbox
            
    $($submit).click(function() {
      if ($text.html() == "") {
        alert("Please write a comment");
        $text.focus();
      } else {
      _data = $text.html();
      comment = _data;
      
    
// Pushes the users new comment into the key comments in local storage that are related to the activeUser
// We take the object comments and transforms it into a string in localstorage         
comment = new CommentBox(username, comment);
comments.push(comment);
localStorage.setItem('comments', JSON.stringify(comments)); 

// This publishes and shows the comment from the user below the commentbox and counts the number of comments
$loading.show().fadeOut(300);
  $listComment.append("<div>" + _data + "</div>");
  $text.html("");                
  $totalCom.text($(".listComments > div").length);
                
  return false;
}

});

// We retrieve the strings from the key comments and from the key activeUser and transforms them into objects in local storage  

var allcomments = JSON.parse(localStorage.getItem('comments'));
var user = JSON.parse(localStorage.getItem('activeUser'));
// We loop through the array of comments and check if the username matches any comments made by the same user
for(i=0; i < allcomments.length; i++){
  if(user.username == allcomments[i].username) {

// If this is the case, then we show all the comments made by that specific user below the commentbox.
var $listComment = $(".listComments")

$loading.show().fadeOut(300);
  $listComment.append("<div>" + allcomments[i].comment + "</div>");
  $text.html("");

   }
  }
});

            

            