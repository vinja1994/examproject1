/* JQuery used for comment box functions
document ready function - Jquery detects that the page status is ready
code will ony run once page is ready for javascript code to execute
Jquery is a javascript library - simplifies the language and event handling
*/

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

// We create a dialog box. FURTHER EXPLANATIONS
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
 When the very first user signs up, the comments key in local storage has not yet been created, which would prompt an error message.
 By creating this if statement we tell our function to create a key for comments.
 If comments from the activeUser already exist, we retrieve them from local storage */
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
comment = new CommentBox(username, comment);
comments.push(comment);
localStorage.setItem('comments', JSON.stringify(comments)); 

// This publishes and shows the comment from the user below the commentbox
$loading.show().fadeOut(300);
  $listComment.append("<div>" + _data + "</div>");
  $text.html("");                
  $totalCom.text($(".listComments > div").length);
                
  return false;
}

});

// Show activeUsers previous comments on mainpage when page is refreshed or if the user logsout and then login again
// We retrieve the information from the key comments and from the key activeUser. 

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

            

            