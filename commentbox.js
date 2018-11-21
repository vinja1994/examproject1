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


$(document).ready(function(){
    $(".editor-header a").click(function(e){
      e.preventDefault();

// above - e prevent default stops the default action of an element

// below - creates a dialog box
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

if(localStorage.getItem('comments') == null) {
  var comments = [];
} else {
  var comments = JSON.parse(localStorage.getItem('comments'));
  
}





     // below - pulls in html div's - clarify how 
     $(document).ready(function(){
        var $text = $("#text"),
            $submit = $("input[type='submit']"),
            $listComment = $(".listComments"),
            $loading = $(".loading"),
            _data,
            $totalCom = $(".total-comment");

            $totalCom.text($(".listComments > div").length);


      
            $($submit).click(function(){
                if($text.html() == ""){
                  alert("Please write a comment!");
                  $text.focus();
                } else{
                  _data = $text.html();
                  $.ajax({
                    type: "POST",
                    url: window.local,
                    data: _data,
                    cache: false,
                    success: function(html){
                      $loading.show().fadeOut(300);
                      $listComment.append("<div>"+_data+"</div>");
                      $text.html("");
                      $totalCom.text($(".listComments > div").length);
                    }
                  });
                  return false;


                }
              });
            });

            
            $(document).ready(function(){
              var $text = $("#text"),
                  $submit = $("input[type='submit']"),
                  $listComment = $(".listComments"),
                  $loading = $(".loading"),
                  _data,
                  $totalCom = $(".total-comment");
            
              $totalCom.text($(".listComments > div").length);
            
              $($submit).click(function() {
                if ($text.html() == "") {
                  alert("Please write a comment");
                  $text.focus();
                } else {
                  _data = $text.html();
                  comment = _data;
    
              
                comment = new CommentBox(username, comment);
                comments.push(comment);
                localStorage.setItem('comments', JSON.stringify(comments)); 
                
                $loading.show().fadeOut(300);
                  $listComment.append("<div>" + _data + "</div>");
                  $text.html("");
                  $totalCom.text($(".listComments > div").length);
                
                  return false;

                  
                }

               // Show activeUsers previous comments on mainpage

               
              
              var allcomments = JSON.parse(localStorage.getItem('comments'));
              var user = JSON.parse(localStorage.getItem('activeUser'));
              for(i=0; i < allcomments.length; i++){
                if(user.username == allcomments.username) {
                  alert("hej")

                  console.log("hej");
                  
                
               

                }
              }
              
              });
            });

            
              

            

            